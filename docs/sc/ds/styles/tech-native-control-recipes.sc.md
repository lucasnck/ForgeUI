---
title: "Native control recipes"
scope: "Full-width and checkable control geometry"
status: "DONE"
type: "style"
ds-level: "none"
---

# Native control recipes



## Files

```text
design-system/styles/full-width-components.module.css (M)
design-system/styles/checkable-components.module.css (M)
design-system/styles/tokens.css (M)
../scripts/check-theme.cjs (M)
features/showcase-v2/components/StyleResources/NativeControlRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/NativeControlRecipes/NativeControlRecipes.example.tsx (C)
features/showcase-v2/components/StyleResources/NativeControlRecipes/useNativeControlRecipesExample.ts (C)
features/showcase-v2/components/StyleResources/NativeControlRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Native Control Contracts and Checkable Styles](../types/tech-native-control-contracts.sc.md)
- [Design Tokens and Visual Foundations](tech-design-tokens.sc.md)

## Contract

```tsx
import styles from "@forge-ui/web/styles/checkable-components.module.css";
<input type="checkbox" className={styles.checkable} data-size="md" data-tone="brand"/>;
```

## Styles

```css
.fullWidth[data-full-width] {
  inline-size: var(--size-full);
}
```

```css
.checkable {
  --checkable-target: var(--component-height-md);
  --checkable-indicator: var(--length-3);
  --checkable-accent: var(--color-checkable-brand-background);
  min-block-size: var(--checkable-target);
  min-inline-size: var(--checkable-target);
  inline-size: fit-content;
  max-inline-size: var(--size-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.checkable[data-size="xs"] {
  --checkable-target: var(--component-height-xs);
}
.checkable[data-size="sm"] {
  --checkable-target: var(--component-height-sm);
}
.checkable[data-size="lg"] {
  --checkable-target: var(--component-height-lg);
  --checkable-indicator: var(--length-4);
}
.checkable[data-size="xl"] {
  --checkable-target: var(--component-height-xl);
  --checkable-indicator: var(--length-5);
}
.checkable[data-tone="neutral"] {
  --checkable-accent: var(--color-action-neutral-background);
}
.checkable[data-tone="success"] {
  --checkable-accent: var(--color-action-success-background);
}
.checkable[data-tone="warning"] {
  --checkable-accent: var(--color-action-warning-background);
}
.checkable[data-tone="danger"] {
  --checkable-accent: var(--color-action-danger-background);
}
.checkable[data-tone="info"] {
  --checkable-accent: var(--color-action-info-background);
}
.checkable[data-tone="inverse"] {
  --checkable-accent: var(--color-text-inverse);
}
.indicator {
  composes: shaped from "./shaped-components.module.css";
  inline-size: var(--checkable-indicator);
  block-size: var(--checkable-indicator);
  border: var(--border-width-thin) var(--border-style-default)
    var(--color-border-default);
  background: var(--color-surface-default);
  accent-color: var(--checkable-accent);
  appearance: none;
}
@media (forced-colors: active) {
  .indicator {
    appearance: auto;
  }
}
```

## Tests

- V2 Native control surfaces: verify its observable state, actual public contract, reset and complete copied code.

- Five native-control sizes and seven tones resolve the shared tokens.
- Invalid, disabled and full-width states preserve the native control and do not duplicate the shape recipe.
- Forced colors restores platform checkable indication.

## Criteria

- [x] Interfaces and recipes below are present in active source and verified by targeted type, markup and browser checks.
- [x] Preserve Input/Select's existing full-width default. Checkbox uses a sized wrapper and a native checkbox indicator; fullWidth expands the wrapper, never the checkmark. Shared geometry and native behavior are verified by the consumer and recipe checks below.
- [x] Full-width attribute — data-full-width on the layout root; false omits it
- [x] Input/Select fullWidth — true preserves current layout; false uses intrinsic width
- [x] Checkbox size / tone / shape / fullWidth — md / brand / inherited shape / false
- [x] Checkbox box radius — Shared shape recipe: square --zero, rounded --radius-md, pill --radius-full
- [x] Checkbox indicator xs/sm/md/lg/xl — --length-3/3/3/4/5; the box is the native input, painted by the recipe
- [x] Checkbox box chrome — --color-surface-default fill with the default border; checked fills --checkable-accent with no drawn glyph
- [x] Checkbox tone — neutral/brand/success/warning/danger/info/inverse, mapped to --checkable-accent
- [x] Loading and variant are action-specific capabilities; they are not required for checkbox or field controls. Checkbox exposes size/tone/shape/fullWidth; appearance is not supported, because a checkable box has no fill/border appearance axis beyond the tone fill.
- [x] Styles belong to full-width-components.module.css (fullWidth) and checkable-components.module.css (checkable, indicator). Map neutral/success/warning/danger/info to corresponding --color-action-<tone>-background tokens and inverse to --color-text-inverse. Brand uses --color-checkable-brand-background, which aliases the action token except in dark, where a token-owned sRGB mix of 92% brand-primary and 8% text-default meets the 3:1 control contrast threshold. Do not add a second palette or per-component size/tone selectors. The indicator composes the shared shape recipe ([Shape contracts](tech-shape.sc.md)) and owns the box border, surface fill and `appearance: none`; forced colors restores the platform indicator. The consumer's `:checked` fill stays in the component module. Checkbox root wrapper must not hide or replace native input semantics; use a label wrapper so its full target activates the input. Preserve focus styling in forced colors.
- [x] Input/Select compose fullWidth through field-control.module.css and use fit-content plus the shared maximum width for intrinsic layout, including grid parents. Button reuses fullWidth instead of its local data-full-width rule. Set data-full-width on each owning layout root; no duplicated shared selector.
- [x] Input/Select preserve full-width layout by default and support explicit fullWidth=false.
- [x] Checkbox supports all declared sizes and tones, md default, token-backed dimensions and a full-width wrapper without a stretched indicator.
- [x] Shared selectors are not duplicated in component CSS; token/contract/type checks and static export pass before delivery.

- [x] V2 **Native control surfaces**: Apply field/checkable recipes to real Input/Select/Textarea/Checkbox/Radio consumers and connected labels. Compare native focus/disabled/invalid/checked states, sizing and fullWidth; show real class dependencies and preserve native behavior.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
