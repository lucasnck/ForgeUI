---
title: "Layout Contracts"
scope: "Canonical space, alignment, breakpoint and ratio types, shared layout recipes and the mobile-first responsive rule"
status: "DONE"
type: "style"
ds-level: "none"
---

# Layout Contracts



## Files

```text
design-system/styles/layout-components.module.css (M)
features/showcase/components/ShowcaseShared.module.css (M)
features/showcase/components/ShowcasePageContent.module.css (M)
features/showcase/components/ShowcasePreferences.module.css (M)
features/showcase/components/ShowcaseNavigation.module.css (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase-v2/components/StyleResources/LayoutRecipes/definition.ts (C)
features/showcase-v2/components/StyleResources/LayoutRecipes/LayoutRecipes.example.tsx (C)
features/showcase-v2/components/StyleResources/LayoutRecipes/useLayoutRecipesExample.ts (C)
features/showcase-v2/components/StyleResources/LayoutRecipes/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Design tokens](tech-design-tokens.sc.md)
- [Shape contracts](tech-shape.sc.md)
- [Layout contracts](../types/tech-layout-contracts.sc.md)

## Contract

```tsx
import styles from "@forge-ui/web/styles/layout-components.module.css";
<div className={styles.stack}/>;
```

## Styles

```css
:where(.stack) {
  --stack-gap: initial;
  --stack-padding: initial;
  --stack-align: initial;
}

:where(.inline) {
  --inline-gap: initial;
  --inline-wrap: initial;
  --inline-align: initial;
  --inline-justify: initial;
}

:where(.grid) {
  --grid-gap: initial;
  --grid-padding: initial;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack-gap, var(--space-4));
  align-items: var(--stack-align, stretch);
}

.stack[data-gap="0"] {
  --stack-gap: var(--space-0);
}

.stack[data-gap="1"] {
  --stack-gap: var(--space-1);
}

.stack[data-gap="2"] {
  --stack-gap: var(--space-2);
}

.stack[data-gap="3"] {
  --stack-gap: var(--space-3);
}

.stack[data-gap="4"] {
  --stack-gap: var(--space-4);
}

.stack[data-gap="5"] {
  --stack-gap: var(--space-5);
}

.stack[data-gap="6"] {
  --stack-gap: var(--space-6);
}

.stack[data-gap="8"] {
  --stack-gap: var(--space-8);
}

.stack[data-gap="10"] {
  --stack-gap: var(--space-10);
}

.stack[data-gap="12"] {
  --stack-gap: var(--space-12);
}

.stack[data-gap="16"] {
  --stack-gap: var(--space-16);
}

.stack[data-gap="20"] {
  --stack-gap: var(--space-20);
}

.stack[data-padding] {
  padding: var(--stack-padding);
}

.stack[data-padding="0"] {
  --stack-padding: var(--space-0);
}

.stack[data-padding="1"] {
  --stack-padding: var(--space-1);
}

.stack[data-padding="2"] {
  --stack-padding: var(--space-2);
}

.stack[data-padding="3"] {
  --stack-padding: var(--space-3);
}

.stack[data-padding="4"] {
  --stack-padding: var(--space-4);
}

.stack[data-padding="5"] {
  --stack-padding: var(--space-5);
}

.stack[data-padding="6"] {
  --stack-padding: var(--space-6);
}

.stack[data-padding="8"] {
  --stack-padding: var(--space-8);
}

.stack[data-padding="10"] {
  --stack-padding: var(--space-10);
}

.stack[data-padding="12"] {
  --stack-padding: var(--space-12);
}

.stack[data-padding="16"] {
  --stack-padding: var(--space-16);
}

.stack[data-padding="20"] {
  --stack-padding: var(--space-20);
}

.stack[data-align="start"] {
  --stack-align: start;
}

.stack[data-align="center"] {
  --stack-align: center;
}

.stack[data-align="end"] {
  --stack-align: end;
}

.stack[data-align="stretch"] {
  --stack-align: stretch;
}

.stack[data-align="baseline"] {
  --stack-align: baseline;
}

.inline {
  display: flex;
  flex-wrap: var(--inline-wrap, wrap);
  align-items: var(--inline-align, center);
  justify-content: var(--inline-justify, start);
  gap: var(--inline-gap, var(--space-2));
}

.inline[data-wrap="false"] {
  --inline-wrap: nowrap;
}

