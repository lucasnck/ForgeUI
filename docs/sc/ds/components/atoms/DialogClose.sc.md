---
title: "DialogClose"
scope: "Dialog public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# DialogClose

## Files

```text
design-system/components/atoms/DialogClose/DialogClose.tsx (C)
design-system/components/atoms/DialogClose/DialogClose.module.css (C)
design-system/components/atoms/DialogClose/index.ts (C)
design-system/internal/modal/ModalContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/DialogClose.example.tsx (M)
../scripts/check-overlays.cjs (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/DialogClose/useDialogClose.ts (C)
features/showcase-v2/components/DialogClose/definition.ts (C)
features/showcase-v2/components/DialogClose/DialogClose.example.tsx (C)
features/showcase-v2/components/DialogClose/useDialogCloseExample.ts (C)
features/showcase-v2/components/DialogClose/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-modal-interactions.sc.md](../../hooks/tech-modal-interactions.sc.md)
- [Dialog.sc.md](../organisms/Dialog.sc.md)

## Contract

```tsx
import { Dialog, DialogHeader, DialogBody, DialogFooter, DialogClose } from "@forge-ui/web";
<Dialog open={open} onOpenChange={setOpen}><DialogHeader title="Details"/><DialogBody>Details content</DialogBody><DialogFooter><DialogClose>Close</DialogClose></DialogFooter></Dialog>;
```

## Styles

```css
.root {
  composes: stateFeedback from "../../../styles/motion-components.module.css";
}
```

## Animations

```text
stateFeedback
```

## Hooks

```tsx
"use client";

import type { MouseEvent } from "react";
import { useModalContext } from "../../../internal/modal/ModalContext";
import type { DialogCloseProps } from "./DialogClose";

export function useDialogClose(input: DialogCloseProps) {
  const { onClick, disabled, children, className, ...props } = input;
  const modal = useModalContext();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled) modal.requestOpen(false);
  };
  return { props, disabled, children, className, handleClick };
}
```

## Content

```tsx
"use client";

import type { NativeActionButtonProps } from "../../../types";
import { Button } from "../Button";
import { useDialogClose } from "./useDialogClose";
import styles from "./DialogClose.module.css";

export interface DialogCloseProps extends NativeActionButtonProps {}

export function DialogClose(input: DialogCloseProps) {
  const { props, disabled, children, className, handleClick } = useDialogClose(input);
  return <Button {...props} type="button" disabled={disabled} onClick={handleClick} data-animated="true" className={[styles.root, className].filter(Boolean).join(" ")}>{children}</Button>;
}
```

## Tests

- V2 Contextual dismissal: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Accepted dismissal changes semantics immediately while controlled rejection preserves supplied open state.
- Nested layers deliver Escape to one eligible owner without losing keyboard focus.
- Closing and unmount dispose lifecycle ownership and restore focus to the connected configured target.

## Criteria

- [x] Given DialogClose, Real ref-capable native action inside nearest Modal/Dialog/AlertDialog.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Caller onClick runs first; prevented event skips the request.
- [x] Controlled owner may reject close.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] Native stateFeedback only; focus/close request happens immediately.
- [x] useDialogClose is colocated with DialogClose and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Contextual dismissal**: Render under Dialog/Header/Body/Footer with a named trigger; the meaningful Close action dismisses exactly once and restores trigger focus without orphan context.
- [x] The DialogClose V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDialogCloseExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
