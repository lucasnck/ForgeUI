---
title: "CardHeader"
scope: "Card title region with isolated title, decorative icon and composed divider examples within minimal Card context."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# CardHeader

## Files

```text
features/showcase-v2/components/CardHeader/usage-code.ts (C)
features/showcase-v2/components/CardHeader/definition.ts (C)
features/showcase-v2/components/CardHeader/CardHeader.example.tsx (C)
features/showcase-v2/components/CardHeader/useCardHeaderExample.ts (C)
design-system/components/atoms/CardHeader/CardHeader.module.css (M)
features/showcase/examples/CardHeader.example.tsx (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-static-components.cjs (M)
```

## Dependencies

- [Inline](Inline.sc.md)
- [Stack](Stack.sc.md)

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Card.sc.md](../molecules/Card.sc.md)
- [CardBody](CardBody.sc.md)
- [Heading](Heading.sc.md)
- [Icon](Icon.sc.md)
- [Divider](Divider.sc.md)

## Contract

```tsx
import { Card, CardHeader, CardBody, Divider, Heading, Icon } from "@forge-ui/web";

<Card>
  <CardHeader><Heading level={4}>Record title</Heading></CardHeader>
  <CardBody hidden />
</Card>

<Card>
  <CardHeader>
    <Heading level={4}><Icon name="info" size="inherit" />Record title</Heading>
    <Divider />
  </CardHeader>
  <CardBody hidden />
</Card>
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  padding: var(--space-2);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}
```

## Hooks

```ts
"use client";

import { useCardContext } from "../../../internal/card/CardContext";
import type { CardHeaderProps } from "./CardHeader";

export function useCardHeader(input: CardHeaderProps) {
  const { children, className, ...props } = input;
  const context = useCardContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useCardHeader } from "./useCardHeader";
import styles from "./CardHeader.module.css";

export interface CardHeaderProps extends ComponentPropsWithRef<"header"> {}

export function CardHeader(props: CardHeaderProps) {
  const view = useCardHeader(props);
  return (
    <header
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      id={view.context.titleId}
    >
      {view.children}
    </header>
  );
}
```

## Tests

- Verify the named V2 CardHeader scenario, actual public owner/parts, property documentation and independent reset.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- A Card containing its real CardHeader and hidden CardBody remains valid, preserves the article-to-title ID relationship and renders no visible Body or Footer.
- A decorative Icon has aria-hidden=true and focusable=false; Divider is a composed native separator, not a new Header prop.

## Criteria

- [x] Given CardHeader, Header is a scoped Card region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header is a scoped Card region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useCardHeader is colocated with CardHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] CardHeaderStates owns its examples rather than re-exporting CardStates; the complete Card preview remains in the Card entry.
- [x] Each atomic preview renders one real CardHeader in its public Card owner with a required CardBody hidden; Footer is omitted and no Body content is visible.
- [x] The four documented combinations are title only, icon plus title, title plus Divider, and icon plus title plus Divider; divider absence adds no empty separator wrapper.
- [x] Each title uses an explicit Heading level={4} below the Showcase section and variation headings; long localized titles wrap inside the available width.
- [x] Icons reinforce the visible title and remain decorative through the existing Icon contract without a redundant accessible label or added tab stop.
- [x] Divider is composed inside CardHeader using the existing public Divider; CardHeaderProps and DS rendering APIs remain unchanged.
- [x] Card retains its context-owned title ID and aria-labelledby relationship; no private context imports, wrapper identity tricks or relaxed orphan/required-Body guards are introduced.
- [x] Example headings and captions are available in pt-BR, es and en, and registered variations describe only the visible Header content.
- [x] Visual verification confirms only Header content is visible, divider presence matches the caption and narrow layout has no page-wide horizontal overflow.

- [x] Header owns token-backed internal padding so title, icon and divider do not touch the Card surface border.

- [x] The Header content example uses real Card context with required hidden Body and no Footer. Icon and editable Heading children share Inline gap="2" align="center" wrap=false; Stack gap="2" separates an optional Divider. Icon is initially visible, and removing it leaves no empty leading gap.
- [x] Properties document native header attributes and children; resources describe the required Card owner and context-owned heading ID. Only Header content is visually demonstrated; a link opens the complete Card entry.
- [x] V2 uses real public exports and colocated example view logic; reset restores local controls and feedback, and V1 remains unchanged.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.

- [x] The V2 base preview and minimal usage snippet preserve meaningful spacing, action hierarchy and visible dismissal where applicable; browser validation includes the reported visual states.
