---
title: "CollapseBody"
scope: "Collapse compound part: CollapseBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# CollapseBody

## Files

```text
design-system/components/atoms/CollapseBody/CollapseBody.module.css (M)
features/showcase/examples/CollapseBody.example.tsx (M)
features/showcase-v2/components/CollapseBody/definition.ts (C)
features/showcase-v2/components/CollapseBody/CollapseBody.example.tsx (C)
features/showcase-v2/components/CollapseBody/useCollapseBodyExample.ts (C)
features/showcase-v2/components/CollapseBody/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)

## Contract

```tsx
import {
  Surface,
  Collapse,
  CollapseHeader,
  CollapseBody,
  Text,
} from "@forge-ui/web";

<Surface padding="2" shape="rounded">
  <Collapse open={open} onOpenChange={onOpenChange}>
    <CollapseHeader hidden>Children</CollapseHeader>
    <CollapseBody>
      <Surface elevation="flat" padding="4">
        <Text>Children</Text>
      </Surface>
    </CollapseBody>
  </Collapse>
</Surface>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-2);
  min-inline-size: var(--zero);
  padding: var(--space-2);
  overflow-wrap: anywhere;
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";
import { useCollapseContext } from "../../../internal/collapse/CollapseContext";
import type { CollapseBodyProps } from "./CollapseBody";
export function useCollapseBody(input: CollapseBodyProps) {
  useCollapseContext();
  const { children, className, ...props } = input;
  
  return { children, className, props,  };
}
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useCollapseBody } from "./useCollapseBody";
import styles from "./CollapseBody.module.css";
export interface CollapseBodyProps extends ComponentPropsWithRef<"div"> {}
export function CollapseBody(input: CollapseBodyProps) {
  const { children, className, props,  } = useCollapseBody(input);
  return <div {...props}  className={[styles.root, className].filter(Boolean).join(" ")}>{children}</div>;
}
```

## Tests

- V2 CollapseBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR for native relationships, retained closed content, scoped parts and unique Collapse identities. Browser checks cover close-action focus repair, retained values, rejected controlled updates, caller cancellation, reversals, motion opt-out and teardown.

- Opening and closing request state once while rejected controlled updates remain authoritative.
- A disabled trigger and caller-prevented activation emit no owned request.
- Closing a panel with focus inside repairs focus before pixels can remain on exit.

## Criteria

- [x] Given CollapseBody, Body content stays mounted inside the root-owned hidden panel and is unavailable to focus when the panel is closed.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing optional region contract uses Owner omits Footer; no generated empty wrapper. Header and Body remain required.
- [x] Body content stays mounted inside the root-owned hidden panel and is unavailable to focus when the panel is closed.
- [x] The outer panel, not Body, owns the hook bodyRef/id/hidden attributes, so the optional Footer shares the same collapsed boundary.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useCollapseBody is colocated with CollapseBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase isolates Lorem ipsum and image-plus-text bodies in an open public Collapse owner with hidden required Header and no Footer.

- [x] Hidden parts remain display:none; visible child content receives tokenized inset and spacing without altering the shared disclosure boundary.

- [x] V2 **CollapseBody contextual region**: Render CollapseBody through public Collapse with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Collapse composition.
- [x] The CollapseBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useCollapseBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] V2 uses public Surface around the family and padded public Surface content with DS Inline icon/text spacing. Disclosure owners remain structural/behavioral; direct public parts and a single native trigger are preserved, without nested buttons. Where present, action footers retain aligned secondary/primary buttons; minimal copyable code matches the visible composition.
