"use client";
import { useState } from "react";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useCollapseExample() {
  const copy = useResourceExampleCopy();
  const [open, setOpen] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [reject, setReject] = useState(false);
  const [children, setChildren] = useState("Children");
  const [icon, setIcon] = useState(false);
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(0);
  const [cancelled, setCancelled] = useState(0);

  function change(next: boolean) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) setOpen(next);
  }

  function cancel() {
    setCancelled((n) => n + 1);
    change(false);
  }

  function save() {
    setSaved((n) => n + 1);
  }

  return {
    copy,
    open,
    animated,
    setAnimated,
    disabled,
    setDisabled,
    reject,
    setReject,
    children,
    setChildren,
    icon,
    setIcon,
    calls,
    requested,
    saved,
    cancelled,
    change,
    cancel,
    save,
  };
}
