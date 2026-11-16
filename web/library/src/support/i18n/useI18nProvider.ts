"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, DEFAULT_LOCALE_STORAGE_KEY, isLocale } from "./locale";
import type { Locale } from "./locale";
import type { I18nProviderProps } from "./I18nProvider";

function createLocaleStore(defaultLocale: Locale, storageKey: string) {
  let current = defaultLocale;
  const listeners = new Set<() => void>();

  function apply(locale: Locale) {
    document.documentElement.lang = locale;
    if (current === locale) return;
    current = locale;
    listeners.forEach((notify) => notify());
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) {
      apply(isLocale(event.newValue) ? event.newValue : defaultLocale);
    }
  }

  return {
    getSnapshot: () => current,
    getServerSnapshot: () => defaultLocale,
    subscribe(notify: () => void) {
      if (listeners.size === 0) {
        let initial = defaultLocale;

        try {
          const stored = window.localStorage.getItem(storageKey);
          if (isLocale(stored)) initial = stored;
        } catch {
          /* Keep the default when browser storage is unavailable. */
        }

        apply(initial);
        window.addEventListener("storage", handleStorage);
      }

      listeners.add(notify);

      return () => {
        listeners.delete(notify);
        if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
      };
    },
    setLocale(locale: Locale) {
      if (!isLocale(locale)) return;
      apply(locale);

      try {
        window.localStorage.setItem(storageKey, locale);
      } catch {
        /* Preference remains usable in memory. */
      }
    },
  };
}

export function useI18nProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
  storageKey = DEFAULT_LOCALE_STORAGE_KEY,
}: I18nProviderProps) {
  const [store] = useState(() => createLocaleStore(defaultLocale, storageKey));
  const locale = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const value = useMemo(() => ({ locale, setLocale: store.setLocale }), [locale, store]);

  return { children, value };
}
