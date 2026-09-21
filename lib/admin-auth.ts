// Двухфакторный вход в админку: email + пароль → 6-значный код в Telegram.
//
// Состояние между двумя шагами хранится в подписанной httpOnly-cookie, а не в
// памяти процесса: dev-сервер перезагружает модули, а в проде инстансов может
// быть несколько. Сам код в cookie не лежит — только его HMAC-хеш.
//
// Временно проверяем логин по ADMIN_EMAIL/ADMIN_PASSWORD из .env.
// Когда появится таблица админов, заменить verifyCredentials на запрос к БД
// с bcrypt/argon2-хешем из users.password_hash.

import { randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { hmac, safeEqual, sign, unsign } from "./signed-cookie";

export const CHALLENGE_COOKIE = "mubarak_admin_challenge";
export const SESSION_COOKIE = "mubarak_admin_session";

export const CODE_LENGTH = 6;
export const CODE_TTL_MINUTES = 5;
export const MAX_CODE_ATTEMPTS = 5;
const SESSION_TTL_HOURS = 8;

// --- Шаг 1: email + пароль --------------------------------------------------

/** Проверяет логин/пароль администратора. */
export function verifyCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim();
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    throw new Error("ADMIN_EMAIL и ADMIN_PASSWORD не заданы в .env");
  }

  // Оба сравнения выполняем всегда, чтобы время ответа не выдавало,
  // существует ли такой email.
  const emailOk = safeEqual(email.trim().toLowerCase(), expectedEmail.toLowerCase());
  const passwordOk = safeEqual(password, expectedPassword);
  return emailOk && passwordOk;
}

/** Криптостойкий 6-значный код. Может начинаться с нуля. */
export function generateCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i += 1) {
    code += randomInt(0, 10).toString();
  }
  return code;
}

type ChallengePayload = {
  /** email администратора, прошедшего первый шаг */
  e: string;
  /** HMAC кода */
  c: string;
  /** срок действия, unix ms */
  x: number;
  /** сколько попыток ввода уже израсходовано */
  a: number;
};

/** Сохраняет в cookie хеш кода и срок его действия. */
export async function startChallenge(email: string, code: string): Promise<void> {
  const cookieStore = await cookies();
  const payload: ChallengePayload = {
    e: email.trim().toLowerCase(),
    c: hmac(`code:${code}`),
    x: Date.now() + CODE_TTL_MINUTES * 60_000,
    a: 0,
  };

  cookieStore.set(CHALLENGE_COOKIE, sign(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CODE_TTL_MINUTES * 60,
  });
}

export async function clearChallenge(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CHALLENGE_COOKIE);
}

/** Есть ли активный (неистёкший) запрос кода, и для какого email. */
export async function readChallenge(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const payload = unsign<ChallengePayload>(cookieStore.get(CHALLENGE_COOKIE)?.value);
  if (!payload || payload.x < Date.now()) return null;
  return { email: payload.e };
}

export type VerifyCodeResult =
  | { status: "ok"; email: string }
  | { status: "expired" }
  | { status: "invalid"; attemptsLeft: number }
  | { status: "too-many-attempts" };

/** Проверяет введённый код и расходует попытку. */
export async function verifyCode(code: string): Promise<VerifyCodeResult> {
  const cookieStore = await cookies();
  const payload = unsign<ChallengePayload>(cookieStore.get(CHALLENGE_COOKIE)?.value);

  if (!payload || payload.x < Date.now()) {
    cookieStore.delete(CHALLENGE_COOKIE);
    return { status: "expired" };
  }

  if (payload.a >= MAX_CODE_ATTEMPTS) {
    cookieStore.delete(CHALLENGE_COOKIE);
    return { status: "too-many-attempts" };
  }

  const expected = Buffer.from(payload.c);
  const received = Buffer.from(hmac(`code:${code.trim()}`));
  const matches =
    expected.length === received.length && timingSafeEqual(expected, received);

  if (!matches) {
    const attempts = payload.a + 1;
    if (attempts >= MAX_CODE_ATTEMPTS) {
      cookieStore.delete(CHALLENGE_COOKIE);
      return { status: "too-many-attempts" };
    }

    // Перезаписываем cookie с увеличенным счётчиком, сохраняя исходный срок.
    cookieStore.set(CHALLENGE_COOKIE, sign({ ...payload, a: attempts }), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.max(1, Math.ceil((payload.x - Date.now()) / 1000)),
    });

    return { status: "invalid", attemptsLeft: MAX_CODE_ATTEMPTS - attempts };
  }

  cookieStore.delete(CHALLENGE_COOKIE);
  return { status: "ok", email: payload.e };
}

// --- Сессия -----------------------------------------------------------------

type SessionPayload = { e: string; x: number };

export async function createSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  const payload: SessionPayload = {
    e: email,
    x: Date.now() + SESSION_TTL_HOURS * 3_600_000,
  };

  cookieStore.set(SESSION_COOKIE, sign(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_HOURS * 3600,
  });
}

/** Текущий администратор или null. Проверять в каждом защищённом действии. */
export async function getSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const payload = unsign<SessionPayload>(cookieStore.get(SESSION_COOKIE)?.value);
  if (!payload || payload.x < Date.now()) return null;
  return { email: payload.e };
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(CHALLENGE_COOKIE);
}
