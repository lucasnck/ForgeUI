---
title: "PopoverHeader"
scope: "Popover compound part: PopoverHeader. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# PopoverHeader

## Files

```text
features/showcase/examples/PopoverPartExamples.tsx (C)
design-system/components/atoms/PopoverHeader/PopoverHeader.tsx (C)
design-system/components/atoms/PopoverHeader/PopoverHeader.module.css (C)
design-system/components/atoms/PopoverHeader/index.ts (C)
design-system/internal/popover/PopoverContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/PopoverHeader.example.tsx (C)
features/showcase/examples/Popover.example.tsx (M)
../scripts/check-overlays.cjs (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/PopoverHeader/usePopoverHeader.ts (C)
features/showcase-v2/components/PopoverHeader/definition.ts (C)
features/showcase-v2/components/PopoverHeader/PopoverHeader.example.tsx (C)
features/showcase-v2/components/PopoverHeader/usePopoverHeaderExample.ts (C)
features/showcase-v2/components/PopoverHeader/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { Popover, PopoverHeader, PopoverBody } from "@forge-ui/web";
<Popover triggerLabel="Open example" label="Details"><PopoverHeader divider={false}>Details</PopoverHeader><PopoverBody hidden></PopoverBody></Popover>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  padding: var(--space-2);
  border-block-end: var(--border-width-thin) solid var(--color-border-default);
}

.root[data-divider="false"] {
  border-block-end-width: var(--zero);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverHeader } from "./usePopoverHeader";
import styles from "./PopoverHeader.module.css";
export interface PopoverHeaderProps extends ComponentPropsWithRef<"div"> { divider?: boolean; }
export function PopoverHeader(input: PopoverHeaderProps) { const { className, divider = true, ...props } = usePopoverHeader(input); return <div {...props} data-divider={divider} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { usePopoverHeader } from "./usePopoverHeader";
import styles from "./PopoverHeader.module.css";
export interface PopoverHeaderProps extends ComponentPropsWithRef<"div"> { divider?: boolean; }
export function PopoverHeader(input: PopoverHeaderProps) { const { className, divider = true, ...props } = usePopoverHeader(input); return <div {...props} data-divider={divider} className={[styles.root, className].filter(Boolean).join(" ")} />; }
```

## Tests

- V2 PopoverHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR: scoped menu items, one enabled tab stop, omitted closed popup and one named nonmodal dialog panel. Real keyboard, pointer and focus acceptance remain separate.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given PopoverHeader, Header contains a visible panel title and optional related controls, outside any listbox/menu semantic interior.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] Header is required by the Popover root contract; omitting it rejects incomplete composition instead of generating an empty wrapper.
- [x] Header contains a visible panel title and optional related controls, outside any listbox/menu semantic interior.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] usePopoverHeader is colocated with PopoverHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] divider defaults to true, may be disabled by the caller, and never leaks as a native DOM attribute.

- [x] V2 **PopoverHeader contextual region**: Render PopoverHeader through public Popover with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full Popover composition. Open from a named trigger and include a visible Close action inside the demonstrated region, with Escape/focus return as additional paths.
- [x] The PopoverHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. usePopoverHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
