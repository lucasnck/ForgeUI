"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  applyTheme,
  DEFAULT_THEME,
  DEFAULT_THEME_STORAGE_KEY,
  normalizeTheme,
  resolveTheme,
} from "./theme";
import type { Theme, ThemePreference } from "./theme";
import type { ThemeProviderProps } from "./ThemeProvider";

const THEME_CHANGE_EVENT = "praticar-theme-change";

export function useThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const readPreference = useCallback(
    () => normalizeTheme(document.documentElement.dataset.themePreference) ?? defaultTheme,
    [defaultTheme],
  );
  const subscribe = useCallback(
    (notify: () => void) => {
      let preference = readPreference();

      try {
        preference = normalizeTheme(window.localStorage.getItem(storageKey)) ?? defaultTheme;
      } catch {
        // Keep the pre-hydration DOM preference when storage is unavailable.
      }

      applyTheme(preference);
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const onSystemChange = () => {
        if (readPreference() === "system") {
          applyTheme("system");
          notify();
        }
      };

      const onStorage = (event: StorageEvent) => {
        if (event.key !== storageKey && event.key !== null) return;
        applyTheme(normalizeTheme(event.newValue) ?? defaultTheme);
        notify();
      };

      media.addEventListener("change", onSystemChange);
      window.addEventListener("storage", onStorage);
      window.addEventListener(THEME_CHANGE_EVENT, notify);

      return () => {
        media.removeEventListener("change", onSystemChange);
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(THEME_CHANGE_EVENT, notify);
      };
    },
    [defaultTheme, readPreference, storageKey],
  );
  const getSnapshot = useCallback(() => {
    const preference = readPreference();

    return `${preference}:${resolveTheme(preference, window.matchMedia("(prefers-color-scheme: dark)").matches)}`;
  }, [readPreference]);
  const getServerSnapshot = useCallback(
    () => `${defaultTheme}:${resolveTheme(defaultTheme, false)}`,
    [defaultTheme],
  );
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [theme, resolvedTheme] = snapshot.split(":") as [ThemePreference, Theme];
  const setTheme = useCallback(
    (next: ThemePreference) => {
      applyTheme(next);

      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        /* DOM retains the preference. */
      }

      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    },
    [storageKey],
  );
  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return { children, value };
}
