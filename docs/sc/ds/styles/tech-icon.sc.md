---
title: "Icon Capability"
scope: "Canonical icon size type, icon tokens, shared recipe and accessibility policy for icon consumers"
status: "DONE"
type: "style"
ds-level: "none"
---

# Icon Capability



## Files

```text
design-system/styles/icon-components.module.css (M)
features/showcase-v2/components/StyleResources/IconRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/IconRecipes/IconRecipes.example.tsx (C)
features/showcase-v2/components/StyleResources/IconRecipes/useIconRecipesExample.ts (C)
features/showcase-v2/components/StyleResources/IconRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Design tokens](tech-design-tokens.sc.md)
- [Icon sources](../helpers/tech-icon-sources.sc.md)
- [Icon contracts](../types/tech-icon-contracts.sc.md)

## Contract

```tsx
import styles from "@forge-ui/web/styles/icon-components.module.css";
<div className={styles.icon}/>;
```

## Styles

```css
.icon {
  --icon-size: var(--length-6);
  inline-size: var(--icon-size);
  block-size: var(--icon-size);
  flex-shrink: var(--zero);
  vertical-align: var(--icon-align-offset);
  color: inherit;
  stroke-width: var(--icon-stroke-width);
}
.size[data-icon-size="xs"] {
  --icon-size: var(--length-4);
}
.size[data-icon-size="sm"] {
  --icon-size: var(--length-5);
}
.size[data-icon-size="lg"] {
  --icon-size: var(--length-7);
}
.size[data-icon-size="xl"] {
  --icon-size: var(--length-8);
}
.size[data-icon-size="inherit"] {
  --icon-size: var(--icon-size-inherit);
}
```

## Tests

- V2 Icon sizing and alignment: verify its observable state, actual public contract, reset and complete copied code.

- Each semantic icon size resolves to its declared token; inherit follows the surrounding font size.
- Stroke/filled paths retain currentColor and do not receive conflicting geometry presentation attributes.

## Criteria

- [x] Given no size, an icon renders at `--length-6`; each other step renders its length token and `inherit` renders `1em`.
- [x] Given the recipe, no numeric, color or vendor-specific declaration appears, and `npm run test:tokens` passes.
- [x] Given `--icon-stroke-width` overridden by a consumer or by a theme block, the rendered stroke follows it without a new asset.
- [x] Given an icon inside a flex row, the icon keeps its square aspect and does not shrink.
- [x] Given an inline icon next to text, the icon aligns optically on the baseline without a per-usage margin.
- [x] Given any of the four themes and forced colors, the icon inherits the surrounding text color and remains perceivable.
- [x] Given `ComponentIconSize`, every value maps to an existing token or to `1em`, and no component inlines an icon size union.
- [x] Given the recipe and the value type, no vendor, package or upstream icon name appears.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Excludes geometry, naming, provenance and vendor handling ([Icon sources](../helpers/tech-icon-sources.sc.md)), the rendered atom ([Icon](../components/atoms/Icon.sc.md)), icon-only controls and their labelling ([IconButton](../components/molecules/IconButton.sc.md)), and every decorative illustration.
- [x] The `ComponentIconSize` `xs` contract uses `--length-4` (32); Inline with small text and inside `xs`/`sm` controls.
- [x] The `ComponentIconSize` `sm` contract uses `--length-5` (40); Buttons and fields.
- [x] The `ComponentIconSize` `md` (default) contract uses `--length-6` (48); Display size is independent of the SVG viewBox.
- [x] The `ComponentIconSize` `lg` contract uses `--length-7` (56); Emphasis, section headers.
- [x] The `ComponentIconSize` `xl` contract uses `--length-8` (64); Empty states and feature marks.
- [x] The `ComponentIconSize` `inherit` contract uses `1em`; Tracks the surrounding font size.
- [x] The `--icon-stroke-width` contract uses `2`; Applied by the recipe; overridable per consumer or per theme in `tokens.css`.
- [x] The `--icon-stroke-width-thin` contract uses `1.5`; Sanctioned thinner weight, so a consumer never writes a numeric literal.
- [x] The `--icon-align-offset` contract uses `-0.125em`; Optical baseline alignment for inline icons.
- [x] The `--icon-size-inherit` contract uses `1em`; Backs the `inherit` size, because a literal is forbidden outside `tokens.css`.
- [x] The Color contract uses `currentColor`; Never declared by the capability.
- [x] The four tokens are registered in [Design tokens](tech-design-tokens.sc.md) with the `icon-components.module.css` recipe row, following the Shared Capability Contract.
- [x] Every declaration is a token reference or a structural keyword, `1em` is expressed through the size value rather than a length literal, and no vendor-specific attribute or selector appears.
- [x] `flex-shrink` prevents the classic squashed icon inside a flex row, and the size classes are keyed by `data-icon-size` so they cannot collide with the control `data-size` selectors.
- [x] A decorative icon is hidden from assistive technology (`aria-hidden`, `focusable="false"`) and its meaning comes from adjacent text.
- [x] A meaningful icon-only control labels the **control**, not the SVG; the icon stays `aria-hidden`.
- [x] A label on the SVG next to a labelled control duplicates the announcement.
- [x] An icon that carries meaning on its own and is not inside a labelled control exposes its own accessible name.
- [x] An icon is never the only indicator of an error, a required field or a selected state.
- [x] Consumers compose it and declare no icon-specific size, alignment or color rule:

- [x] V2 **Icon sizing and alignment**: Apply the real icon recipe to a valid SVG/Icon with a supported name, size and inherited inline scale. Compare a standalone sample with an aligned text/icon row; document decorative/named semantics and geometry tokens.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
