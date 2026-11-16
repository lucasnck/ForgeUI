"use client";
import { useState } from "react";
import { useCollapse } from "@forge-ui/web";
import { useExampleStore } from "../ExampleScope/ExampleScope";
import { useExampleCode } from "../ExampleCode/useExampleCode";

export function useExamplePreview(code: string) {
  const [revision, setRevision] = useState(0);
  const store = useExampleStore();
  const {
    triggerProps,
    triggerRef,
    bodyProps,
    bodyRef,
    toggle: toggleDisclosure,
  } = useCollapse({ defaultOpen: true });
  const clipboard = useExampleCode(code);

  function reset() {
    store?.clear();
    setRevision((value) => value + 1);
    clipboard.reset();
  }

  function toggle() {
    toggleDisclosure();
  }

  return {
    ...clipboard,
    revision,
    reset,
    toggle,
    triggerProps,
    triggerRef,
    bodyProps,
    bodyRef,
  };
}
