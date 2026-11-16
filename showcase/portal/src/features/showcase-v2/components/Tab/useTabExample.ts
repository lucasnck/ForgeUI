"use client";
import { useState, useId } from "react";
import type { TabProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useTabExample() {
  const id = useId();
  const binding =
    useExampleProperties<
      Pick<
        TabProps,
        "disabled" | "title" | "children" | "size" | "tone" | "appearance" | "shape" | "attached"
      >
    >("Tab");
  const [selected, setSelected] = useState("item-1");
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: string) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("value", setSelected)(next);
  }

  useExamplePropertySnapshot("Tab", {
    children: "Children",
    size: "md",
    tone: "brand",
    appearance: "ghost",
    shape: "rounded",
    attached: false,
    disabled: false,
    title: "Title",
  });
  return {
    id,
    properties: binding.properties,
    selected,
    calls,
    change,
    requested,
    reject,
    setReject,
  };
}
