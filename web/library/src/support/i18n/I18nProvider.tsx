"use client";

import type { ReactNode } from "react";
import type { Locale } from "./locale";
import { LocaleContext } from "./context";
import { useI18nProvider } from "./useI18nProvider";

export { LocaleContext } from "./context";
export type { LocaleContextValue } from "./context";

export interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
  storageKey?: string;
}

export function I18nProvider(props: I18nProviderProps) {
  const view = useI18nProvider(props);

  return <LocaleContext.Provider value={view.value}>{view.children}</LocaleContext.Provider>;
}
