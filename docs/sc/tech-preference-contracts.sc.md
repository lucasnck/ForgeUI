---
title: "Preference contracts"
scope: "Neutral locale and theme value types"
status: "DONE"
type: "type"
ds-level: "none"
---

# Preference contracts

## Files

```text
lib/contracts/preferences.ts (M)
```

## Contract

```ts
import type { Locale, Theme } from "../../web/library/src/support/contracts/preferences";
type UserLocale = Locale;
type UserTheme = Theme;
```

## Content

```ts
export type Locale = "pt-BR" | "es" | "en";
export type Theme = "light" | "dark" | "contrast" | "liquid-glass";
```

## Tests

- Compile pt-BR, es and en locales and the four declared theme names.
- Reject unsupported locale/theme strings and legacy high-contrast after its documented migration.
- Compile consumers from DS and infrastructure using the same neutral types.

## Criteria

- [x] DS and infrastructure share the neutral Locale and Theme contracts without a DS import of application infrastructure.
