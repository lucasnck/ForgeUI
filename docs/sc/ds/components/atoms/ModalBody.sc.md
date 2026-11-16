---
title: "ModalBody"
scope: "Modal compound part: ModalBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ModalBody

## Files

```text
features/showcase-v2/components/ModalBody/usage-code.ts (C)
features/showcase-v2/components/ModalBody/definition.ts (C)
features/showcase-v2/components/ModalBody/ModalBody.example.tsx (C)
features/showcase-v2/components/ModalBody/useModalBodyExample.ts (C)
design-system/components/atoms/ModalBody/ModalBody.tsx (C)
design-system/components/atoms/ModalBody/ModalBody.module.css (C)
design-system/components/atoms/ModalBody/index.ts (C)
design-system/internal/modal/ModalContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ModalBody.example.tsx (C)
features/showcase/examples/ModalPartExamples.module.css (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase/examples/ModalPartExamples.tsx (C)
design-system/components/atoms/ModalBody/useModalBody.ts (C)
```

## Dependencies

- [DialogClose](DialogClose.sc.md)
- [Stack](Stack.sc.md)

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-modal-interactions.sc.md](../../hooks/tech-modal-interactions.sc.md)

## Contract

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@forge-ui/web";
<Modal><ModalHeader title="Confirm"/><ModalBody>Confirmation details</ModalBody><ModalFooter><button type="button">Action</button></ModalFooter></Modal>;
```

## Styles

```css
.root {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-inline-size: var(--zero);
  padding: var(--space-3);
  overflow-wrap: anywhere;
  color: var(--color-text-default);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { ModalBodyProps } from "./ModalBody";
export function useModalBody(input: ModalBodyProps) {
  const { children, ...props } = input;
  const context = useModalContext();
  return { context, props, children };
}
```


## Content

```tsx
"use client";
import styles from "./ModalBody.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ModalBodyProps extends ComponentPropsWithRef<"div"> {
}
import { useModalBody } from "./useModalBody";
export function ModalBody(props: ModalBodyProps) {
  const view = useModalBody(props);
  return <div {...view.props} className={[styles.root, view.props.className].filter(Boolean).join(" ")}>{view.children}</div>;
}
```


## Tests

- Verify the named V2 ModalBody scenario, actual public owner/parts, property documentation and independent reset.
- Open and dismiss the dialog through its supported controls and keyboard; verify focus return and cleanup after reset.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given ModalBody, Body renders modal content without an independent focus trap.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] Body is required by Modal; incomplete composition is rejected instead of generating an empty wrapper.
- [x] Body renders modal content without an independent focus trap.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] useModalBody is colocated with ModalBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] Showcase isolates Lorem ipsum, text with responsive artwork and long text in a labeled Modal without Header or Footer previews.
- [x] Body preserves token-backed padding and gaps; text and artwork remain within the region at narrow widths.

- [x] Native hidden removes the Body from layout despite its flex container rule; Header/Footer part previews keep the required contextual Body hidden and empty.
- [x] V1 Body-only previews contain their text/artwork content without artificial dismissal actions; V2 additionally provides a visible close action for pointer and touch users. Escape retains the native Modal cancellation behavior.

- [x] The V2 Dialog body example composes Text with Children and a visible DialogClose within Stack gap="2" inside ModalBody. The real Modal uses aria-label="ModalBody preview" and no Header/Footer; close activation and Escape both return focus to the trigger.
- [x] Properties document native div attributes and children; resources identify the required Modal owner and Body region, and explain the meaningful accessible-label exception. Link to the complete Modal entry.
- [x] V2 uses real public exports and colocated example view logic; reset restores local controls and feedback, and V1 remains unchanged.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.

- [x] The V2 base preview and minimal usage snippet preserve meaningful spacing, action hierarchy and visible dismissal where applicable; browser validation includes the reported visual states.
