---
title: "ErrorStateBody"
scope: "ErrorState public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ErrorStateBody

## Files

```text
../scripts/check-static-components.cjs (C)
design-system/components/atoms/ErrorStateBody/ErrorStateBody.tsx (C)
design-system/components/atoms/ErrorStateBody/ErrorStateBody.module.css (C)
design-system/components/atoms/ErrorStateBody/index.ts (C)
design-system/internal/errorstate/ErrorStateContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ErrorStateBody.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/ErrorStateBody/useErrorStateBody.ts (C)
features/showcase-v2/components/ErrorStateBody/definition.ts (C)
features/showcase-v2/components/ErrorStateBody/ErrorStateBody.example.tsx (C)
features/showcase-v2/components/ErrorStateBody/useErrorStateBodyExample.ts (C)
features/showcase-v2/components/ErrorStateBody/usage-code.ts (C)
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
import { ErrorState, ErrorStateBody } from "@forge-ui/web";
<ErrorState announcement="off"><ErrorStateBody>Description</ErrorStateBody></ErrorState>;
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
import type { ErrorStateBodyProps } from "./ErrorStateBody";

export function useErrorStateBody(input: ErrorStateBodyProps) {
  const { children, className, ...props } = input;
  const context = useErrorStateContext();
  const role = context.announcement === "assertive" ? "alert" : context.announcement === "polite" ? "status" : undefined;
  return { children, className, props, context, role };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useErrorStateBody } from "./useErrorStateBody";
import styles from "./ErrorStateBody.module.css";

export interface ErrorStateBodyProps extends ComponentPropsWithRef<"div"> {}

export function ErrorStateBody(props: ErrorStateBodyProps) {
  const view = useErrorStateBody(props);
  return (
    <div
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      role={view.role}
      aria-live={view.context.announcement}
      aria-atomic={view.role ? true : undefined}
      aria-labelledby={view.context.titleId}
    >
      {view.children}
    </div>
  );
}
```

## Tests

- V2 ErrorStateBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given ErrorStateBody, Body owns optional safe error announcement without raw server messages or auto-focus.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body owns optional safe error announcement without raw server messages or auto-focus.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useErrorStateBody is colocated with ErrorStateBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **ErrorStateBody contextual region**: Render ErrorStateBody through public ErrorState with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full ErrorState composition.
- [x] The ErrorStateBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useErrorStateBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
