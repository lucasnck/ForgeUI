"use client";
import { useRef, useState } from "react";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useDialogPreview(override?: boolean, sync?: (next: boolean) => void) {
  const copy = useResourceExampleCopy();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [accepted, setAccepted] = useState(false);
  const [requested, setRequested] = useState<boolean | null>(null);
  const [requests, setRequests] = useState(0);
  const open = override ?? accepted;

  function show() {
    setAccepted(true);
    sync?.(true);
  }

  function close() {
    setAccepted(false);
    sync?.(false);
  }

  function request(next: boolean) {
    setAccepted(next);
    sync?.(next);
    setRequested(next);
    setRequests((n) => n + 1);
  }

  return {
    triggerRef,
    cancelRef,
    copy,
    open,
    show,
    close,
    request,
    state: { open, requested, requests },
  };
}
