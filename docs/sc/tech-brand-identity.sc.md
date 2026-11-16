---
title: "Praticar Brand Identity"
scope: "Verified brand sources, palette aliases, local DM Sans and theme integration"
status: "DONE"
type: "style"
ds-level: "none"
---

# Praticar Brand Identity

## Files

```text
../public/fonts/dm-sans-latin-variable.woff2 (M)
../public/fonts/OFL.txt (M)
app/layout.tsx (M)
design-system/styles/brand-fonts.css (M)
design-system/styles/tokens.css (M)
design-system/styles/toned-components.module.css (M)
../scripts/check-tokens.cjs (M)
../scripts/check-theme.cjs (M)
../docs/brand/praticar-brand-manual.pdf (M)
```

## Dependencies

- [Design tokens](ds/styles/tech-design-tokens.sc.md)
- [Typography](ds/styles/tech-typography.sc.md)
- [Themes](tech-theming.sc.md)

## Contract

```css
.brandText {
  color: var(--color-text-brand);
  font-family: var(--font-family-brand);
}
```

## Styles

```css
@font-face {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 100 1000;
  font-display: swap;
  src: url("/fonts/dm-sans-latin-variable.woff2") format("woff2");
}
```

```css
:root {
  --color-brand-primary: #2d66ee;
  --color-brand-deep: #212d6b;
  --color-brand-night: #161e47;
  --color-brand-gray: #d9d9d9;
  --font-family-brand: "DM Sans", "Segoe UI", Arial, sans-serif;
}
```

```css
:root,
:root[data-theme="light"] {
  --font-family-sans: var(--font-family-brand);
  --font-family-display: var(--font-family-brand);
  --color-action-brand-background: var(--color-brand-primary);
  --color-text-default: var(--color-brand-night);
  --color-text-brand: var(--color-brand-deep);
  --color-focus-ring: var(--color-brand-primary);
}
```

## Tests

- All themes resolve the semantic brand aliases without changing status tones.
- The committed local variable font supplies declared weights and locale characters without runtime third-party font service requests; static local WOFF2 asset requests are permitted.
- Font fallback, forced colors and glass fallback retain the required readable contrast.

## Criteria

- [x] Palette constants follow the hexadecimal values and rendered swatches on manual page 13; the inconsistent primary RGB annotation is not used. DM Sans is distributed locally under the bundled OFL license.
- [x] The manual is available at `docs/brand/praticar-brand-manual.pdf`; pages 13 and 14 define palette and typography.
- [x] All four themes consume verified semantic pairs; existing status tones remain distinct.
- [x] DM Sans renders all three locales, required weights and fallback states using the committed local WOFF2 without runtime third-party/CDN font requests.
- [x] Text, controls and focus satisfy their applicable contrast thresholds, including glass fallback and forced colors.
- [x] Existing consumers inherit the identity without hardcoded palette values or repeated CSS recipes.
- [x] Token checks and static export pass without depending on a feature SC.
- [x] Exclude new themes, API integration, marketing claims, slogan artwork, decorative route graphics and a redesign of every component.
- [x] The Palette constants contract uses Same values in every theme; literals live only in tokens.css.
- [x] The Body / heading font contract uses `--font-family-sans` and `--font-family-display` alias `--font-family-brand`.
- [x] The Font loading contract uses Local WOFF2, `font-display: swap`; no runtime CDN or new library.
- [x] The Regular / medium / semibold / bold contract uses Existing `--font-weight-*` tokens; font files must support their actual weights.
- [x] The Brand action contract uses Existing `--color-action-brand-background` aliases primary; foreground pair must meet AA.
- [x] The Theme adaptation contract uses Semantic aliases change, identity constants remain stable.
- [x] The `--color-action-brand-foreground` contract uses Shared action foreground in light/glass/contrast; light text in dark; Button and solid brand fields use this pair without changing other tones.
- [x] The Status colors contract uses Preserve separate danger/success/warning/info meanings; do not convert every tone to brand blue.
- [x] Existing semantic token → light → dark → contrast → liquid-glass.
- [x] `--color-surface-page` → brand-gray → brand-night → Retain accessible contrast palette → brand-gray.
- [x] `--color-text-default` → brand-night → Existing light foreground → Retain accessible contrast palette → brand-night.
- [x] `--color-text-brand` → brand-deep → Existing light foreground until a verified blue pair is approved → Retain accessible contrast palette → brand-deep.
- [x] `--color-action-brand-background` → brand-primary → brand-primary → Retain accessible contrast action pair → brand-primary.
- [x] `--color-focus-ring` → brand-primary → Existing accessible light ring → Retain system/contrast ring → brand-primary.
- [x] The dark brand action uses `--color-action-brand-foreground: var(--color-text-default)` because the former shared dark foreground would not meet text contrast on blue.
- [x] Validate text at 4.5:1 (3:1 for qualifying large text), control boundaries/focus at 3:1.
- [x] Do not assume a palette color is accessible for every role.
- [x] The bundled `dm-sans-latin-variable.woff2` uses the upstream 100–1000 weight axis.
- [x] `@font-face` weight descriptors are font metadata and cannot use cascading tokens; the numeric range is validated separately by the token checker.
