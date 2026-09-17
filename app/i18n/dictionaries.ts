import { cookies } from "next/headers";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";
import type { Dictionary } from "./dictionary-types";
import { dictionary as ru } from "./locales/ru/dictionary";
import { dictionary as ky } from "./locales/ky/dictionary";
import { dictionary as en } from "./locales/en/dictionary";

// The keys here MUST match the locale folder names under `./locales`.
const dictionaries: Record<Locale, Dictionary> = { ru, ky, en };

// Reads the current interface language from the language cookie.
// Falls back to the default locale when the cookie is missing or invalid.
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

// Returns the dictionary for the given locale, or for the cookie locale.
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  const resolved = locale ?? (await getLocale());
  return dictionaries[resolved];
}

export type { Dictionary };
