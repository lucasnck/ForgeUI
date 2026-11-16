---
title: "EmptyStateHeader"
scope: "EmptyState public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# EmptyStateHeader

## Files

```text
../scripts/check-static-components.cjs (C)
design-system/components/atoms/EmptyStateHeader/EmptyStateHeader.tsx (C)
design-system/components/atoms/EmptyStateHeader/EmptyStateHeader.module.css (C)
design-system/components/atoms/EmptyStateHeader/index.ts (C)
design-system/internal/emptystate/EmptyStateContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/EmptyStateHeader.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/EmptyStateHeader/useEmptyStateHeader.ts (C)
features/showcase-v2/components/EmptyStateHeader/definition.ts (C)
features/showcase-v2/components/EmptyStateHeader/EmptyStateHeader.example.tsx (C)
features/showcase-v2/components/EmptyStateHeader/useEmptyStateHeaderExample.ts (C)
features/showcase-v2/components/EmptyStateHeader/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [EmptyState.sc.md](../molecules/EmptyState.sc.md)

## Contract

```tsx
import { EmptyState, EmptyStateHeader, EmptyStateBody } from "@forge-ui/web";
<EmptyState><EmptyStateHeader>Title</EmptyStateHeader><EmptyStateBody hidden /></EmptyState>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-2);
  min-inline-size: var(--zero);
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

import { useEmptyStateContext } from "../../../internal/emptystate/EmptyStateContext";
import type { EmptyStateHeaderProps } from "./EmptyStateHeader";

export function useEmptyStateHeader(input: EmptyStateHeaderProps) {
  const { children, className, ...props } = input;
  const context = useEmptyStateContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useEmptyStateHeader } from "./useEmptyStateHeader";
import styles from "./EmptyStateHeader.module.css";

export interface EmptyStateHeaderProps extends ComponentPropsWithRef<"header"> {}

export function EmptyStateHeader(props: EmptyStateHeaderProps) {
  const view = useEmptyStateHeader(props);
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

- V2 EmptyStateHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given EmptyStateHeader, Header is a scoped EmptyState region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header is a scoped EmptyState region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useEmptyStateHeader is colocated with EmptyStateHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **EmptyStateHeader contextual region**: Render EmptyStateHeader through public EmptyState with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full EmptyState composition.
- [x] The EmptyStateHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useEmptyStateHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
