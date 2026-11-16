---
title: "PopoverFooter"
scope: "Popover compound part: PopoverFooter. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# PopoverFooter

## Files

```text
features/showcase/examples/PopoverPartExamples.tsx (C)
design-system/components/atoms/PopoverFooter/PopoverFooter.tsx (C)
design-system/components/atoms/PopoverFooter/PopoverFooter.module.css (C)
design-system/components/atoms/PopoverFooter/index.ts (C)
design-system/internal/popover/PopoverContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/PopoverFooter.example.tsx (C)
features/showcase/examples/Popover.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/PopoverFooter/usePopoverFooter.ts (C)
features/showcase-v2/components/PopoverFooter/definition.ts (C)
features/showcase-v2/components/PopoverFooter/PopoverFooter.example.tsx (C)
features/showcase-v2/components/PopoverFooter/usePopoverFooterExample.ts (C)
features/showcase-v2/components/PopoverFooter/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { Popover, PopoverHeader, PopoverBody, PopoverFooter } from "@forge-ui/web";
<Popover triggerLabel="Open example" label="Details"><PopoverHeader hidden>Details</PopoverHeader><PopoverBody hidden></PopoverBody><PopoverFooter divider={false}>Additional information</PopoverFooter></Popover>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  padding: var(--space-2);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-2);
  border-block-start: var(--border-width-thin) solid var(--color-border-default);
}

.root[data-divider="false"] {
  border-block-start-width: var(--zero);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverFooter } from "./usePopoverFooter";
import styles from "./PopoverFooter.module.css";
export interface PopoverFooterProps extends ComponentPropsWithRef<"div"> { divider?: boolean; }
export function PopoverFooter(input: PopoverFooterProps) { const { className, divider = true, ...props } = usePopoverFooter(input); return <div {...props} data-divider={divider} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverFooter } from "./usePopoverFooter";
import styles from "./PopoverFooter.module.css";
export interface PopoverFooterProps extends ComponentPropsWithRef<"div"> { divider?: boolean; }
export function PopoverFooter(input: PopoverFooterProps) { const { className, divider = true, ...props } = usePopoverFooter(input); return <div {...props} data-divider={divider} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Tests

- V2 PopoverFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given PopoverFooter, Footer holds optional actions; a close action uses the root requestOpen callback and preserves the documented focus-return reason.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Footer holds optional actions; a close action uses the root requestOpen callback and preserves the documented focus-return reason.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] usePopoverFooter is colocated with PopoverFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] divider defaults to true, may be disabled by the caller, and never leaks as a native DOM attribute.

- [x] V2 **PopoverFooter contextual region**: Render PopoverFooter through public Popover with the minimum valid siblings. Show meaningful secondary Cancel then primary Save/Confirm actions aligned to the inline end, gap="2" and wrapping, with independent feedback; reuse existing owner action layout. Hide/omit optional siblings only where allowed by the owner; link to the full Popover composition. Open from a named trigger and include a visible Close action inside the demonstrated region, with Escape/focus return as additional paths.
- [x] The PopoverFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. usePopoverFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
