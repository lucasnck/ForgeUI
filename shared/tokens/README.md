# Forge UI shared design tokens

`primitives.json`, `semantic.json` and `themes.json` are the canonical values for the four Web/Flutter themes: `light`, `dark`, `contrast`, `liquid-glass`. They were extracted from the **approved Web CSS**, not redesigned. `web-template.css` preserves CSS selector grammar and names; `web-only.json` lists browser-only declarations, including accessibility media queries. Neither file is a Flutter palette.

Run `npm run tokens:generate` to regenerate `web/library/src/design-system/styles/tokens.css`, the typed Dart API (`app/library/lib/src/generated/forge_tokens.g.dart`) and `parity-report.json`. Run `npm run tokens:check` to verify deterministic generation and the approved CSS SHA-256. The initial conversion preserves the existing CSS **byte for byte**.

The Dart conversion supports resolved `#rgb`/`#rrggbb`, aliases, scalar numbers, `px`, `rem`, `ms`, `s` and `calc(var(--token) * number)`. Values in `web-only.json`, browser system colors, gradients, media rules, shadows and viewport-dependent CSS are **not** silently converted to Dart. Consult `parity-report.json` for unsupported tokens and explicit platform fallback requirements.

**Important:** Web `1rem` to Flutter logical pixels currently uses a nominal 16 CSS-pixel root. `schema.json` records `rootFontSizeVerified: false`. Browser root font-size, device pixel ratio, text scaling, high contrast and liquid-glass backdrop behavior need real Web/Flutter visual acceptance; no equivalence is claimed until measured. Flutter retains platform text scaling through `MediaQuery`; the library does not persist theme preferences.

When intentionally changing the visual baseline, update the owning token SC, regenerate, verify in real browsers, and update `approvedCssSha256` with approved evidence. Do not hand-edit the generated CSS or Dart. The one-time `import-css.mjs` is for importing a new approved baseline only; it requires PostCSS and must not be part of normal builds.
