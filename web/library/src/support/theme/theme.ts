import type { Theme } from "../contracts/preferences";

export type { Theme } from "../contracts/preferences";
export const themes = ["light", "dark", "contrast", "liquid-glass"] as const;
export type ThemePreference = Theme | "system";
export const DEFAULT_THEME: ThemePreference = "system";
export const DEFAULT_THEME_STORAGE_KEY = "forge-ui-theme";

export function normalizeTheme(value: unknown): ThemePreference | undefined {
  if (value === "high-contrast") return "contrast";

  if (value === "system" || (typeof value === "string" && themes.includes(value as Theme))) {
    return value as ThemePreference;
  }

  return undefined;
}

export function resolveTheme(preference: ThemePreference, prefersDark: boolean): Theme {
  return preference === "system" ? (prefersDark ? "dark" : "light") : preference;
}

export function applyTheme(preference: ThemePreference): Theme {
  const resolved = resolveTheme(
    preference,
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme = resolved === "dark" || resolved === "contrast" ? "dark" : "light";
  return resolved;
}

export function themeInitializationScript(
  storageKey: string,
  defaultTheme: ThemePreference,
): string {
  const literal = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");

  return `(function(){var k=${literal(storageKey)},d=${literal(defaultTheme)},v;try{v=localStorage.getItem(k)}catch(_){}if(v==='high-contrast')v='contrast';var a=['light','dark','contrast','liquid-glass','system'],t=a.indexOf(v)>=0?v:d,r=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t,e=document.documentElement;e.dataset.theme=r;e.dataset.themePreference=t;e.style.colorScheme=r==='dark'||r==='contrast'?'dark':'light'})()`;
}
