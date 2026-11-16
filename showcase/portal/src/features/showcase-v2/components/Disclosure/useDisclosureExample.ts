"use client";
import { useState, useId } from "react";
import type { DisclosureProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useDisclosureExample() {
  const id = useId();
  const binding =
    useExampleProperties<
      Pick<DisclosureProps, "label" | "open" | "disabled" | "animated" | "title" | "children">
    >("Disclosure");
  const [open, setOpen] = useState(false);
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<boolean | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: boolean) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("open", setOpen)(next);
  }

  useExamplePropertySnapshot("Disclosure", {
    label: "Label",
    children: "Children",
    open,
    disabled: false,
    animated: true,
    title: undefined,
  });
  return {
    id,
    properties: binding.properties,
    open,
    calls,
    requested,
    reject,
    setReject,
    change,
  };
}