.inline[data-gap="0"] {
  --inline-gap: var(--space-0);
}

.inline[data-gap="1"] {
  --inline-gap: var(--space-1);
}

.inline[data-gap="2"] {
  --inline-gap: var(--space-2);
}

.inline[data-gap="3"] {
  --inline-gap: var(--space-3);
}

.inline[data-gap="4"] {
  --inline-gap: var(--space-4);
}

.inline[data-gap="5"] {
  --inline-gap: var(--space-5);
}

.inline[data-gap="6"] {
  --inline-gap: var(--space-6);
}

.inline[data-gap="8"] {
  --inline-gap: var(--space-8);
}

.inline[data-gap="10"] {
  --inline-gap: var(--space-10);
}

.inline[data-gap="12"] {
  --inline-gap: var(--space-12);
}

.inline[data-gap="16"] {
  --inline-gap: var(--space-16);
}

.inline[data-gap="20"] {
  --inline-gap: var(--space-20);
}

.inline[data-padding] {
  padding: var(--inline-padding);
}

.inline[data-padding="0"] {
  --inline-padding: var(--space-0);
}

.inline[data-padding="1"] {
  --inline-padding: var(--space-1);
}

.inline[data-padding="2"] {
  --inline-padding: var(--space-2);
}

.inline[data-padding="3"] {
  --inline-padding: var(--space-3);
}

.inline[data-padding="4"] {
  --inline-padding: var(--space-4);
}

.inline[data-padding="5"] {
  --inline-padding: var(--space-5);
}

.inline[data-padding="6"] {
  --inline-padding: var(--space-6);
}

.inline[data-padding="8"] {
  --inline-padding: var(--space-8);
}

.inline[data-padding="10"] {
  --inline-padding: var(--space-10);
}

.inline[data-padding="12"] {
  --inline-padding: var(--space-12);
}

.inline[data-padding="16"] {
  --inline-padding: var(--space-16);
}

.inline[data-padding="20"] {
  --inline-padding: var(--space-20);
}

.inline[data-align="start"] {
  --inline-align: start;
}

.inline[data-align="center"] {
  --inline-align: center;
}

.inline[data-align="end"] {
  --inline-align: end;
}

.inline[data-align="stretch"] {
  --inline-align: stretch;
}

.inline[data-align="baseline"] {
  --inline-align: baseline;
}

.inline[data-justify="start"] {
  --inline-justify: start;
}

.inline[data-justify="center"] {
  --inline-justify: center;
}

.inline[data-justify="end"] {
  --inline-justify: end;
}

.inline[data-justify="between"] {
  --inline-justify: space-between;
}

.grid {
  display: grid;
  gap: var(--grid-gap, var(--space-4));
  grid-template-columns: var(--layout-column);
}

.grid[data-gap="0"] {
  --grid-gap: var(--space-0);
}

.grid[data-gap="1"] {
  --grid-gap: var(--space-1);
}

.grid[data-gap="2"] {
  --grid-gap: var(--space-2);
}

.grid[data-gap="3"] {
  --grid-gap: var(--space-3);
}

.grid[data-gap="4"] {
  --grid-gap: var(--space-4);
}

.grid[data-gap="5"] {
  --grid-gap: var(--space-5);
}

.grid[data-gap="6"] {
  --grid-gap: var(--space-6);
}

.grid[data-gap="8"] {
  --grid-gap: var(--space-8);
}

.grid[data-gap="10"] {
  --grid-gap: var(--space-10);
}

.grid[data-gap="12"] {
  --grid-gap: var(--space-12);
}

.grid[data-gap="16"] {
  --grid-gap: var(--space-16);
}

.grid[data-gap="20"] {
  --grid-gap: var(--space-20);
}

.grid[data-padding] {
  padding: var(--grid-padding);
}

.grid[data-padding="0"] {
  --grid-padding: var(--space-0);
}

.grid[data-padding="1"] {
  --grid-padding: var(--space-1);
}

.grid[data-padding="2"] {
  --grid-padding: var(--space-2);
}

.grid[data-padding="3"] {
  --grid-padding: var(--space-3);
}

.grid[data-padding="4"] {
  --grid-padding: var(--space-4);
}

.grid[data-padding="5"] {
  --grid-padding: var(--space-5);
}

.grid[data-padding="6"] {
  --grid-padding: var(--space-6);
}

