// Минимальный клиент Telegram Bot API.
// Работает ТОЛЬКО на сервере: читает TELEGRAM_BOT_TOKEN из process.env.
// Токен никогда не должен попадать в клиентский бандл, поэтому не используем
// префикс NEXT_PUBLIC_ и не импортируем этот модуль в Client Components.

const TELEGRAM_API = "https://api.telegram.org";

/** Ошибка вызова Telegram API. Сообщение не содержит токен. */
export class TelegramError extends Error {
  constructor(
    public readonly method: string,
    public readonly description: string,
    public readonly errorCode?: number,
  ) {
    super(`Telegram ${method} failed: ${description}`);
    this.name = "TelegramError";
  }
}

function requireToken(): string {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN не задан. Добавьте токен от @BotFather в .env",
    );
  }
  return token;
}

/**
 * Вызывает метод Bot API. Бросает TelegramError, если Telegram вернул ok: false.
 * Сетевые ошибки перехватываются, чтобы URL с токеном не утёк в stack trace.
 */
async function callTelegram<T>(
  method: string,
  payload?: Record<string, unknown>,
): Promise<T> {
  const token = requireToken();

  let response: Response;
  try {
    response = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload ?? {}),
      cache: "no-store",
    });
  } catch {
    throw new TelegramError(method, "не удалось связаться с api.telegram.org");
  }

  const data = (await response.json().catch(() => null)) as
    | { ok: true; result: T }
    | { ok: false; description?: string; error_code?: number }
    | null;

  if (!data) {
    throw new TelegramError(method, `некорректный ответ (HTTP ${response.status})`);
  }
  if (!data.ok) {
    throw new TelegramError(
      method,
      data.description ?? `HTTP ${response.status}`,
      data.error_code,
    );
  }

  return data.result;
}

export type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
};

export type TelegramChat = {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
};

export type TelegramUpdate = {
  update_id: number;
  message?: { message_id: number; chat: TelegramChat; text?: string };
  my_chat_member?: { chat: TelegramChat };
};

/** Проверка токена: возвращает данные бота. */
export function getBotInfo(): Promise<TelegramUser> {
  return callTelegram<TelegramUser>("getMe");
}

/** Последние апдейты. Нужны, чтобы узнать chat_id после /start. */
export function getUpdates(offset?: number): Promise<TelegramUpdate[]> {
  return callTelegram<TelegramUpdate[]>("getUpdates", {
    offset,
    timeout: 0,
    allowed_updates: ["message", "my_chat_member"],
  });
}

/** Информация об установленном webhook (мешает getUpdates, если задан). */
export function getWebhookInfo(): Promise<{
  url: string;
  pending_update_count: number;
}> {
  return callTelegram("getWebhookInfo");
}

/** Снимает webhook, чтобы снова работал getUpdates. */
export function deleteWebhook(): Promise<boolean> {
  return callTelegram("deleteWebhook", { drop_pending_updates: false });
}

/** Экранирует текст для parse_mode: "HTML". */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export type SendMessageOptions = {
  chatId: string | number;
  text: string;
  parseMode?: "HTML" | "MarkdownV2";
  disableNotification?: boolean;
};

/** Отправляет сообщение в чат. */
export function sendMessage({
  chatId,
  text,
  parseMode,
  disableNotification,
}: SendMessageOptions): Promise<{ message_id: number; chat: TelegramChat }> {
  return callTelegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: parseMode,
    disable_notification: disableNotification,
    link_preview_options: { is_disabled: true },
  });
}

/** Chat id администратора из .env. Бросает ошибку, если не настроен. */
export function requireAdminChatId(): string {
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID?.trim();
  if (!chatId) {
    throw new Error(
      "TELEGRAM_ADMIN_CHAT_ID не задан. Напишите боту /start и выполните: npm run tg:chat-id",
    );
  }
  return chatId;
}

/** Отправляет администратору 6-значный код входа. */
export async function sendAdminLoginCode(
  code: string,
  meta: { email: string; ttlMinutes: number },
): Promise<void> {
  const text = [
    "🔐 <b>Вход в админку Mubarak</b>",
    "",
    `Код: <code>${escapeHtml(code)}</code>`,
    "",
    `Аккаунт: ${escapeHtml(meta.email)}`,
    `Действует ${meta.ttlMinutes} мин.`,
    "",
    "<i>Если вы не запрашивали вход — смените пароль.</i>",
  ].join("\n");

  await sendMessage({ chatId: requireAdminChatId(), text, parseMode: "HTML" });
}
