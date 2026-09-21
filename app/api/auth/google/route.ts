// Шаг 1 входа через Google: кладём state/nonce в подписанную cookie
// и отправляем гостя на consent-экран Google.

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { getLocale } from "@/app/i18n/dictionaries";
import {
  GOOGLE_STATE_COOKIE,
  GOOGLE_STATE_TTL_MINUTES,
  buildGoogleAuthUrl,
  googleRedirectUri,
  isGoogleConfigured,
  redirectResponse,
  resolveAppOrigin,
  safeNextPath,
  type GoogleOAuthState,
} from "@/lib/google-oauth";
import { sign } from "@/lib/signed-cookie";

export async function GET(request: Request) {
  const origin = resolveAppOrigin(request);
  const nextPath = safeNextPath(new URL(request.url).searchParams.get("next"));

  if (!isGoogleConfigured()) {
    return redirectResponse(`${origin}/auth?error=google_unavailable`);
  }

  const state = randomBytes(32).toString("base64url");
  const nonce = randomBytes(32).toString("base64url");

  const payload: GoogleOAuthState = {
    s: state,
    n: nonce,
    p: nextPath,
    x: Date.now() + GOOGLE_STATE_TTL_MINUTES * 60_000,
  };

  const cookieStore = await cookies();
  cookieStore.set(GOOGLE_STATE_COOKIE, sign(payload), {
    httpOnly: true,
    // Google возвращает гостя кросс-сайтовым GET-редиректом, поэтому "lax":
    // при "strict" cookie не дошла бы до callback.
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: GOOGLE_STATE_TTL_MINUTES * 60,
  });

  return redirectResponse(
    buildGoogleAuthUrl({
      redirectUri: googleRedirectUri(request),
      state,
      nonce,
      locale: await getLocale(),
    }),
  );
}
