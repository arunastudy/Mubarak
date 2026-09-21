// Состояние формы входа/регистрации между вызовами серверного экшена.
//
// Экшен возвращает КОД ошибки, а не текст: текст подставляет клиент из словаря
// текущего языка. Коды совпадают с ключами dict.auth.errors.

export type AuthMode = "login" | "register";

export type AuthErrorCode =
  | "fields"
  | "email"
  | "password"
  | "credentials"
  | "emailTaken"
  | "blocked"
  | "googleCancelled"
  | "googleFailed"
  | "googleExpired"
  | "googleUnavailable"
  | "unknown";

export type AuthState = {
  mode: AuthMode;
  error?: AuthErrorCode;
};

export const initialAuthState: AuthState = { mode: "login" };

/** Коды из ?error=… в url (их ставит Google-callback) → ключи словаря. */
const URL_ERRORS: Record<string, AuthErrorCode> = {
  google_cancelled: "googleCancelled",
  google_failed: "googleFailed",
  google_expired: "googleExpired",
  google_unavailable: "googleUnavailable",
  blocked: "blocked",
};

export function authErrorFromUrl(value: unknown): AuthErrorCode | undefined {
  if (typeof value !== "string") return undefined;
  return URL_ERRORS[value] ?? "unknown";
}
