---
title: "Container"
scope: "Centred content column with token-backed maximum width and mobile-first page padding"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Container

## Files

```text
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/index.ts (M)
design-system/components/atoms/Container/Container.tsx (M)
design-system/components/atoms/Container/Container.module.css (M)
design-system/components/atoms/Container/index.ts (M)
features/showcase/examples/Container.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/Container/definition.ts (C)
features/showcase-v2/components/Container/Container.example.tsx (C)
features/showcase-v2/components/Container/useContainerExample.ts (C)
features/showcase-v2/components/Container/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Layout contracts](../../styles/tech-layout.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Layout contracts](../../types/tech-layout-contracts.sc.md)

## Contract

```tsx
import { Container, Stack } from "@forge-ui/web";
<Container size="narrow">
 <Stack gap="6">{content}</Stack>
</Container>;
```

## Styles

```css
.root {
  composes: container from "../../../styles/layout-components.module.css";
}
```

## Content

```tsx
import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentContainerSize,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./Container.module.css";

export interface ContainerProps
  extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement>,
    ComponentSpaceProps {
  as?: LayoutElement;
  size?: ComponentContainerSize;
}

export function Container({
  as = "div",
  size,
  gap,
  padding,
  className,
  ...props
}: ContainerProps) {
  const Element = as;
  return createElement(Element, {
    ...props,
    "className": [styles.root, className].filter(Boolean).join(" "),
    "data-size": size,
    "data-gap": gap,
    "data-padding": padding,
  });
}
```

## Tests

- V2 Composed content layout: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given no props, the element is `div` with no `data-*` attribute and the recipe resolves the wide maximum, centring and the base padding.
- [x] Given `size="narrow"`, the maximum inline size resolves the narrow token.
- [x] Given the mobile breakpoint reached, the inline padding resolves the wide padding token without changing the maximum width.
- [x] Given `padding`, the attribute is rendered and the same value applies at every breakpoint.
- [x] Given a viewport wider than the maximum, the content stays centred and no horizontal scrollbar appears.
- [x] Given `as="section"`, the element keeps section semantics and the atom adds no role of its own.
- [x] Given the recipe, the only literal is the `min-width` threshold and it equals a canonical breakpoint token value.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Includes the rendered element choice through a constrained `as` prop.
- [x] Excludes arrangement of the content itself ([Stack](Stack.sc.md), [Inline](Inline.sc.md), [SimpleGrid](SimpleGrid.sc.md)), the page shell and its regions ([ShowcasePageTemplate](../templates/ShowcasePageTemplate.sc.md), a future application shell), and every surface concern ([Surface](Surface.sc.md)).
- [x] The padding contract uses Inherited from the recipe; `ComponentSpace`; overriding one value replaces both breakpoint steps.
- [x] The inherited gap contract uses undefined; it is forwarded as data-gap for compatibility and does not arrange Container children.
- [x] The as contract uses div; One of `LayoutElement`; the atom never supplies a landmark role.
- [x] Native attributes, events and `className` pass through.
- [x] `data-size` and `data-padding` are rendered only when the caller passes them, so the recipe defaults apply otherwise.
- [x] The component declares no width, padding or breakpoint value; passing `padding` replaces the recipe's padding at every breakpoint, which is why the table documents it as a single override rather than a responsive value.
- [x] Component-local CSS: `src/design-system/components/atoms/Container/Container.module.css`.
- [x] The recipe owns the width cap, centring, padding and the single mobile-first query; the only literal is the `min-width` threshold, which must equal a canonical breakpoint token value.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Composed content layout**: Compose Heading, Text and an Inline action row; controls change only supported gap/padding/size/elevation settings for this component, preserving readable gutters and hierarchy.
- [x] The Container V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useContainerExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
