"use client";
import { useState, useId } from "react";
import type { TabsHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useTabsHeaderExample() {
  const id = useId();
  const binding = useExampleProperties<Pick<TabsHeaderProps, "title">>("TabsHeader");
  const [selected, setSelected] = useState("item-1");
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: string) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("value", setSelected)(next);
  }

  useExamplePropertySnapshot("TabsHeader", { title: "Title" });
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
