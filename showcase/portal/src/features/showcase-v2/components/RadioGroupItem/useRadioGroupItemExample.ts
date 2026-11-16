"use client";
import { useState, useId } from "react";
import type { RadioGroupItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useRadioGroupItemExample() {
  const id = useId();
  const binding =
    useExampleProperties<Pick<RadioGroupItemProps, "label" | "disabled" | "title">>(
      "RadioGroupItem",
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

  useExamplePropertySnapshot("RadioGroupItem", {
    label: "Label",
    title: "Title",
    disabled: false,
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
