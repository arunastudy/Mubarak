// Вход через Google: authorization code flow, без сторонних библиотек.
//
// Работает ТОЛЬКО на сервере — читает GOOGLE_CLIENT_SECRET из process.env.
// Не импортировать в Client Components.
//
// Поток:
//   1. /api/auth/google          → redirect на consent-экран Google
//   2. Google                    → redirect на /api/auth/google/callback?code=…
//   3. callback                  → обмен code на id_token, создание сессии
//
// state и nonce лежат в подписанной httpOnly-cookie: state защищает от CSRF
// (нам подсунут чужой code), nonce — от подстановки чужого id_token.

const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

/** Issuer'ы, которые Google использует в id_token. */
const VALID_ISSUERS = new Set(["accounts.google.com", "https://accounts.google.com"]);

export const GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";
export const GOOGLE_STATE_COOKIE = "mubarak_google_oauth";
export const GOOGLE_STATE_TTL_MINUTES = 10;

/** Содержимое подписанной cookie между шагами 1 и 2. */
export type GoogleOAuthState = {
  /** state, который мы ждём обратно от Google */
  s: string;
  /** nonce, который должен оказаться в id_token */
  n: string;
  /** внутренний путь, куда вернуть гостя после входа */
  p: string;
  /** срок действия, unix ms */
  x: number;
};

/**
 * Разрешает только внутренние пути — иначе параметр `next` превратился бы
 * в open redirect на чужой домен.
 */
export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/")) return "/";
  // "//evil.com" и "/\evil.com" браузер трактует как внешний адрес.
  if (value.startsWith("//") || value.startsWith("/\\")) return "/";
  return value;
}

/** Редирект с изменяемыми заголовками: Next дописывает в них Set-Cookie. */
export function redirectResponse(location: string): Response {
  return new Response(null, { status: 307, headers: { Location: location } });
}

/** Ошибка обмена кода. Сообщение не содержит client_secret. */
export class GoogleAuthError extends Error {
  constructor(public readonly reason: string) {
    super(`Google OAuth: ${reason}`);
    this.name = "GoogleAuthError";
  }
}

/** Настроен ли вход через Google. Страница входа скрывает кнопку, если нет. */
export function isGoogleConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim(),
  );
}

function requireCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new GoogleAuthError(
      "GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET не заданы в .env",
    );
  }
  return { clientId, clientSecret };
}

/**
 * Базовый адрес сайта. За прокси (Vercel, nginx) origin запроса может быть
 * внутренним, поэтому NEXT_PUBLIC_APP_URL имеет приоритет.
 */
export function resolveAppOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  return new URL(request.url).origin;
}

/**
 * redirect_uri должен совпадать посимвольно с тем, что указан в Google Cloud
 * Console → Credentials → Authorized redirect URIs.
 */
export function googleRedirectUri(request: Request): string {
  return `${resolveAppOrigin(request)}${GOOGLE_CALLBACK_PATH}`;
}

export function buildGoogleAuthUrl(params: {
  redirectUri: string;
  state: string;
  nonce: string;
  /** Язык consent-экрана Google. */
  locale?: string;
}): string {
  const { clientId } = requireCredentials();

  const url = new URL(AUTH_ENDPOINT);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", params.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", params.state);
  url.searchParams.set("nonce", params.nonce);
  // Refresh token не нужен: Google API мы не вызываем, только читаем профиль.
  url.searchParams.set("access_type", "online");
  url.searchParams.set("prompt", "select_account");
  if (params.locale) url.searchParams.set("hl", params.locale);

  return url.toString();
}

export type GoogleProfile = {
  /** `sub` из id_token — стабильный id Google-аккаунта. */
  googleId: string;
  email: string | null;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

type IdTokenClaims = {
  iss?: string;
  aud?: string;
  sub?: string;
  exp?: number;
  nonce?: string;
  email?: string;
  email_verified?: boolean | string;
  given_name?: string;
  family_name?: string;
  name?: string;
  picture?: string;
};

/** Читает payload JWT без проверки подписи (проверка — в verifyClaims). */
function decodeIdToken(idToken: string): IdTokenClaims {
  const payload = idToken.split(".")[1];
  if (!payload) throw new GoogleAuthError("id_token имеет неверный формат");

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()) as IdTokenClaims;
  } catch {
    throw new GoogleAuthError("не удалось разобрать id_token");
  }
}

/**
 * Обменивает authorization code на профиль пользователя.
 *
 * Подпись id_token не проверяем по JWKS сознательно: токен получен прямым
 * server-to-server запросом к Google по TLS, что Google разрешает как
 * альтернативу проверке подписи. Claims всё равно валидируем.
 */
export async function exchangeGoogleCode(params: {
  code: string;
  redirectUri: string;
  expectedNonce: string;
}): Promise<GoogleProfile> {
  const { clientId, clientSecret } = requireCredentials();

  let response: Response;
  try {
    response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: params.code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: params.redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
  } catch {
    throw new GoogleAuthError("не удалось связаться с oauth2.googleapis.com");
  }

  const data = (await response.json().catch(() => null)) as
    | { id_token?: string; error?: string; error_description?: string }
    | null;

  if (!response.ok || !data) {
    // error_description от Google не содержит секретов, но может раскрывать
    // детали конфигурации — в лог, не пользователю.
    console.error("[google-oauth] обмен кода не удался:", {
      status: response.status,
      error: data?.error,
      description: data?.error_description,
    });
    throw new GoogleAuthError("Google отклонил запрос на обмен кода");
  }
  if (!data.id_token) {
    throw new GoogleAuthError("Google не вернул id_token");
  }

  const claims = decodeIdToken(data.id_token);

  if (!claims.iss || !VALID_ISSUERS.has(claims.iss)) {
    throw new GoogleAuthError("неизвестный issuer в id_token");
  }
  if (claims.aud !== clientId) {
    throw new GoogleAuthError("id_token выдан другому client_id");
  }
  if (!claims.exp || claims.exp * 1000 <= Date.now()) {
    throw new GoogleAuthError("id_token истёк");
  }
  if (claims.nonce !== params.expectedNonce) {
    throw new GoogleAuthError("nonce не совпадает");
  }
  if (!claims.sub) {
    throw new GoogleAuthError("в id_token нет sub");
  }

  // Google отдаёт email_verified то булевым, то строкой — приводим сами.
  const emailVerified =
    claims.email_verified === true || claims.email_verified === "true";

  // Если given_name/family_name нет, берём первое слово из name.
  const fallbackName = claims.name?.trim().split(/\s+/) ?? [];

  return {
    googleId: claims.sub,
    email: claims.email ?? null,
    emailVerified,
    firstName: claims.given_name ?? fallbackName[0] ?? null,
    lastName: claims.family_name ?? (fallbackName.slice(1).join(" ") || null),
    avatarUrl: claims.picture ?? null,
  };
}
