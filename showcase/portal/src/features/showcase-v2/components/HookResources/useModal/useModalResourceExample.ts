"use client";
import { useId, useRef, useState } from "react";
import { useModal } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useModalResourceExample() {
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [acceptChanges, setAcceptChanges] = useState(true);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(false);
  const [requested, setRequested] = useState<boolean | null>(null);

  function onOpenChange(next: boolean) {
    setRequested(next);
    if (acceptChanges) setOpen(next);
  }

  const modal = useModal({
    open,
    onOpenChange,
    initialFocusRef: closeRef,
    returnFocusRef: triggerRef,
    closeOnOutsideClick,
  });

  function show() {
    modal.requestOpen(true);
  }

  function close() {
    modal.requestOpen(false);
  }

  const copy = useResourceExampleCopy();

  return {
    modal,
    titleId,
    triggerRef,
    closeRef,
    acceptChanges,
    setAcceptChanges,
    closeOnOutsideClick,
    setCloseOnOutsideClick,
    requested,
    show,
    close,
    copy,
  };
}