.grid[data-padding="8"] {
  --grid-padding: var(--space-8);
}

.grid[data-padding="10"] {
  --grid-padding: var(--space-10);
}

.grid[data-padding="12"] {
  --grid-padding: var(--space-12);
}

.grid[data-padding="16"] {
  --grid-padding: var(--space-16);
}

.grid[data-padding="20"] {
  --grid-padding: var(--space-20);
}

.grid[data-columns="2"] {
  grid-template-columns: var(--layout-two-columns);
}

.grid[data-columns="3"] {
  grid-template-columns: var(--layout-three-columns);
}

.grid[data-columns="4"] {
  grid-template-columns: var(--layout-four-columns);
}

@media (min-width: 768px) {
  .grid[data-columns-mobile="1"] {
    grid-template-columns: var(--layout-column);
  }

  .grid[data-columns-mobile="2"] {
    grid-template-columns: var(--layout-two-columns);
  }

  .grid[data-columns-mobile="3"] {
    grid-template-columns: var(--layout-three-columns);
  }

  .grid[data-columns-mobile="4"] {
    grid-template-columns: var(--layout-four-columns);
  }
}

@media (min-width: 1104px) {
  .grid[data-columns-wide="1"] {
    grid-template-columns: var(--layout-column);
  }

  .grid[data-columns-wide="2"] {
    grid-template-columns: var(--layout-two-columns);
  }

  .grid[data-columns-wide="3"] {
    grid-template-columns: var(--layout-three-columns);
  }

  .grid[data-columns-wide="4"] {
    grid-template-columns: var(--layout-four-columns);
  }
}

.surface {
  background: var(--color-surface-raised);
  color: var(--color-text-default);
  border: var(--border-width-thin) var(--border-style-default)
    var(--color-border-subtle);
}

.surface[data-elevation="raised"] {
  box-shadow: var(--shadow-raised);
}

.surface[data-elevation="floating"] {
  box-shadow: var(--shadow-floating);
}

.container {
  inline-size: var(--size-full);
  max-inline-size: var(--layout-container-wide);
  margin-inline: auto;
  padding-inline: var(--layout-container-padding);
}

.container[data-size="narrow"] {
  max-inline-size: var(--layout-container-narrow);
}

.container[data-padding="0"] {
  padding-inline: var(--space-0);
}

.container[data-padding="1"] {
  padding-inline: var(--space-1);
}

.container[data-padding="2"] {
  padding-inline: var(--space-2);
}

.container[data-padding="3"] {
  padding-inline: var(--space-3);
}

.container[data-padding="4"] {
  padding-inline: var(--space-4);
}

.container[data-padding="5"] {
  padding-inline: var(--space-5);
}

.container[data-padding="6"] {
  padding-inline: var(--space-6);
}

.container[data-padding="8"] {
  padding-inline: var(--space-8);
}

.container[data-padding="10"] {
  padding-inline: var(--space-10);
}

.container[data-padding="12"] {
  padding-inline: var(--space-12);
}

.container[data-padding="16"] {
  padding-inline: var(--space-16);
}

.container[data-padding="20"] {
  padding-inline: var(--space-20);
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--layout-container-padding-wide);
  }

  .container[data-padding="0"] {
    padding-inline: var(--space-0);
  }

  .container[data-padding="1"] {
    padding-inline: var(--space-1);
  }

  .container[data-padding="2"] {
    padding-inline: var(--space-2);
  }

  .container[data-padding="3"] {
    padding-inline: var(--space-3);
  }

  .container[data-padding="4"] {
    padding-inline: var(--space-4);
  }

  .container[data-padding="5"] {
    padding-inline: var(--space-5);
  }

  .container[data-padding="6"] {
    padding-inline: var(--space-6);
  }

  .container[data-padding="8"] {
    padding-inline: var(--space-8);
  }

  .container[data-padding="10"] {
    padding-inline: var(--space-10);
  }

  .container[data-padding="12"] {
    padding-inline: var(--space-12);
  }

  .container[data-padding="16"] {
    padding-inline: var(--space-16);
  }

  .container[data-padding="20"] {
    padding-inline: var(--space-20);
  }
}

.aspect {
  inline-size: var(--size-full);
}

.aspect[data-ratio="square"] {
  aspect-ratio: var(--aspect-square);
}

.aspect[data-ratio="video"] {
  aspect-ratio: var(--aspect-video);
}

