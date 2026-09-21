// Шаг 2 входа через Google: проверяем state, обмениваем code на профиль,
// находим или создаём аккаунт и открываем сессию.
//
// Любая ошибка возвращает гостя на /auth?error=… — на этой странице коды
// превращаются в понятный текст. Подробности уходят только в серверный лог.

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getLocale } from "@/app/i18n/dictionaries";
import { createSession, upsertGoogleUser } from "@/lib/auth";
import {
  GOOGLE_STATE_COOKIE,
  GoogleAuthError,
  exchangeGoogleCode,
  googleRedirectUri,
  redirectResponse,
  resolveAppOrigin,
  type GoogleOAuthState,
} from "@/lib/google-oauth";
import { unsign } from "@/lib/signed-cookie";

function equal(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export async function GET(request: Request) {
  const origin = resolveAppOrigin(request);
  const params = new URL(request.url).searchParams;

  const cookieStore = await cookies();
  const state = unsign<GoogleOAuthState>(cookieStore.get(GOOGLE_STATE_COOKIE)?.value);
  // Cookie одноразовая: удаляем сразу, чтобы code нельзя было переиграть.
  cookieStore.delete(GOOGLE_STATE_COOKIE);

  const fail = (code: string) => redirectResponse(`${origin}/auth?error=${code}`);

  // Гость нажал «Отмена» на экране Google.
  const googleError = params.get("error");
  if (googleError) {
    return fail(googleError === "access_denied" ? "google_cancelled" : "google_failed");
  }

  if (!state || state.x < Date.now()) {
    return fail("google_expired");
  }

  const returnedState = params.get("state");
  const code = params.get("code");
  if (!returnedState || !equal(returnedState, state.s) || !code) {
    return fail("google_failed");
  }

  try {
    const profile = await exchangeGoogleCode({
      code,
      redirectUri: googleRedirectUri(request),
      expectedNonce: state.n,
    });

    const result = await upsertGoogleUser({ ...profile, locale: await getLocale() });
    if (result.status === "blocked") return fail("blocked");

    await createSession(result.userId);
  } catch (error) {
    console.error(
      "[google-callback]",
      error instanceof GoogleAuthError ? error.reason : error,
    );
    return fail("google_failed");
  }

  return redirectResponse(`${origin}${state.p}`);
}
