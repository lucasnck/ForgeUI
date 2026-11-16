---
title: "ModalFooter"
scope: "Modal compound part: ModalFooter. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# ModalFooter

## Files

```text
features/showcase-v2/components/ModalFooter/usage-code.ts (C)
features/showcase-v2/components/ModalFooter/definition.ts (C)
features/showcase-v2/components/ModalFooter/ModalFooter.example.tsx (C)
features/showcase-v2/components/ModalFooter/useModalFooterExample.ts (C)
design-system/components/atoms/ModalFooter/ModalFooter.tsx (C)
design-system/components/atoms/ModalFooter/ModalFooter.module.css (C)
design-system/components/atoms/ModalFooter/index.ts (C)
design-system/internal/modal/ModalContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ModalFooter.example.tsx (C)
features/showcase/examples/Modal.example.tsx (M)
features/showcase/examples/ModalPartExamples.module.css (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase/examples/ModalPartExamples.tsx (C)
design-system/components/atoms/ModalFooter/useModalFooter.ts (C)
```

## Dependencies

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
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  min-inline-size: var(--zero);
  padding: var(--space-3);
  border-block-start: var(--border-width-thin) solid var(--color-border-default);
  color: var(--color-text-default);
}

.root[data-divider="false"] {
  border-block-start-width: var(--zero);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { ModalFooterProps } from "./ModalFooter";
export function useModalFooter(input: ModalFooterProps) {
  const { children, divider = true, ...props } = input;
  const context = useModalContext();
  return { context, props, children, divider };
}
```


## Content

```tsx
"use client";
import styles from "./ModalFooter.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ModalFooterProps extends ComponentPropsWithRef<"div"> {
  divider?: boolean;
}
import { useModalFooter } from "./useModalFooter";
export function ModalFooter(props: ModalFooterProps) {
  const view = useModalFooter(props);
  return <div {...view.props} className={[styles.root, view.props.className].filter(Boolean).join(" ")} data-divider={view.divider}>{view.children}</div>;
}
```


## Tests

- Verify the named V2 ModalFooter scenario, actual public owner/parts, property documentation and independent reset.
- Open and dismiss the dialog through its supported controls and keyboard; verify focus return and cleanup after reset.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given ModalFooter, Footer contains caller-owned non-submit action buttons; close requests go through useModal context, never form method=dialog.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Footer contains caller-owned non-submit action buttons; close requests go through useModal context, never form method=dialog.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] useModalFooter is colocated with ModalFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] divider defaults to true; divider=false removes only the upper border while padding and action gaps remain stable.
- [x] Showcase isolates one action, cancel/confirm, destructive actions and divider variants without a Header preview.

- [x] Only Footer is visible in its dedicated previews; the required empty Body is hidden, and Header is absent.

- [x] The Dialog footer example renders secondary Cancel before primary Confirm in the public ModalFooter, using its native right alignment, gap and wrapping. A controlled Modal supplies aria-label="ModalFooter preview", hidden required Body and no Header. Both actions close with distinguishable feedback; controls toggle divider.
- [x] Properties document divider, children and native div attributes; resources identify the Modal owner and optional Footer. A trigger and the footer action demonstrate open/close with focus return; explain the meaningful accessible-label exception and link to the complete Modal entry.
- [x] V2 uses real public exports and colocated example view logic; reset restores local controls and feedback, and V1 remains unchanged.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.

- [x] The V2 base preview and minimal usage snippet preserve meaningful spacing, action hierarchy and visible dismissal where applicable; browser validation includes the reported visual states.
