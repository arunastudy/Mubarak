"use server";

import { redirect } from "next/navigation";
import { getLocale } from "@/app/i18n/dictionaries";
import {
  MIN_PASSWORD_LENGTH,
  createSession,
  destroySession,
  loginWithEmail,
  registerWithEmail,
} from "@/lib/auth";
import { safeNextPath } from "@/lib/google-oauth";
import type { AuthMode, AuthState } from "./auth-state";

// Достаточная проверка для формы: окончательный вердикт по адресу всё равно
// даёт письмо подтверждения, а не регулярное выражение.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Один экшен на оба режима: вкладка передаётся скрытым полем `mode`, поэтому
 * форме достаточно одного useActionState.
 */
export async function authAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const mode: AuthMode = formData.get("mode") === "register" ? "register" : "login";
  const nextPath = safeNextPath(String(formData.get("next") ?? "/"));

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password || (mode === "register" && !name)) {
    return { mode, error: "fields" };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { mode, error: "email" };
  }
  if (mode === "register" && password.length < MIN_PASSWORD_LENGTH) {
    return { mode, error: "password" };
  }

  try {
    if (mode === "register") {
      const result = await registerWithEmail({
        name,
        email,
        password,
        locale: await getLocale(),
      });
      if (result.status === "email-taken") return { mode, error: "emailTaken" };
      await createSession(result.userId);
    } else {
      const result = await loginWithEmail(email, password);
      if (result.status === "invalid") return { mode, error: "credentials" };
      if (result.status === "blocked") return { mode, error: "blocked" };
      await createSession(result.userId);
    }
  } catch (error) {
    // Чаще всего это недоступная база. Пользователю — общий текст, детали в лог.
    console.error("[auth]", error);
    return { mode, error: "unknown" };
  }

  // redirect бросает управляющее исключение, поэтому должен быть вне try.
  redirect(nextPath);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
