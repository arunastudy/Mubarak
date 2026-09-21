/**
 * Снимает webhook с бота. Нужно только если getUpdates возвращает ошибку
 * "can't use getUpdates method while webhook is active".
 *
 *   npm run tg:reset-webhook
 */

import "./console-utf8";
import "dotenv/config";
import { deleteWebhook, getWebhookInfo } from "../lib/telegram";

async function main() {
  const before = await getWebhookInfo();

  if (!before.url) {
    console.log("Webhook не установлен — getUpdates должен работать.");
    return;
  }

  console.log(`Текущий webhook: ${before.url}`);
  await deleteWebhook();
  console.log("Webhook снят.");
}

main().catch((error: unknown) => {
  console.error("Ошибка:", error instanceof Error ? error.message : error);
  process.exit(1);
});