.aspect[data-ratio="photo"] {
  aspect-ratio: var(--aspect-photo);
}

.aspect[data-ratio="portrait"] {
  aspect-ratio: var(--aspect-portrait);
}
```

## Tests

- V2 Layout composition: verify its observable state, actual public contract, reset and complete copied code.

- Responsive gap, alignment and column selectors resolve their declared tokens at each canonical breakpoint.
- Nested surface elevation and full-width composition preserve semantic markup and caller classes.

## Criteria

- [x] Given `ComponentSpace`, every value maps to an existing `--space-*` token and no other step is accepted.
- [x] Given `ComponentGridColumns`, each value renders the matching named track list and no numeric column count is declared in CSS.
- [x] Given a `ComponentResponsive` value, `base` always renders, and optional breakpoints render only when declared.
- [x] Given the recipe, breakpoint blocks are ordered `mobile` then `wide` and override without `!important`.
- [x] Given any `min-width` or `max-width` literal in active CSS, it equals a canonical breakpoint token value and `npm run test:tokens` passes.
- [x] Given the migrated `ShowcasePageTemplate`, no `max-width` media query remains in active CSS.
- [x] Given the primitives, generic stack, inline and single-column grid declarations in Showcase modules and `FormField` compose the shared recipes; page-specific responsive arrangement remains with its consumer.
- [x] Given the recipe, every declaration is a token reference or a structural keyword.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Excludes `Box` and `Spacer` (rejected: an escape hatch with arbitrary props defeats the token scale, and an empty spacer element is unnecessary where `gap` exists), the 12-column span engine (`Grid`, `GridRow`, `GridColumn`, deferred until a page needs spans that the named layout tokens cannot express), page templates, and every business or data concern.
- [x] The `ComponentSpace` contract uses `0`, `1`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`; each maps to the existing `--space-*` token.
- [x] The `ComponentGridColumns` contract uses `1` / `2` / `3` / `4`; `--layout-column` / `--layout-two-columns` / `--layout-three-columns` / `--layout-four-columns`.
- [x] The `ComponentBreakpoint` contract uses `base` (always) / `mobile` (min-width 768) / `wide` (min-width 1104); `--breakpoint-mobile`, `--breakpoint-wide`.
- [x] The `ComponentContainerSize` contract uses `narrow` / `wide`; `--layout-container-narrow`, `--layout-container-wide`.
- [x] The `ComponentElevation` contract uses `flat` / `raised` / `floating`; `--shadow-raised`, `--shadow-floating`, none for `flat`.
- [x] The `ComponentAspectRatio` contract uses `square` / `video` / `photo` / `portrait`; `--aspect-square`, `--aspect-video`, `--aspect-photo`, `--aspect-portrait`.
- [x] The `ComponentAlign` / `ComponentJustify` contract uses see the type; structural keywords only, no token needed.
- [x] The new tokens reuse existing lengths, so no new dimension is introduced; the ratio tokens exist because a ratio literal is a numeric value and therefore belongs in `tokens.css`.
- [x] The excerpt shows one value per family; the delivered recipe declares every value from the table, in ascending breakpoint order, and local low-specificity resets prevent nested consumers from inheriting another container’s gap or alignment.
- [x] The `data-*` value classes are declared after the base classes inside each breakpoint block so that a larger breakpoint wins by source order, exactly like the platform's own utility systems.
- [x] Responsive rule, binding for every consumer of this capability:
- [x] `base` is the mobile arrangement and is the only value that renders an attribute in every case.
- [x] A breakpoint attribute is rendered only when the caller declares that breakpoint, so untouched breakpoints fall back to the previous one.
- [x] Every `min-width` and `max-width` literal must equal a canonical breakpoint token value; `check-tokens.cjs` fails otherwise.
- [x] A component that can adapt intrinsically must not add a breakpoint axis.
- [x] Consumers compose their classes and declare no layout primitive of their own:
- [x] Every declaration is a token reference or a structural keyword, so `npm run test:tokens` covers the whole family.
- [x] The capability introduces no motion; a consumer that animates a layout change must specify its own reduced-motion alternative.

- [x] V2 **Layout composition**: Compare real stack/inline/grid/container recipes using Heading/Text and an indexed Surface collection. Demonstrate token gap/padding/responsive columns, wrapping and end-aligned actions; document actual attributes/classes without duplicating layout CSS.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
