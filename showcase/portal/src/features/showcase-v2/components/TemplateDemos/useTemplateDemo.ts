"use client";
import { useRef, useId, useState, useSyncExternalStore, useEffect } from "react";
import { useLocale, isLocale } from "../../../../../../../web/library/src/support/i18n";
import { useTheme, normalizeTheme } from "../../../../../../../web/library/src/support/theme";
import { options as localeOptions } from "../LocaleSelector/fixtures";
import { options as themeOptions } from "../ThemeSelector/fixtures";
const subscribe = () => () => undefined;

export function useTemplateDemo() {
  const query = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const settings = new URLSearchParams(query);
  const { locale, setLocale } = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const processed = useRef<string | null>(null);
  const incomingLocale = settings.get("locale"),
    incomingTheme = settings.get("theme");
  useEffect(() => {
    if (processed.current === query) return;
    processed.current = query;
    if (incomingLocale && isLocale(incomingLocale) && incomingLocale !== locale)
      setLocale(incomingLocale);
    const normalizedTheme = normalizeTheme(incomingTheme);
    if (normalizedTheme && normalizedTheme !== resolvedTheme) setTheme(normalizedTheme);
  }, [query, incomingLocale, incomingTheme, locale, setLocale, resolvedTheme, setTheme]);
  const id = useId();
  const [selected, setSelected] = useState("item-1");
  const [actions, setActions] = useState(0);

  function action() {
    setActions((n) => n + 1);
  }

  function activate(value: string) {
    return () => {
      setSelected(value);
      setActions((n) => n + 1);
    };
  }

  return {
    settings,
    id,
    selected,
    actions,
    action,
    activate,
    localeSelectorProps: {
      label: "Locale",
      value: locale,
      options: localeOptions,
      onValueChange: setLocale,
    },
    themeSelectorProps: {
      label: "Theme",
      value: resolvedTheme,
      options: themeOptions,
      onValueChange: setTheme,
    },
  };
}
