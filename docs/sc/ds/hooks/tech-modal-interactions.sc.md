---
title: "Modal interaction hook"
scope: "Own native dialog lifecycle, controlled close requests and focus return using useModal and the shared DS overlay layer."
status: "DONE"
type: "hook"
ds-level: "none"
---

# Modal interaction hook

## Files

```text
../scripts/check-overlays.cjs (M)
design-system/hooks/modal/useModal.ts (C)
design-system/hooks/modal/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/HookResources/useModal/definition.ts (C)
features/showcase-v2/components/HookResources/useModal/useModal.example.tsx (C)
features/showcase-v2/components/HookResources/useModal/useModalResourceExample.ts (C)
features/showcase-v2/components/HookResources/useModal/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Modal contracts](../types/tech-modal-contracts.sc.md)
- [Overlay interaction](tech-overlay-interactions.sc.md)

## Contract

```ts
import { useModal } from "@forge-ui/web";
const modal = useModal({ open, onOpenChange, initialFocusRef, returnFocusRef });
```

## Content

```ts
"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent, SyntheticEvent } from "react";
import type { ModalContract, ModalOptions } from "../../types/modal";
import { useOverlay } from "../overlay";

export function useModal(options: ModalOptions = {}): ModalContract {
  const [localOpen, setLocalOpen] = useState(options.defaultOpen ?? false);
  const [nativeRevision, setNativeRevision] = useState(0);
  const local = useRef(localOpen);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const outsidePointer = useRef(false);
  const opener = useRef<HTMLElement | null>(null);
  const ignoredCloseEvents = useRef(0);
  const latestOptions = useRef(options);
  const open = options.open ?? localOpen;
  useLayoutEffect(() => { latestOptions.current = options; });

  function requestOpen(next: boolean): void {
    if (next === (options.open ?? local.current)) return;
    if (options.open === undefined) {
      local.current = next;
      setLocalOpen(next);
    }
    options.onOpenChange?.(next);
  }

  useOverlay({
    open,
    triggerRef: options.returnFocusRef ?? opener,
    panelRef: dialogRef,
    nativeModal: true,
    onEscape: () => {},
    onOutside: () => {},
  });

  const restoreFocus = useCallback((): void => {
    const configured = latestOptions.current.returnFocusRef?.current;
    const target = configured?.isConnected ? configured : opener.current;
    if (target?.isConnected) target.focus({ preventScroll: true });
  }, []);
  const closeDialog = useCallback((dialog: HTMLDialogElement | null): void => {
    if (!dialog?.open) return;
    ignoredCloseEvents.current++;
    dialog.close();
  }, []);

  useLayoutEffect(() => {
    local.current = localOpen;
    const dialog = dialogRef.current;
    if (!dialog?.isConnected) return;
    if (open && !dialog.open) {
      const preferred = options.initialFocusRef?.current;
      const validPreferred = preferred?.isConnected && dialog.contains(preferred) && !preferred.matches?.(":disabled");
      if (options.requiredInitialFocus && !validPreferred) {
        throw new Error("Modal requires a connected enabled initial focus target inside its dialog.");
      }
      const active = dialog.ownerDocument.activeElement;
      const constructor = dialog.ownerDocument.defaultView?.HTMLElement;
      if (constructor && active instanceof constructor) opener.current = active;
      dialog.showModal();
      if (validPreferred) preferred.focus();
    }
    if (!open && dialog.open) {
      closeDialog(dialog);
      restoreFocus();
    }
  }, [open, localOpen, nativeRevision, options.initialFocusRef, options.returnFocusRef, options.requiredInitialFocus, closeDialog, restoreFocus]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) {
        closeDialog(dialog);
        restoreFocus();
      }
    };
  }, [closeDialog, restoreFocus]);

  function outsideBounds(event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>): boolean {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  }
  function onPointerDown(event: PointerEvent<HTMLDialogElement>): void {
    outsidePointer.current = open && options.closeOnOutsideClick === true && !event.defaultPrevented && event.button === 0 && event.isPrimary !== false && outsideBounds(event);
  }
  function onPointerCancel(): void { outsidePointer.current = false; }
  function onClick(event: MouseEvent<HTMLDialogElement>): void {
    const startedOutside = outsidePointer.current;
    outsidePointer.current = false;
    if (open && options.closeOnOutsideClick === true && startedOutside && !event.defaultPrevented && event.button === 0 && outsideBounds(event)) requestOpen(false);
  }

  function onCancel(event: SyntheticEvent<HTMLDialogElement>): void {
    if (event.target !== event.currentTarget || event.defaultPrevented) return;
    event.preventDefault();
    requestOpen(false);
  }

  function onClose(event: SyntheticEvent<HTMLDialogElement>): void {
    if (event.target !== event.currentTarget) return;
    if (ignoredCloseEvents.current > 0) {
      ignoredCloseEvents.current--;
      return;
    }
    requestOpen(false);
    setNativeRevision((revision) => revision + 1);
    if (options.open === undefined) restoreFocus();
  }

  return { open, dialogRef, requestOpen, onCancel, onClose, onPointerDown, onPointerCancel, onClick };
}
```

## Tests

- V2 Native modal lifecycle: verify its observable state, actual public contract, reset and complete copied code.

- `npm run test:overlays` passes isolated stack/native lifecycle checks and real React server rendering; `npm run typecheck:design-system` passes. Browser fixtures verify nested Escape, controlled rejection, native external close, focus return and unchanged page overflow for native modals.

- Static HTML remains closed for initial open=true; native showModal runs only after client mount.
- Rejected controlled Escape prevents native cancel and remains modal.
- Accepted close synchronizes the native dialog without a second onOpenChange request.
- Native/external close requests the owner once; a rejected controlled close is resynchronized open.
- Connected configured initial/return focus targets win over native fallback.
- Nested modal membership preserves the existing root overflow and scrollbar.
- Strict Mode replay and unmount dispose native membership without a false dismissal callback.

## Criteria

- [x] closeOnOutsideClick defaults to false. When enabled, a primary click beginning and ending outside native dialog bounds requests onOpenChange(false); inside clicks, drag across bounds, canceled pointers, caller-prevented events and nested dialog events do not dismiss. Controlled refusal keeps the dialog open; accepted close restores focus through the existing lifecycle. The option is not forwarded to the DOM.

- [x] Given rejected controlled Escape, native cancel is prevented and dialog stays modal.
- [x] Given an accepted close, onOpenChange runs once, native synchronization emits no second request and focus returns to a connected opener.
- [x] Given nested native modal layers, only the topmost closes and page scrolling remains available.
- [x] Given native showModal, no second trap or manual aria-modal/inert system competes with browser behavior.
- [x] Given SSR and Strict Mode, no early browser-global access or false dismissal callback occurs.
- [x] The open / defaultOpen contract uses undefined / false; one local-or-controlled owner.
- [x] The Native dialog contract uses showModal/close after client mount; do not render open=true on the server.
- [x] The Escape contract uses cancel prevented, requests false once; rejected controlled request stays visible.
- [x] The Outside/backdrop click contract uses Does not dismiss by default.
- [x] The Initial focus contract uses Connected initialFocusRef wins; AlertDialog requires least-destructive action; fallback is native autofocus/first enabled content.
- [x] The Focus return contract uses Supplied connected ref or captured opener; otherwise connected logical fallback.
- [x] The hook, not Modal.tsx, owns dialog synchronization, cleanup and capturing the opener at opening time.
- [x] Use the shared useOverlay stack for branch/nesting membership without requesting a document scroll lock; when a layer owns a native cancel event the shared Escape listener must not emit a second close request.
- [x] Native close event after a prop-driven close does not re-emit onOpenChange; distinguish accepted programmatic synchronization from external/native closure.
- [x] Do not use form method=dialog as an alternate uncontrolled close path; footer buttons request through context.
- [x] Initial controlled open=true is deterministically closed in static HTML, then opens after hydration; never access document during render.
- [x] Focus opens at an explicitly autofocus child or first enabled focusable descendant; a text-heavy modal may set a programmatically focusable title via a reviewed initial focus choice.
- [x] The native backdrop needs token-backed styling and no modal coordinates.

- [x] V2 **Native modal lifecycle**: Bind the actual returned dialog contract to a native dialog and named trigger/visible Close action. Show controlled open requests, initial/return focus, Escape and unmount cleanup; no synthetic second modal/focus engine is added.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
