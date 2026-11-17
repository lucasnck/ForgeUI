---
title: "Cross-platform Design Token Generation"
scope: "Canonical, technology-independent token definitions and deterministic CSS/Dart generation without changing approved web appearance"
status: "PENDING"
type: "style"
ds-level: "none"
---

# Cross-platform Design Token Generation

## Files

```text
../../../shared/tokens/schema.json (C)
../../../shared/tokens/web-only.json (C)
../../../shared/tokens/web-template.css (C)
../../../shared/tokens/import-css.mjs (C)
../../../shared/tokens/parity-report.json (C)
../../../shared/tokens/primitives.json (C)
../../../shared/tokens/semantic.json (C)
../../../shared/tokens/themes.json (C)
../../../shared/tokens/generate.mjs (C)
../../../shared/tokens/README.md (M)
design-system/styles/tokens.css (M)
../../../app/library/lib/src/generated/forge_tokens.g.dart (C)
../../../scripts/check-token-parity.mjs (C)
../../../package.json (M)
```

## Dependencies

Generated Dart uses LF line endings; shared token templates preserve their exact source bytes across Git checkouts so deterministic generation does not depend on Windows autocrlf settings.

- [Design tokens and visual foundations](tech-design-tokens.sc.md)
- [Typography contracts](tech-typography.sc.md)
- [Control shape contracts](tech-shape.sc.md)

## Contract

```css
.control {
  background: var(--color-surface-default);
  color: var(--color-text-default);
  border-radius: var(--radius-md);
}
```

```dart
final background = ForgeTokens.light.colorSurfaceDefault;
```

## Content

```json
{
  "color": {
    "brand": {
      "primary": { "$type": "color", "$value": "#2d66ee" },
      "deep": { "$type": "color", "$value": "#212d6b" },
      "night": { "$type": "color", "$value": "#161e47" },
      "gray": { "$type": "color", "$value": "#d9d9d9" }
    }
  }
}
```

```json
{
  "theme": {
    "light": {
      "color.surface.default": { "$type": "color", "$value": "#e7ebf1" }
    },
    "dark": {
      "color.surface.default": { "$type": "color", "$value": "#141d28" }
    }
  }
}
```

```ts
export type ThemeId = "light" | "dark" | "contrast" | "liquid-glass";
export type TokenCategory =
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontWeight"
  | "duration"
  | "cubicBezier"
  | "shadow";

export interface TokenGenerationResult {
  css: string;
  dart: string;
  unresolved: readonly string[];
  platformSpecific: readonly string[];
}
```

## Tests

- Compare generated CSS custom property names and computed approved values against `web/library/src/design-system/styles/tokens.css` in the existing Web themes before adopting generated output.
- Resolve token aliases, reject cycles and missing references, and fail on missing required theme values, duplicate identifiers or unsupported unit conversions.
- Generate CSS and Dart twice from the same source and assert byte-for-byte deterministic output with no uncommitted generated diff.
- Compare semantic color values, radius values, spacing and typography scales across React and Flutter in representative themes and component sizes.
- Verify that CSS-specific expressions, media queries, forced-colors, browser system colors, gradients and backdrop filters are explicitly classified rather than silently mapped to invalid Dart values.
- Ensure reduced-motion and user text scaling follow platform accessibility preferences without changing the canonical token names.

## Criteria

- [ ] Capture the approved Web token names and their actual values as the baseline. Preserve the four existing brand colors and current Web light/dark/contrast/liquid-glass behavior; do not replace approved colors with sample values.
- [ ] Keep one version-controlled, framework-independent source of truth with primitive references and semantic aliases. Existing `tech-design-tokens.sc.md` remains the owning visual contract; update it coherently when generation takes ownership of `tokens.css` emission.
- [ ] Preserve the CSS variable names consumed by the 221 existing Web components. Do not edit generated files manually after switching to generation.
- [ ] Generate a typed Dart token API and a Web CSS output through a reproducible root command. New generated Dart files do not imply Flutter widgets are implemented.
- [ ] Resolve `rem`, `px`, time and opacity with documented logical-pixel and text-scale rules. Conversion dependent on browser root font size must be verified rather than assumed; text scaling remains platform-managed.
- [ ] Model explicit themed semantic values for light, dark, contrast and liquid-glass. Mark browser-only or non-portable tokens for platform-specific recipes with a documented fallback, never a silent approximation.
- [ ] Exclude application identity, locale preference persistence and platform UI behavior from the token package; those remain in their owning layers.
- [ ] Prove visual and accessibility parity with real rendered Web/Flutter samples; prior Web validation alone does not prove Flutter parity.
- [ ] Run formatting/lint checks on modified supported source, type checks and token parity/generation tests, and record actual command output. Retain `PENDING` until every applicable result passes.
