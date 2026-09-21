/**
 * Показывает chat_id тех, кто уже писал боту.
 *
 *   1. Откройте Telegram, найдите @mubarak_admin_bot и нажмите "Start".
 *   2. npm run tg:chat-id
 *   3. Скопируйте id в TELEGRAM_ADMIN_CHAT_ID в .env
 *
 * getUpdates не работает, если на бота установлен webhook — в этом случае
 * сначала выполните deleteWebhook.
 */

import "./console-utf8";
import "dotenv/config";
import { getBotInfo, getUpdates, type TelegramChat } from "../lib/telegram";

function describe(chat: TelegramChat): string {
  const name = [chat.first_name, chat.last_name].filter(Boolean).join(" ");
  const label = chat.title ?? name ?? "—";
  const handle = chat.username ? ` @${chat.username}` : "";
  return `${String(chat.id).padEnd(16)} ${chat.type.padEnd(10)} ${label}${handle}`;
}

async function main() {
  const bot = await getBotInfo();
  console.log(`Бот: @${bot.username} (id ${bot.id})\n`);

  const updates = await getUpdates();
  const chats = new Map<number, TelegramChat>();

  for (const update of updates) {
    const chat = update.message?.chat ?? update.my_chat_member?.chat;
    if (chat) chats.set(chat.id, chat);
  }

  if (chats.size === 0) {
    console.log("Апдейтов нет.");
    console.log(`Откройте https://t.me/${bot.username}, нажмите Start,`);
    console.log("отправьте любое сообщение и запустите скрипт снова.");
    console.log("\nЕсли не помогает — возможно, установлен webhook:");
    console.log("  npm run tg:reset-webhook");
    return;
  }

  console.log("CHAT_ID          ТИП        КТО");
  console.log("─".repeat(60));
  for (const chat of chats.values()) console.log(describe(chat));
  console.log("\nСкопируйте нужный id в TELEGRAM_ADMIN_CHAT_ID в .env");
}

main().catch((error: unknown) => {
  console.error("Ошибка:", error instanceof Error ? error.message : error);
  process.exit(1);
});
