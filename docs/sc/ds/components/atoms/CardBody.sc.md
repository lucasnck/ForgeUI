---
title: "CardBody"
scope: "Card public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# CardBody

## Files

```text
features/showcase-v2/components/CardBody/usage-code.ts (C)
features/showcase-v2/components/CardBody/definition.ts (C)
features/showcase-v2/components/CardBody/CardBody.example.tsx (C)
features/showcase-v2/components/CardBody/useCardBodyExample.ts (C)
design-system/components/atoms/CardBody/CardBody.module.css (M)
features/showcase/examples/CardBody.example.tsx (M)
features/showcase/examples/CardContentExamples.tsx (C)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/model/showcase-registry.ts (M)
features/showcase/examples/CardExamples.module.css (C)
```

## Dependencies

- [Stack](Stack.sc.md)
- [Text](Text.sc.md)
- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Card.sc.md](../molecules/Card.sc.md)

## Contract

```tsx
import { Card, CardBody } from "@forge-ui/web";

<Card><CardBody><p>Lorem ipsum dolor sit amet.</p></CardBody></Card>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-2);
  min-inline-size: var(--zero);
  padding: var(--space-2);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";

import { useCardContext } from "../../../internal/card/CardContext";
import type { CardBodyProps } from "./CardBody";

export function useCardBody(input: CardBodyProps) {
  const { children, className, ...props } = input;
  const context = useCardContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useCardBody } from "./useCardBody";
import styles from "./CardBody.module.css";

export interface CardBodyProps extends ComponentPropsWithRef<"div"> {}

export function CardBody(props: CardBodyProps) {
  const view = useCardBody(props);
  return (
    <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")} >
      {view.children}
    </div>
  );
}
```

## Tests

- Verify the named V2 CardBody scenario, actual public owner/parts, property documentation and independent reset.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given CardBody, Body is a scoped Card region; render content without owning business state.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body is a scoped Card region; render content without owning business state.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useCardBody is colocated with CardBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] The body owns token-backed internal padding and a vertical content gap; text and media do not touch the Card border.

- [x] The atomic Showcase presents Lorem ipsum alone and an image with Lorem ipsum in Body-only Cards; Header and Footer are absent.

- [x] The example image is a local static asset with intrinsic dimensions and localized alternative text; it remains inside the body at narrow widths.

- [x] Native hidden remains authoritative even though the region composes the shared Stack display recipe.

- [x] The Body content example renders CardBody with Text containing Children inside a real Card, without optional Header/Footer. Controls edit its free-text children and reset restores Children.
- [x] Properties document native div attributes and children; resources identify Body as the required Card region and link to the complete Card aggregator.
- [x] V2 uses real public exports and colocated example view logic; reset restores local controls and feedback, and V1 remains unchanged.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.
