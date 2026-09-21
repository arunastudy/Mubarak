"use server";

import { refresh } from "next/cache";
import {
  CODE_TTL_MINUTES,
  clearChallenge,
  createSession,
  destroySession,
  generateCode,
  startChallenge,
  verifyCode,
  verifyCredentials,
} from "@/lib/admin-auth";
import { TelegramError, sendAdminLoginCode } from "@/lib/telegram";
import { initialLoginState, type LoginState } from "./login-state";

// Одинаковый текст для неверного email и неверного пароля — чтобы перебором
// нельзя было выяснить, какие аккаунты существуют.
const GENERIC_CREDENTIALS_ERROR = "Неверный email или пароль";

/**
 * Единая точка входа для формы логина. Шаг выбирается по скрытому полю
 * `intent`, поэтому форма может работать через один useActionState.
 */
export async function loginAction(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const intent = String(formData.get("intent") ?? "credentials");

  if (intent === "cancel") {
    await clearChallenge();
    return initialLoginState;
  }
  if (intent === "code") {
    return submitCode(prevState, formData);
  }
  return requestCode(formData);
}

/** Шаг 1: проверяем логин/пароль и отправляем 6-значный код в Telegram. */
async function requestCode(formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { step: "credentials", error: "Заполните email и пароль" };
  }

  let credentialsOk: boolean;
  try {
    credentialsOk = verifyCredentials(email, password);
  } catch (error) {
    console.error("[admin-login] конфигурация:", error);
    return {
      step: "credentials",
      error: "Вход не настроен: проверьте ADMIN_EMAIL, ADMIN_PASSWORD и AUTH_SECRET в .env",
    };
  }

  if (!credentialsOk) {
    return { step: "credentials", error: GENERIC_CREDENTIALS_ERROR };
  }

  const code = generateCode();

  try {
    await sendAdminLoginCode(code, { email, ttlMinutes: CODE_TTL_MINUTES });
  } catch (error) {
    console.error("[admin-login] Telegram:", error);
    const reason =
      error instanceof TelegramError
        ? error.description
        : error instanceof Error
          ? error.message
          : "неизвестная ошибка";
    return {
      step: "credentials",
      error: `Не удалось отправить код в Telegram: ${reason}`,
    };
  }

  // Cookie ставим только после успешной отправки, иначе пользователь застрянет
  // на шаге ввода кода, которого он не получил.
  await startChallenge(email, code);

  return {
    step: "code",
    email,
    notice: `Код отправлен в Telegram. Действует ${CODE_TTL_MINUTES} мин.`,
  };
}

/** Шаг 2: проверяем код и открываем сессию. */
async function submitCode(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const code = String(formData.get("code") ?? "").replace(/\D/g, "");

  if (code.length !== 6) {
    return { ...prevState, step: "code", error: "Введите 6 цифр кода" };
  }

  const result = await verifyCode(code);

  switch (result.status) {
    case "ok":
      await createSession(result.email);
      // Сессия установлена — перерисовываем страницу, чтобы показать её.
      refresh();
      return { step: "credentials", notice: "Вход выполнен" };

    case "expired":
      return {
        step: "credentials",
        error: "Срок действия кода истёк. Войдите заново.",
      };

    case "too-many-attempts":
      return {
        step: "credentials",
        error: "Слишком много неверных попыток. Войдите заново.",
      };

    case "invalid":
      return {
        ...prevState,
        step: "code",
        error: `Неверный код. Осталось попыток: ${result.attemptsLeft}`,
      };
  }
}

export async function logout(): Promise<void> {
  await destroySession();
  refresh();
}
