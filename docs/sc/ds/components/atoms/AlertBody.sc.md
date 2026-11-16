---
title: "AlertBody"
scope: "Alert public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# AlertBody

## Files

```text
design-system/components/atoms/AlertBody/AlertBody.module.css (M)
features/showcase/examples/AlertBody.example.tsx (M)
features/showcase/examples/useAlertExample.ts (C)
features/showcase-v2/components/AlertBody/definition.ts (C)
features/showcase-v2/components/AlertBody/AlertBody.example.tsx (C)
features/showcase-v2/components/AlertBody/useAlertBodyExample.ts (C)
features/showcase-v2/components/AlertBody/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Alert.sc.md](../molecules/Alert.sc.md)

## Contract

```tsx
import { Alert, AlertBody, Text } from "@forge-ui/web";
<Alert announcement="off"><AlertBody><Text as="p">Changes saved.</Text></AlertBody></Alert>;
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

import { useAlertContext } from "../../../internal/alert/AlertContext";
import type { AlertBodyProps } from "./AlertBody";

export function useAlertBody(input: AlertBodyProps) {
  const { children, className, ...props } = input;
  const context = useAlertContext();
  const role = context.announcement === "assertive" ? "alert" : context.announcement === "polite" ? "status" : undefined;
  return { children, className, props, context, role };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useAlertBody } from "./useAlertBody";
import styles from "./AlertBody.module.css";

export interface AlertBodyProps extends ComponentPropsWithRef<"div"> {}

export function AlertBody(props: AlertBodyProps) {
  const view = useAlertBody(props);
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

- V2 AlertBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given AlertBody, Only Body owns the chosen live/status role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Only Body owns the chosen live/status role.
- [x] Root omits aria-labelledby when Header is absent.
- [x] Footer actions never join its live content.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useAlertBody is colocated with AlertBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase isolates Lorem ipsum and multi-paragraph message bodies without a Header or Footer.

- [x] Hidden parts remain display:none; visible child content has tokenized vertical spacing.

- [x] V2 **AlertBody contextual region**: Render AlertBody through public Alert with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Alert composition.
- [x] The AlertBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAlertBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
