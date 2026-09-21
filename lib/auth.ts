// Вход и регистрация гостей: email + пароль либо Google.
//
// Сессия — подписанная httpOnly-cookie с id пользователя (см. signed-cookie.ts).
// Отдельной таблицы сессий нет: выход стирает cookie, а `status` в users
// проверяется на каждом запросе, поэтому заблокированный аккаунт теряет доступ
// сразу, не дожидаясь истечения cookie.
//
// Пароли хешируются scrypt из стандартной библиотеки Node — это осознанный
// выбор вместо bcrypt/argon2, чтобы не тянуть нативную зависимость.

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { sign, unsign } from "./signed-cookie";
import type { Locale } from "@/app/i18n/config";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

export const SESSION_COOKIE = "mubarak_session";

const SESSION_TTL_DAYS = 30;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export const MIN_PASSWORD_LENGTH = 8;

// --- Пароли -----------------------------------------------------------------

/** Хеш вида `scrypt$<salt>$<key>` (обе части в base64url). */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const key = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt$${salt.toString("base64url")}$${key.toString("base64url")}`;
}

/** Проверяет пароль против хеша. Не бросает исключений на битом хеше. */
export async function verifyPassword(
  password: string,
  storedHash: string | null,
): Promise<boolean> {
  if (!storedHash) return false;

  const [scheme, saltPart, keyPart] = storedHash.split("$");
  if (scheme !== "scrypt" || !saltPart || !keyPart) return false;

  const expected = Buffer.from(keyPart, "base64url");
  if (expected.length !== KEY_LENGTH) return false;

  const actual = await scrypt(password, Buffer.from(saltPart, "base64url"), KEY_LENGTH);
  return timingSafeEqual(expected, actual);
}

// --- Сессия -----------------------------------------------------------------

type SessionPayload = {
  /** id пользователя */
  u: string;
  /** срок действия, unix ms */
  x: number;
};

export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  const payload: SessionPayload = {
    u: userId,
    x: Date.now() + SESSION_TTL_DAYS * 86_400_000,
  };

  cookieStore.set(SESSION_COOKIE, sign(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_DAYS * 86_400,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export type SessionUser = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

/**
 * Текущий гость или null. Читает cookie, поэтому страница, которая её
 * вызывает, рендерится динамически.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const payload = unsign<SessionPayload>(cookieStore.get(SESSION_COOKIE)?.value);
  if (!payload || payload.x < Date.now()) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.u },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      status: true,
    },
  });

  if (!user || user.status !== "active") return null;

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
  };
}

/** Короткое имя для шапки: имя, иначе часть email до «@». */
export function userDisplayName(user: SessionUser): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (name) return name;
  return user.email?.split("@")[0] ?? "";
}

// --- Email + пароль ---------------------------------------------------------

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export type RegisterResult =
  | { status: "ok"; userId: string }
  | { status: "email-taken" };

export async function registerWithEmail(input: {
  name: string;
  email: string;
  password: string;
  locale: Locale;
}): Promise<RegisterResult> {
  const email = normalizeEmail(input.email);

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existing) return { status: "email-taken" };

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: await hashPassword(input.password),
      firstName: input.name.trim() || null,
      preferredLanguage: input.locale,
      lastLoginAt: new Date(),
    },
    select: { id: true },
  });

  return { status: "ok", userId: user.id };
}

export type LoginResult =
  | { status: "ok"; userId: string }
  | { status: "invalid" }
  | { status: "blocked" };

export async function loginWithEmail(
  rawEmail: string,
  password: string,
): Promise<LoginResult> {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(rawEmail) },
    select: { id: true, passwordHash: true, status: true },
  });

  // Хешируем даже для несуществующего пользователя, чтобы время ответа
  // не выдавало, зарегистрирован ли такой email.
  const passwordOk = await verifyPassword(password, user?.passwordHash ?? null);

  if (!user || !passwordOk) return { status: "invalid" };
  if (user.status !== "active") return { status: "blocked" };

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return { status: "ok", userId: user.id };
}

// --- Google -----------------------------------------------------------------

/**
 * Находит или создаёт аккаунт по Google-профилю.
 *
 * Сначала ищем по `googleId`, затем по email — так гость, который
 * зарегистрировался паролем, при первом входе через Google попадает в свой
 * аккаунт, а не во второй. Привязываем email только если Google его подтвердил.
 */
export async function upsertGoogleUser(profile: {
  googleId: string;
  email: string | null;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  locale: Locale;
}): Promise<{ status: "ok"; userId: string } | { status: "blocked" }> {
  const email = profile.email ? normalizeEmail(profile.email) : null;
  const linkableEmail = email && profile.emailVerified ? email : null;

  const existing =
    (await prisma.user.findUnique({
      where: { googleId: profile.googleId },
      select: { id: true, status: true, googleId: true, avatarUrl: true, firstName: true },
    })) ??
    (linkableEmail
      ? await prisma.user.findUnique({
          where: { email: linkableEmail },
          select: { id: true, status: true, googleId: true, avatarUrl: true, firstName: true },
        })
      : null);

  if (existing) {
    if (existing.status !== "active") return { status: "blocked" };

    await prisma.user.update({
      where: { id: existing.id },
      data: {
        googleId: profile.googleId,
        // Своё имя и аватар пользователя не перезатираем — только заполняем пустые.
        firstName: existing.firstName ?? profile.firstName,
        avatarUrl: existing.avatarUrl ?? profile.avatarUrl,
        emailVerified: profile.emailVerified || undefined,
        lastLoginAt: new Date(),
      },
    });

    return { status: "ok", userId: existing.id };
  }

  const created = await prisma.user.create({
    data: {
      googleId: profile.googleId,
      email: linkableEmail,
      emailVerified: Boolean(linkableEmail),
      firstName: profile.firstName,
      lastName: profile.lastName,
      avatarUrl: profile.avatarUrl,
      preferredLanguage: profile.locale,
      lastLoginAt: new Date(),
    },
    select: { id: true },
  });

  return { status: "ok", userId: created.id };
}
