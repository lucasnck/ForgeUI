import type { Locale } from "../contracts/preferences";

export type { Locale } from "../contracts/preferences";
export const supportedLocales = ["pt-BR", "es", "en"] as const;
export const DEFAULT_LOCALE: Locale = "pt-BR";
export const DEFAULT_LOCALE_STORAGE_KEY = "forge-ui-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && supportedLocales.some((locale) => locale === value);
}
