---
title: "AlertDialog"
scope: "Presentation-only AlertDialog with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "organisms"
---

# AlertDialog

## Files

```text
design-system/components/organisms/AlertDialog/AlertDialog.tsx (C)
design-system/components/organisms/AlertDialog/AlertDialog.module.css (C)
design-system/components/organisms/AlertDialog/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/AlertDialog.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/organisms/AlertDialog/useAlertDialog.ts (C)
features/showcase-v2/components/AlertDialog/definition.ts (C)
features/showcase-v2/components/AlertDialog/AlertDialog.example.tsx (C)
features/showcase-v2/components/AlertDialog/useAlertDialogExample.ts (C)
features/showcase-v2/components/AlertDialog/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Modal.sc.md](../molecules/Modal.sc.md)
- [Dialog.sc.md](Dialog.sc.md)
- [tech-modal-interactions.sc.md](../../hooks/tech-modal-interactions.sc.md)
- [Selection, panel and open-state contracts](../../types/tech-selection-navigation.sc.md)
- [Compound parts](../../helpers/tech-compound-parts.sc.md)
- [ModalBody](../atoms/ModalBody.sc.md)

## Contract

```tsx
import { AlertDialog, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, DialogClose, Button } from "@forge-ui/web";
<AlertDialog open={open} onOpenChange={setOpen} description="This action cannot be undone." initialFocusRef={cancelRef}><AlertDialogHeader title="Confirm deletion"/><AlertDialogBody>Review the selected record.</AlertDialogBody><AlertDialogFooter><DialogClose ref={cancelRef}>Cancel</DialogClose><Button onClick={confirmDeletion}>Delete</Button></AlertDialogFooter></AlertDialog>;
```

## Styles

```css
.description {
  margin-block-start: var(--zero);
  margin-block-end: var(--space-2);
}
```

## Hooks

```tsx
"use client";

import { useId } from "react";
import type { AlertDialogProps } from "./AlertDialog";

export function useAlertDialog(input: AlertDialogProps) {
  const { children, description, initialFocusRef, returnFocusRef, ...props } = input;
  const descriptionId = useId();
  if (!description.trim()) throw new Error("AlertDialog requires a nonempty plain description.");
  return { children, description, initialFocusRef, returnFocusRef, props, descriptionId };
}
```

## Content

```tsx
"use client";

import type { ReactElement, RefObject } from "react";
import type { ComponentAnimationEffectProps, ComponentChildrenProps, ComponentOpenProps, NativeAlertDialogRootProps } from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { Modal } from "../../molecules/Modal";
import { ModalBody } from "../../atoms/ModalBody";
import type { ModalBodyProps } from "../../atoms/ModalBody";
import { AlertDialogHeader } from "../../molecules/AlertDialogHeader";
import { AlertDialogBody } from "../../atoms/AlertDialogBody";
import { AlertDialogFooter } from "../../atoms/AlertDialogFooter";
import { useAlertDialog } from "./useAlertDialog";
import styles from "./AlertDialog.module.css";

export interface AlertDialogProps extends NativeAlertDialogRootProps, ComponentChildrenProps, ComponentOpenProps, ComponentAnimationEffectProps {
  description: string;
  initialFocusRef: RefObject<HTMLButtonElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function AlertDialog(input: AlertDialogProps) {
  const { children, description, initialFocusRef, returnFocusRef, props, descriptionId } = useAlertDialog(input);
  const parts = collectCompoundParts(children, { header: AlertDialogHeader, body: AlertDialogBody, footer: AlertDialogFooter });
  const body = parts.body as ReactElement<ModalBodyProps>;
  return <Modal {...props} role="alertdialog" aria-describedby={descriptionId} initialFocusRef={initialFocusRef} returnFocusRef={returnFocusRef}>
    {parts.header}
    <ModalBody {...body.props} key={body.key}><p key={descriptionId} id={descriptionId} className={styles.description}>{description}</p>{body.props.children}</ModalBody>
    {parts.footer}
  </Modal>;
}
```

## Tests

- V2 Record confirmation: verify the specified actions/outcome, reset and agreement with its minimal copyable code.
- V2 Validated acknowledgement: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given open, focus is placed on connected least-destructive action and concise warning is described.
- [x] Given confirm activation, only caller callback runs; no hidden mutation or automatic dismissal.
- [x] The description / initialFocusRef contract uses Required plain concise warning and least-destructive native action ref.
- [x] The open / defaultOpen contract uses undefined / false.
- [x] The Outside action contract uses No automatic backdrop dismissal.
- [x] Use native Modal with role=alertdialog; Header has visible title; root inserts one description paragraph and connects it by aria-describedby.
- [x] Body supplies additional content; Footer contains explicit safe/destructive actions. initialFocusRef must resolve to the safe Cancel action before opening, not the destructive action.
- [x] Use the canonical ModalBody stack with token-backed gap 2.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.
- [x] useAlertDialog is colocated with AlertDialog and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Record confirmation**: Compose AlertDialogHeader/Body/Footer, DialogClose and a confirm Button around a local indexed record, with description and initialFocusRef targeting Cancel. Cancel/Escape only dismiss; confirm reports the stable record id and updates local accepted state.
- [x] V2 **Validated acknowledgement**: Compose the same parts with Checkbox/Label in Body; caller state enables Confirm only after acknowledgement. Confirmation reports checked=true and closes; Cancel preserves the original record.
- [x] The AlertDialog V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAlertDialogExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
