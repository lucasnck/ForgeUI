---
title: "ErrorState"
scope: "Presentation-only ErrorState with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# ErrorState

## Files

```text
../package.json (M)
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/components/molecules/ErrorState/useErrorState.ts (C)
design-system/components/molecules/ErrorState/ErrorState.tsx (C)
design-system/components/molecules/ErrorState/ErrorState.module.css (C)
design-system/components/molecules/ErrorState/index.ts (C)
design-system/internal/errorstate/ErrorStateContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ErrorState.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/ErrorState/definition.ts (C)
features/showcase-v2/components/ErrorState/ErrorState.example.tsx (C)
features/showcase-v2/components/ErrorState/useErrorStateExample.ts (C)
features/showcase-v2/components/ErrorState/usage-code.ts (C)
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
- [tech-notifications.sc.md](../../hooks/tech-notifications.sc.md)

## Contract

```tsx
import { ErrorState, ErrorStateHeader, ErrorStateBody, ErrorStateFooter, Button } from "@forge-ui/web";
<ErrorState announcement="polite"><ErrorStateHeader>Unable to load</ErrorStateHeader><ErrorStateBody>Try again when ready.</ErrorStateBody><ErrorStateFooter><Button onClick={retry}>Retry</Button></ErrorStateFooter></ErrorState>;
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
import type { ErrorStateProps } from "./ErrorState";

export function useErrorState(input: ErrorStateProps) {
  const { children, className, announcement = "polite", ...props } = input;
  const titleId = useId();
  return { children, className, props, titleId, announcement };
}
```

## Content

```ts
"use client";

import { createContext, useContext } from "react";
import type { AnnouncementPoliteness } from "../../types/collection-contracts";

export interface ErrorStateContextValue { titleId?: string; announcement: AnnouncementPoliteness; }
export const ErrorStateContext = createContext<ErrorStateContextValue | null>(null);

export function useErrorStateContext() {
  const context = useContext(ErrorStateContext);
  if (!context) throw new Error("ErrorState parts must be rendered inside ErrorState.");
  return context;
}
```

```tsx
"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { ErrorStateContext } from "../../../internal/errorstate/ErrorStateContext";
import { ErrorStateHeader } from "../../atoms/ErrorStateHeader";
import { ErrorStateBody } from "../../atoms/ErrorStateBody";
import { ErrorStateFooter } from "../../atoms/ErrorStateFooter";
import type { AnnouncementPoliteness } from "../../../types/collection-contracts";
import { useErrorState } from "./useErrorState";
import styles from "./ErrorState.module.css";

export interface ErrorStateProps extends NativeSectionRootProps, ComponentChildrenProps {
  announcement?: AnnouncementPoliteness;
}

export function ErrorState(props: ErrorStateProps) {
  const view = useErrorState(props);
  const parts = collectCompoundParts(view.children, { header: ErrorStateHeader, body: ErrorStateBody, footer: ErrorStateFooter }, ["body"]);
  return (
    <ErrorStateContext value={{ titleId: parts.header ? view.titleId : undefined, announcement: view.announcement }}>
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        role={undefined}
        aria-live={undefined}
        aria-atomic={undefined}
        aria-labelledby={parts.header ? view.titleId : undefined}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </ErrorStateContext>
  );
}
```

## Tests

- V2 Composed feedback: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given Retry, only supplied handler runs once with no implicit loop.
- [x] The announcement contract uses polite; off for static errors, assertive only if explicitly urgent.
- [x] Body owns the chosen status/alert live target; Header/optional Footer remain structural.
- [x] Caller supplies safe localized error message and Retry/Back actions; no raw server details, automatic retry, logging or inferred HTTP/error codes.
- [x] Root does not automatically steal focus.
- [x] Use data-gap="2" on the owned stack.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.

- [x] The complete state has token-backed internal spacing and meaningful title, description and optional actions without mandatory Card borders.

- [x] V2 **Composed feedback**: Compose public Header/Body/Footer with Heading/Text and a meaningful localized Create/Retry/Cancel/Review action as appropriate; a local caller state shows its outcome and the owner retains announcement/loading semantics.
- [x] The ErrorState V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useErrorStateExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
