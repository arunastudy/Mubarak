"use server";

import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

// Persists the chosen interface language in a cookie whose value matches the
// language folder name under `app/i18n/locales`. Called from the language switcher.
export async function setLocale(locale: string): Promise<void> {
  const value: Locale = isLocale(locale) ? locale : defaultLocale;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
