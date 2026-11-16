"use client";
import { useState, useId } from "react";
import type { TabPanelProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useTabPanelExample() {
  const id = useId();
  const binding = useExampleProperties<Pick<TabPanelProps, "title" | "children">>("TabPanel");
  const [selected, setSelected] = useState("item-1");
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: string) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("value", setSelected)(next);
  }

  useExamplePropertySnapshot("TabPanel", {
    children: "Children",
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
