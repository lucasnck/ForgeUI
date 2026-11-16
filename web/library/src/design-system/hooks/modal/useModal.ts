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
  useLayoutEffect(() => {
    latestOptions.current = options;
  });

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
      const validPreferred =
        preferred?.isConnected && dialog.contains(preferred) && !preferred.matches?.(":disabled");

      if (options.requiredInitialFocus && !validPreferred) {
        throw new Error(
          "Modal requires a connected enabled initial focus target inside its dialog.",
        );
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
  }, [
    open,
    localOpen,
    nativeRevision,
    options.initialFocusRef,
    options.returnFocusRef,
    options.requiredInitialFocus,
    closeDialog,
    restoreFocus,
  ]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      if (dialog?.open) {
        closeDialog(dialog);
        restoreFocus();
      }
    };
  }, [closeDialog, restoreFocus]);

  function outsideBounds(
    event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>,
  ): boolean {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();

    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  }

  function onPointerDown(event: PointerEvent<HTMLDialogElement>): void {
    outsidePointer.current =
      open &&
      options.closeOnOutsideClick === true &&
      !event.defaultPrevented &&
      event.button === 0 &&
      event.isPrimary !== false &&
      outsideBounds(event);
  }

  function onPointerCancel(): void {
    outsidePointer.current = false;
  }

  function onClick(event: MouseEvent<HTMLDialogElement>): void {
    const startedOutside = outsidePointer.current;
    outsidePointer.current = false;
    if (
      open &&
      options.closeOnOutsideClick === true &&
      startedOutside &&
      !event.defaultPrevented &&
      event.button === 0 &&
      outsideBounds(event)
    )
      requestOpen(false);
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

  return {
    open,
    dialogRef,
    requestOpen,
    onCancel,
    onClose,
    onPointerDown,
    onPointerCancel,
    onClick,
  };
}
