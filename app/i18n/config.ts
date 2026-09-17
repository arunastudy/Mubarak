// Supported locales. Each value MUST match a folder name under `app/i18n/locales`
// so the language cookie value maps directly to the interface language.
export const locales = ["ru", "ky", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

// Name of the cookie that stores the current interface language.
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Short labels shown on the language switcher button.
export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  ky: "KY",
  en: "EN",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
