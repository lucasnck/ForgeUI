---
title: "ErrorStateHeader"
scope: "ErrorState public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ErrorStateHeader

## Files

```text
../scripts/check-static-components.cjs (C)
design-system/components/atoms/ErrorStateHeader/ErrorStateHeader.tsx (C)
design-system/components/atoms/ErrorStateHeader/ErrorStateHeader.module.css (C)
design-system/components/atoms/ErrorStateHeader/index.ts (C)
design-system/internal/errorstate/ErrorStateContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ErrorStateHeader.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/ErrorStateHeader/useErrorStateHeader.ts (C)
features/showcase-v2/components/ErrorStateHeader/definition.ts (C)
features/showcase-v2/components/ErrorStateHeader/ErrorStateHeader.example.tsx (C)
features/showcase-v2/components/ErrorStateHeader/useErrorStateHeaderExample.ts (C)
features/showcase-v2/components/ErrorStateHeader/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [ErrorState.sc.md](../molecules/ErrorState.sc.md)

## Contract

```tsx
import { ErrorState, ErrorStateHeader, ErrorStateBody } from "@forge-ui/web";
<ErrorState announcement="off"><ErrorStateHeader>Title</ErrorStateHeader><ErrorStateBody hidden /></ErrorState>;
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

import { useErrorStateContext } from "../../../internal/errorstate/ErrorStateContext";
import type { ErrorStateHeaderProps } from "./ErrorStateHeader";

export function useErrorStateHeader(input: ErrorStateHeaderProps) {
  const { children, className, ...props } = input;
  const context = useErrorStateContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useErrorStateHeader } from "./useErrorStateHeader";
import styles from "./ErrorStateHeader.module.css";

export interface ErrorStateHeaderProps extends ComponentPropsWithRef<"header"> {}

export function ErrorStateHeader(props: ErrorStateHeaderProps) {
  const view = useErrorStateHeader(props);
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

- V2 ErrorStateHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given ErrorStateHeader, Header is a scoped ErrorState region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header is a scoped ErrorState region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useErrorStateHeader is colocated with ErrorStateHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **ErrorStateHeader contextual region**: Render ErrorStateHeader through public ErrorState with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full ErrorState composition.
- [x] The ErrorStateHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useErrorStateHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
