"use client";
import { useState, useId } from "react";
import type { TabsFooterProps } from "@forge-ui/web";
import { items } from "../Tabs/fixtures";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function useTabsFooterExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding = useExampleProperties<Pick<TabsFooterProps, "title" | "children">>("TabsFooter");
  const [selected, setSelected] = useState("item-1");
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: string) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("value", setSelected)(next);
  }

  function nextPanel() {
    const index = items.findIndex((item) => item.id === selected);
    change(items[(index + 1) % items.length].id);
  }

  useExamplePropertySnapshot("TabsFooter", {
    children: "Children",
    title: undefined,
  });
  return {
    copy,
    id,
    properties: binding.properties,
    selected,
    calls,
    change,
    requested,
    reject,
    setReject,
    nextPanel,
  };
}
