// Подписанные cookie на HMAC-SHA256.
//
// Сервер не хранит состояние сессий: полезная нагрузка лежит в самой cookie,
// а подпись на секрете AUTH_SECRET не даёт её подменить на клиенте.
// Значение cookie выглядит как `<base64url(json)>.<base64url(hmac)>`.
//
// Секретных данных (пароли, коды) в payload быть не должно — cookie
// не шифруется, а только подписывается: прочитать её содержимое может любой,
// кто получил доступ к браузеру.

import { createHmac, timingSafeEqual } from "node:crypto";

function requireSecret(): string {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET не задан или слишком короткий (нужно 16+ символов). Добавьте его в .env",
    );
  }
  return secret;
}

export function hmac(value: string): string {
  return createHmac("sha256", requireSecret()).update(value).digest("base64url");
}

/** Сравнение строк без утечки по времени. */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(hmac(a));
  const bufB = Buffer.from(hmac(b));
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

/** Сериализует payload и добавляет подпись. */
export function sign<T extends object>(payload: T): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${hmac(body)}`;
}

/** Проверяет подпись и возвращает payload, либо null, если токен испорчен. */
export function unsign<T>(token: string | undefined): T | null {
  if (!token) return null;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const body = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expected = Buffer.from(hmac(body));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString()) as T;
  } catch {
    return null;
  }
}
