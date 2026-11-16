---
title: "EmptyState"
scope: "Presentation-only EmptyState with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# EmptyState

## Files

```text
../package.json (M)
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/components/molecules/EmptyState/useEmptyState.ts (C)
design-system/components/molecules/EmptyState/EmptyState.tsx (C)
design-system/components/molecules/EmptyState/EmptyState.module.css (C)
design-system/components/molecules/EmptyState/index.ts (C)
design-system/internal/emptystate/EmptyStateContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/EmptyState.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/EmptyState/definition.ts (C)
features/showcase-v2/components/EmptyState/EmptyState.example.tsx (C)
features/showcase-v2/components/EmptyState/useEmptyStateExample.ts (C)
features/showcase-v2/components/EmptyState/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Compound part collection](../../helpers/tech-compound-parts.sc.md)
- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Button.sc.md](../atoms/Button.sc.md)

## Contract

```tsx
import { EmptyState, EmptyStateHeader, EmptyStateBody, EmptyStateFooter, Button } from "@forge-ui/web";
<EmptyState><EmptyStateHeader>No records</EmptyStateHeader><EmptyStateBody>Create a record to begin.</EmptyStateBody><EmptyStateFooter><Button onClick={createRecord}>Create</Button></EmptyStateFooter></EmptyState>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  padding: var(--space-3);
  min-inline-size: var(--zero);
  color: var(--color-text-default);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";

import { useId } from "react";
import type { EmptyStateProps } from "./EmptyState";

export function useEmptyState(input: EmptyStateProps) {
  const { children, className, ...props } = input;
  const titleId = useId();
  return { children, className, props, titleId };
}
```

## Content

```ts
"use client";

import { createContext, useContext } from "react";

export interface EmptyStateContextValue { titleId?: string; }
export const EmptyStateContext = createContext<EmptyStateContextValue | null>(null);

export function useEmptyStateContext() {
  const context = useContext(EmptyStateContext);
  if (!context) throw new Error("EmptyState parts must be rendered inside EmptyState.");
  return context;
}
```

```tsx
"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { EmptyStateContext } from "../../../internal/emptystate/EmptyStateContext";
import { EmptyStateHeader } from "../../atoms/EmptyStateHeader";
import { EmptyStateBody } from "../../atoms/EmptyStateBody";
import { EmptyStateFooter } from "../../atoms/EmptyStateFooter";
import { useEmptyState } from "./useEmptyState";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps extends NativeSectionRootProps, ComponentChildrenProps {}

export function EmptyState(props: EmptyStateProps) {
  const view = useEmptyState(props);
  const parts = collectCompoundParts(view.children, { header: EmptyStateHeader, body: EmptyStateBody, footer: EmptyStateFooter }, ["body"]);
  return (
    <EmptyStateContext value={{ titleId: parts.header ? view.titleId : undefined }}>
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        aria-labelledby={parts.header ? view.titleId : undefined}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </EmptyStateContext>
  );
}
```

## Tests

- V2 Composed feedback: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.

## Criteria

- [x] Given empty presentation, no status alert is announced automatically.
- [x] The children contract uses required Body, optional Header/Footer.
- [x] Header/Body explain current state and Footer hosts caller-supplied actions.
- [x] No business permission checks, fetching, placeholder count inference or routing.
- [x] Use data-gap="2" on the owned stack.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.

- [x] The complete state has token-backed internal spacing and meaningful title, description and optional actions without mandatory Card borders.

- [x] V2 **Composed feedback**: Compose public Header/Body/Footer with Heading/Text and a meaningful localized Create/Retry/Cancel/Review action as appropriate; a local caller state shows its outcome and the owner retains announcement/loading semantics.
- [x] The EmptyState V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useEmptyStateExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
