"use client";
import { useState } from "react";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function usePopoverPreview(override?: boolean, accept?: (open: boolean) => void) {
  const copy = useResourceExampleCopy();
  const [accepted, setAccepted] = useState(false);
  const [requested, setRequested] = useState<boolean | null>(null);
  const [requests, setRequests] = useState(0);
  const [closeActions, setCloseActions] = useState(0);
  const open = override ?? accepted;

  function request(next: boolean) {
    setAccepted(next);
    accept?.(next);
    setRequested(next);
    setRequests((n) => n + 1);
  }

  function close() {
    setAccepted(false);
    accept?.(false);
    setCloseActions((n) => n + 1);
  }

  return {
    copy,
    open,
    request,
    close,
    state: { open, requested, requests, closeActions },
  };
}
