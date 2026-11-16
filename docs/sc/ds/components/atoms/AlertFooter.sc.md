---
title: "AlertFooter"
scope: "Alert public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# AlertFooter

## Files

```text
design-system/components/atoms/AlertFooter/AlertFooter.module.css (M)
features/showcase/examples/AlertFooter.example.tsx (M)
features/showcase/examples/useAlertExample.ts (C)
features/showcase-v2/components/AlertFooter/definition.ts (C)
features/showcase-v2/components/AlertFooter/AlertFooter.example.tsx (C)
features/showcase-v2/components/AlertFooter/useAlertFooterExample.ts (C)
features/showcase-v2/components/AlertFooter/usage-code.ts (C)
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
import { Alert, AlertBody, AlertFooter, Button } from "@forge-ui/web";
<Alert announcement="off"><AlertBody hidden /><AlertFooter><Button onClick={review}>Review</Button></AlertFooter></Alert>;
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
import type { AlertFooterProps } from "./AlertFooter";

export function useAlertFooter(input: AlertFooterProps) {
  const { children, className, ...props } = input;
  const context = useAlertContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useAlertFooter } from "./useAlertFooter";
import styles from "./AlertFooter.module.css";

export interface AlertFooterProps extends ComponentPropsWithRef<"footer"> {}

export function AlertFooter(props: AlertFooterProps) {
  const view = useAlertFooter(props);
  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")} >
      {view.children}
    </footer>
  );
}
```

## Tests

- V2 AlertFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given AlertFooter, Footer is a scoped Alert region; render optional caller actions/messages without adding a live role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Footer is a scoped Alert region; render optional caller actions/messages without adding a live role.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useAlertFooter is colocated with AlertFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase isolates a message and an actionable footer with hidden required Body, without a Header or live action counter.

- [x] Hidden parts remain display:none; visible child content has tokenized vertical spacing.

- [x] V2 **AlertFooter contextual region**: Compose Alert and required Body with named Review and Dismiss actions in an end-aligned wrapping gap="2" row; callbacks belong to the example, and local dismissal does not invent an Alert onClose prop. Link to the full owning composition.
- [x] The AlertFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAlertFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
