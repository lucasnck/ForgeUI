"use client";

import { useId, useMemo } from "react";
import type { MouseEvent, PointerEvent, Ref } from "react";
import { useModal } from "../../../hooks/modal";
import type { ModalProps } from "./Modal";

function mergeDialogRefs(
  ownedRef: { current: HTMLDialogElement | null },
  suppliedRef: Ref<HTMLDialogElement> | undefined,
) {
  return (node: HTMLDialogElement | null) => {
    ownedRef.current = node;
    if (typeof suppliedRef === "function") {
      const cleanup = suppliedRef(node);

      if (cleanup)
        return () => {
          ownedRef.current = null;
          cleanup();
        };
    } else if (suppliedRef) suppliedRef.current = node;
  };
}

export function useModalView(input: ModalProps) {
  const {
    open,
    defaultOpen,
    onOpenChange,
    closeOnOutsideClick = false,
    onClick: callerClick,
    onPointerDown: callerPointerDown,
    onPointerCancel: callerPointerCancel,
    initialFocusRef,
    returnFocusRef,
    children,
    animated = true,
    animationEffect = "fade",
    className,
    "aria-label": suppliedLabel,
    ref: suppliedRef,
    ...props
  } = input;
  const {
    open: acceptedOpen,
    dialogRef: ownedRef,
    requestOpen,
    onCancel,
    onClose,
    onClick: modalClick,
    onPointerDown: modalPointerDown,
    onPointerCancel: modalPointerCancel,
  } = useModal({
    open,
    defaultOpen,
    onOpenChange,
    closeOnOutsideClick,
    initialFocusRef,
    returnFocusRef,
    requiredInitialFocus: props.role === "alertdialog",
  });

  function onClick(event: MouseEvent<HTMLDialogElement>) {
    callerClick?.(event);
    modalClick(event);
  }

  function onPointerDown(event: PointerEvent<HTMLDialogElement>) {
    callerPointerDown?.(event);
    modalPointerDown(event);
  }

  function onPointerCancel(event: PointerEvent<HTMLDialogElement>) {
    callerPointerCancel?.(event);
    modalPointerCancel(event);
  }

  const titleId = useId();
  const label = suppliedLabel?.trim() || undefined;
  const dialogRef = useMemo(() => mergeDialogRefs(ownedRef, suppliedRef), [ownedRef, suppliedRef]);

  return {
    props,
    context: { open: acceptedOpen, requestOpen, titleId },
    dialogRef,
    titleId,
    label,
    className,
    children,
    animated,
    animationEffect,
    onCancel,
    onClose,
    onClick,
    onPointerDown,
    onPointerCancel,
  };
}
