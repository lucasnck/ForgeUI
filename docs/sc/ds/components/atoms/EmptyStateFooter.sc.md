---
title: "EmptyStateFooter"
scope: "EmptyState public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# EmptyStateFooter

## Files

```text
../scripts/check-static-components.cjs (C)
design-system/components/atoms/EmptyStateFooter/EmptyStateFooter.tsx (C)
design-system/components/atoms/EmptyStateFooter/EmptyStateFooter.module.css (C)
design-system/components/atoms/EmptyStateFooter/index.ts (C)
design-system/internal/emptystate/EmptyStateContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/EmptyStateFooter.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/EmptyStateFooter/useEmptyStateFooter.ts (C)
features/showcase-v2/components/EmptyStateFooter/definition.ts (C)
features/showcase-v2/components/EmptyStateFooter/EmptyStateFooter.example.tsx (C)
features/showcase-v2/components/EmptyStateFooter/useEmptyStateFooterExample.ts (C)
features/showcase-v2/components/EmptyStateFooter/usage-code.ts (C)
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
import { EmptyState, EmptyStateFooter, EmptyStateBody } from "@forge-ui/web";
<EmptyState><EmptyStateBody hidden /><EmptyStateFooter>Actions</EmptyStateFooter></EmptyState>;
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
import type { EmptyStateFooterProps } from "./EmptyStateFooter";

export function useEmptyStateFooter(input: EmptyStateFooterProps) {
  const { children, className, ...props } = input;
  const context = useEmptyStateContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useEmptyStateFooter } from "./useEmptyStateFooter";
import styles from "./EmptyStateFooter.module.css";

export interface EmptyStateFooterProps extends ComponentPropsWithRef<"footer"> {}

export function EmptyStateFooter(props: EmptyStateFooterProps) {
  const view = useEmptyStateFooter(props);
  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")} >
      {view.children}
    </footer>
  );
}
```

## Tests

- V2 EmptyStateFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given EmptyStateFooter, Footer is a scoped EmptyState region; render optional caller actions/messages without adding a live role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Footer is a scoped EmptyState region; render optional caller actions/messages without adding a live role.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useEmptyStateFooter is colocated with EmptyStateFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **EmptyStateFooter contextual region**: Compose EmptyState and required Body with a named Create Button in Footer. The caller adds one neutral local indexed record and shows the accepted outcome, with no backend and no fabricated owner callback. Link to the full owning composition.
- [x] The EmptyStateFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useEmptyStateFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
