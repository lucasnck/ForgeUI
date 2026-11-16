---
title: "SimpleGrid"
scope: "Responsive equal-track grid with token-backed column counts and gap"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# SimpleGrid

## Files

```text
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/index.ts (M)
design-system/components/atoms/SimpleGrid/SimpleGrid.tsx (M)
design-system/components/atoms/SimpleGrid/SimpleGrid.module.css (M)
design-system/components/atoms/SimpleGrid/index.ts (M)
features/showcase/examples/SimpleGrid.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/SimpleGrid/definition.ts (C)
features/showcase-v2/components/SimpleGrid/SimpleGrid.example.tsx (C)
features/showcase-v2/components/SimpleGrid/useSimpleGridExample.ts (C)
features/showcase-v2/components/SimpleGrid/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Layout contracts](../../styles/tech-layout.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Container](Container.sc.md)
- [Stack](Stack.sc.md)
- [Layout contracts](../../types/tech-layout-contracts.sc.md)

## Contract

```tsx
import { SimpleGrid, Surface } from "@forge-ui/web";
<SimpleGrid columns={{ base: "1", mobile: "2", wide: "4" }} gap="4">
 {metrics.map((metric) => (<Surface key={metric.id} padding="4">
   {metric.value}
  </Surface>))}
</SimpleGrid>;
```

## Styles

```css
.root {
  composes: grid from "../../../styles/layout-components.module.css";
}
```

## Content

```tsx
import { createElement } from "react";
﻿import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentGridColumns,
  ComponentResponsive,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./SimpleGrid.module.css";

export interface SimpleGridProps
  extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement>,
    ComponentSpaceProps {
  as?: LayoutElement;
  columns: ComponentResponsive<ComponentGridColumns>;
}

export function SimpleGrid({
  as = "div",
  columns,
  gap,
  padding,
  className,
  ...props
}: SimpleGridProps) {
  const Element = as;
  return createElement(Element, {
    ...props,
    "className": [styles.root, className].filter(Boolean).join(" "),
    "data-columns": columns.base,
    "data-columns-mobile": columns.mobile,
    "data-columns-wide": columns.wide,
    "data-gap": gap,
    "data-padding": padding,
  });
}
```

## Tests

- V2 Indexed responsive grid: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given `columns={{ base: "1" }}`, only `data-columns="1"` is rendered and the grid resolves the single-track layout token.
- [x] Given a `mobile` or `wide` override, the matching attribute is rendered and the recipe resolves that track list inside the corresponding breakpoint block.
- [x] Given a viewport below the declared breakpoint, the grid keeps the previous arrangement and never renders a fallback count.
- [x] Given columns 1â€“4, each value resolves an existing named track list and no numeric column count appears in CSS.
- [x] Given `as="ul"`, list semantics are preserved and the items remain the direct children.
- [x] Given the recipe, breakpoint blocks are ordered `mobile` then `wide` and the thresholds match canonical breakpoint tokens.
- [x] Given the server and the first client render, the markup is identical because the component measures nothing.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Includes the rendered element choice through a constrained `as` prop.
- [x] Excludes asymmetric layouts and spans (the deferred `Grid` family), auto-fit sizing driven by a minimum column width, virtualisation, and every surface or interaction concern.
- [x] The columns contract uses Required; `base` required; `mobile` and `wide` optional; values `1`â€“`4`.
- [x] The gap contract uses 4; `ComponentSpace`; resolves to the matching `--space-*` token.
- [x] The padding contract uses undefined; `ComponentSpace`; applied to the container.
- [x] The as contract uses div; One of `LayoutElement`; `ul`/`ol` keep list semantics for item grids.
- [x] Native attributes, events and `className` pass through.
- [x] `data-columns` is always rendered; `data-columns-mobile` and `data-columns-wide` are rendered only when declared, so an untouched breakpoint inherits the previous arrangement.
- [x] The recipe maps each attribute to a named track list inside its breakpoint block.
- [x] The component performs no measurement, keeps no state and renders nothing differently on the server, which is what keeps the static export deterministic.
- [x] Component-local CSS: `src/design-system/components/atoms/SimpleGrid/SimpleGrid.module.css`.
- [x] The recipe owns `display: grid`, the gap and the per-breakpoint track lists; every value is a named layout token, and the only literals in the recipe are the `min-width` thresholds, which must equal a canonical breakpoint token value.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Indexed responsive grid**: Compose six Surface/Text cards with stable keys and Children 1..6; supported responsive columns reflow without changing original fixture identity.
- [x] The SimpleGrid V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useSimpleGridExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
