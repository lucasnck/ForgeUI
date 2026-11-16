---
title: "Theme preference helpers"
scope: "Theme normalization, resolution, document attributes and initialization script"
status: "DONE"
type: "helper"
ds-level: "none"
---

# Theme preference helpers

## Files

```text
infrastructure/theme/theme.ts (M)
```

## Dependencies

- [Design tokens](ds/styles/tech-design-tokens.sc.md)
- [Preference contracts](tech-preference-contracts.sc.md)

## Contract

```ts
import { normalizeTheme, resolveTheme } from "../../web/library/src/support/theme";
const preference = normalizeTheme(stored);
const theme = resolveTheme(preference ?? "system", prefersDark);
```

## Content

```ts
import type { Theme } from "../../web/library/src/support/contracts/preferences";
export type { Theme } from "../../web/library/src/support/contracts/preferences";
export const themes = ["light", "dark", "contrast", "liquid-glass"] as const;
export type ThemePreference = Theme | "system";
export const DEFAULT_THEME: ThemePreference = "system";
export const DEFAULT_THEME_STORAGE_KEY = "praticar-theme";
export function normalizeTheme(value: unknown): ThemePreference | undefined {
  if (value === "high-contrast")
    return "contrast";
  if (value === "system" ||
    (typeof value === "string" && themes.includes(value as Theme))) {
    return value as ThemePreference;
  }
  return undefined;
}
export function resolveTheme(preference: ThemePreference, prefersDark: boolean): Theme {
  return preference === "system"
    ? prefersDark
      ? "dark"
      : "light"
    : preference;
}
export function applyTheme(preference: ThemePreference): Theme {
  const resolved = resolveTheme(preference, window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themePreference = preference;
  root.style.colorScheme =
    resolved === "dark" || resolved === "contrast" ? "dark" : "light";
  return resolved;
}
export function themeInitializationScript(storageKey: string, defaultTheme: ThemePreference): string {
  const literal = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");
  return `(function(){var k=${literal(storageKey)},d=${literal(defaultTheme)},v;try{v=localStorage.getItem(k)}catch(_){}if(v==='high-contrast')v='contrast';var a=['light','dark','contrast','liquid-glass','system'],t=a.indexOf(v)>=0?v:d,r=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t,e=document.documentElement;e.dataset.theme=r;e.dataset.themePreference=t;e.style.colorScheme=r==='dark'||r==='contrast'?'dark':'light'})()`;
}
```

## Tests

- Explicit, system, legacy and invalid preferences normalize/resolve as declared.
- Script generation safely quotes storage keys and defaults without browser access.
- Client application uses the resolved root attributes and documented colorScheme.

## Criteria

- [x] Explicit supported themes resolve unchanged; system resolves to dark or light from the supplied preference.
- [x] Persisted high-contrast normalizes to contrast; unsupported values normalize to undefined.
- [x] Default preference is system and the canonical storage key is praticar-theme.
- [x] applyTheme sets resolved and preference root attributes and the documented colorScheme.
- [x] The initialization script uses matching defaults/key, safely quotes caller strings and preserves selection when storage is denied.
- [x] Pure normalization/resolution does not access browser globals; document mutation runs only in explicit client calls.
