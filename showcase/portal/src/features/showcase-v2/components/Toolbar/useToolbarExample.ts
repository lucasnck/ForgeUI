"use client";
import { useState, useId } from "react";
import type { ToolbarProps } from "@forge-ui/web";
import { items } from "../Toolbar/fixtures";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useToolbarExample() {
  const id = useId();
  const binding =
    useExampleProperties<Pick<ToolbarProps, "label" | "orientation" | "direction" | "title">>(
      "Toolbar",
    );
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [calls, setCalls] = useState(0);
  const [disableSecond, setDisableSecond] = useState(false);

  function action(itemKey: string) {
    setLastAction(itemKey);
    setCalls((n) => n + 1);
  }

  useExamplePropertySnapshot("Toolbar", {
    label: "Label",
    orientation: "horizontal",
    direction: "ltr",
    title: undefined,
  });
  const renderItems = items.map((item) => ({
    ...item,
    disabled: disableSecond && item.index === 2,
    onClick: () => action(item.id),
  }));

  return {
    renderItems,
    disableSecond,
    setDisableSecond,
    id,
    properties: binding.properties,
    lastAction,
    calls,
    action,
  };
}
