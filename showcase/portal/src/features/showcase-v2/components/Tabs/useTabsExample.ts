"use client";
import { useState, useId } from "react";
import type { TabsProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useTabsExample() {
  const id = useId();
  const binding =
    useExampleProperties<Pick<TabsProps, "label" | "direction" | "animated" | "title" | "value">>(
      "Tabs",
    );
  const [selected, setSelected] = useState("item-1");
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: string) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("value", setSelected)(next);
  }

  useExamplePropertySnapshot("Tabs", {
    label: "Label",
    value: selected,
    direction: "ltr",
    animated: true,
    title: undefined,
  });
  return {
    id,
    properties: binding.properties,
    selected: binding.properties.value ?? selected,
    calls,
    change,
    requested,
    reject,
    setReject,
  };
}
