"use client";
import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useOverlay } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

function subscribeLock(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-overlay-scroll-locked"],
  });
  return () => observer.disconnect();
}

function lockSnapshot() {
  return document.documentElement.getAttribute("data-overlay-scroll-locked") ?? "false";
}

function serverLock() {
  return "false";
}

export function useOverlayResourceExample(initialLock = false) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nestedTriggerRef = useRef<HTMLButtonElement>(null);
  const nestedPanelRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [nested, setNested] = useState(false);
  const [lockScroll, setLockScroll] = useState(initialLock);
  const [reason, setReason] = useState("—");
  const [branchCount, setBranchCount] = useState(0);
  const closeAll = useCallback(() => {
    setNested(false);
    setOpen(false);
  }, []);

  function escape() {
    setReason("onEscape");
    closeAll();
    triggerRef.current?.focus();
  }

  function outside() {
    setReason("onOutside");
    closeAll();
  }

  const overlay = useOverlay({
    open,
    triggerRef,
    panelRef,
    onEscape: escape,
    onOutside: outside,
    lockScroll,
  });

  function closeNested() {
    setNested(false);
    nestedTriggerRef.current?.focus();
  }

  function outsideNested() {
    setNested(false);
    setReason("nested.onOutside");
  }

  useOverlay({
    open: open && nested,
    triggerRef: nestedTriggerRef,
    panelRef: nestedPanelRef,
    onEscape: closeNested,
    onOutside: outsideNested,
    lockScroll,
  });
  const { registerBranch, restoreTriggerFocus } = overlay;
  useLayoutEffect(
    () => (branchRef.current ? registerBranch(branchRef.current) : undefined),
    [registerBranch],
  );

  function show() {
    setOpen(true);
    setReason("open");
  }

  function showNested() {
    setNested(true);
  }

  function close() {
    closeAll();
    restoreTriggerFocus();
    setReason("close");
  }

  function branch() {
    setBranchCount((value) => value + 1);
  }

  const lockAttribute = useSyncExternalStore(subscribeLock, lockSnapshot, serverLock);
  const copy = useResourceExampleCopy();

  return {
    triggerRef,
    panelRef,
    nestedTriggerRef,
    nestedPanelRef,
    branchRef,
    open,
    nested,
    lockScroll,
    setLockScroll,
    reason,
    branchCount,
    show,
    showNested,
    close,
    closeNested,
    branch,
    lockAttribute,
    copy,
  };
}
