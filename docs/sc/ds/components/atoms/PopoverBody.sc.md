---
title: "PopoverBody"
scope: "Popover compound part: PopoverBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# PopoverBody

## Files

```text
features/showcase/examples/PopoverPartExamples.tsx (C)
design-system/components/atoms/PopoverBody/PopoverBody.tsx (C)
design-system/components/atoms/PopoverBody/PopoverBody.module.css (C)
design-system/components/atoms/PopoverBody/index.ts (C)
design-system/internal/popover/PopoverContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/PopoverBody.example.tsx (C)
features/showcase/examples/Popover.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/PopoverBody/usePopoverBody.ts (C)
features/showcase-v2/components/PopoverBody/definition.ts (C)
features/showcase-v2/components/PopoverBody/PopoverBody.example.tsx (C)
features/showcase-v2/components/PopoverBody/usePopoverBodyExample.ts (C)
features/showcase-v2/components/PopoverBody/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { Popover, PopoverHeader, PopoverBody } from "@forge-ui/web";
<Popover triggerLabel="Open example" label="Details"><PopoverHeader hidden>Details</PopoverHeader><PopoverBody>Details content</PopoverBody></Popover>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverBody } from "./usePopoverBody";
import styles from "./PopoverBody.module.css";
export interface PopoverBodyProps extends ComponentPropsWithRef<"div"> {}
export function PopoverBody(input: PopoverBodyProps) { const { className, ...props } = usePopoverBody(input); return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverBody } from "./usePopoverBody";
import styles from "./PopoverBody.module.css";
export interface PopoverBodyProps extends ComponentPropsWithRef<"div"> {}
export function PopoverBody(input: PopoverBodyProps) { const { className, ...props } = usePopoverBody(input); return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Tests

- V2 PopoverBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given PopoverBody, Body contains nonmodal dialog content; it consumes root overlay context without owning open state.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] Body is required by the Popover root contract; omitting it rejects incomplete composition instead of generating an empty wrapper.
- [x] Body contains nonmodal dialog content; it consumes root overlay context without owning open state.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] usePopoverBody is colocated with PopoverBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **PopoverBody contextual region**: Render PopoverBody through public Popover with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Popover composition. Open from a named trigger and include a visible Close action inside the demonstrated region, with Escape/focus return as additional paths.
- [x] The PopoverBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. usePopoverBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
