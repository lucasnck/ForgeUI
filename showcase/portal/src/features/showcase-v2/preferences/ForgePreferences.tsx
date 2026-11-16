"use client";
import type { ReactNode } from "react";
import { I18nProvider, useLocale } from "@forge-ui/web/i18n";
import { ThemeProvider, useTheme } from "@forge-ui/web/theme";
export function ForgePreferencesProvider({children}: {children:ReactNode}) {
 return <I18nProvider storageKey="forge-ui-locale"><ThemeProvider storageKey="forge-ui-theme" defaultTheme="light">{children}</ThemeProvider></I18nProvider>;
}
export function useForgePreferences() {
 const {locale,setLocale} = useLocale();
 const {resolvedTheme:theme,setTheme} = useTheme();
 return {locale,setLocale,theme,setTheme};
}
