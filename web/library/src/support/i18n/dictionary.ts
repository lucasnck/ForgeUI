import type { Locale } from "./locale";
import { ptBR } from "./messages/pt-BR";
import { es } from "./messages/es";
import { en } from "./messages/en";

export type CommonTranslationKey = keyof typeof ptBR;
export type PluralMessage = { other: string } & Partial<Record<Intl.LDMLPluralRule, string>>;
export type CommonDictionary = Record<CommonTranslationKey, string | PluralMessage>;
export type TranslationParams = Readonly<Record<string, string | number>>;
export const dictionaries: Readonly<Record<Locale, CommonDictionary>> = {
  "pt-BR": ptBR,
  es,
  en,
};

export function translateCommon(
  locale: Locale,
  key: CommonTranslationKey,
  params: TranslationParams = {},
  count?: number,
): string {
  const message = dictionaries[locale]?.[key] ?? ptBR[key];

  if (!message) {
    if (process.env.NODE_ENV !== "production") console.warn(`Missing translation: ${key}`);
    return key;
  }

  const text =
    typeof message === "string"
      ? message
      : (message[new Intl.PluralRules(locale).select(count ?? 0)] ?? message.other);
  const values = count === undefined ? params : { ...params, count };

  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    values[name] === undefined ? placeholder : String(values[name]),
  );
}
