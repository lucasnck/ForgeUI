---
title: "Overlay contracts"
scope: "Overlay contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Overlay contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/overlay.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { TooltipTriggerProps } from "@forge-ui/web";
type Contract = TooltipTriggerProps;
```

## Content

```ts
import type {
  Ref,
  HTMLAttributes,
  RefObject,
  ReactNode,
} from "react";

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

export interface OverlayLayerOptions {
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  onEscape(): void;
  onOutside(): void;
  nativeModal?: boolean;
  lockScroll?: boolean;
}

export interface OverlayLayerContract {
  registerBranch(element: HTMLElement): () => void;
  restoreTriggerFocus(): void;
}

export interface OverlayPortalProps {
  children: ReactNode;
}
```

## Tests

- V2 Consumer snippets for Popover, DropdownMenu, useOverlay retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile required open state, trigger/panel refs and escape/outside callbacks.
- Reject incompatible refs and missing required fields; compile branch registration cleanup and focus restoration.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] nativeModal delegates browser modality only; lockScroll defaults to false and explicit true independently requests root scroll ownership.

- [x] V2 typed usage fixtures cover Popover, DropdownMenu, useOverlay: Trigger/panel refs, branch registration and topmost dismissal requests. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.
