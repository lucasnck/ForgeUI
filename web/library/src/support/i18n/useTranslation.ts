"use client";

import { useCallback, useMemo } from "react";
import { translateCommon, type CommonTranslationKey, type TranslationParams } from "./dictionary";
import { useLocale } from "./useLocale";

export function useTranslation() {
  const { locale } = useLocale();
  const t = useCallback(
    (key: CommonTranslationKey, params?: TranslationParams, count?: number) =>
      translateCommon(locale, key, params, count),
    [locale],
  );

  return useMemo(() => ({ t }), [t]);
}
