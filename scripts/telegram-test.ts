/**
 * Проверка связки с Telegram без запуска Next.js:
 * отправляет в TELEGRAM_ADMIN_CHAT_ID тестовый 6-значный код.
 *
 *   npm run tg:test
 */

import "./console-utf8";
import "dotenv/config";
import { getBotInfo, requireAdminChatId, sendAdminLoginCode } from "../lib/telegram";

async function main() {
  const bot = await getBotInfo();
  console.log(`Бот: @${bot.username}`);

  const chatId = requireAdminChatId();
  console.log(`Чат: ${chatId}`);

  // Тот же генератор, что и в реальном логине, но без зависимости от next/headers.
  const code = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  await sendAdminLoginCode(code, { email: "test@mubarak.kg", ttlMinutes: 5 });
  console.log(`\nОтправлено. Код в сообщении: ${code}`);
}

main().catch((error: unknown) => {
  console.error("Ошибка:", error instanceof Error ? error.message : error);
  process.exit(1);
});
