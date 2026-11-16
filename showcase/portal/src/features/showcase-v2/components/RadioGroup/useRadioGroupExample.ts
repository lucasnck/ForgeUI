"use client";
import { useState, useId } from "react";
import type { RadioGroupProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useRadioGroupExample() {
  const id = useId();
  const binding =
    useExampleProperties<
      Pick<
        RadioGroupProps,
        "name" | "legend" | "disabled" | "invalid" | "gap" | "padding" | "title" | "value"
      >
    >("RadioGroup");
  const [selected, setSelected] = useState("item-1");
  const [calls, setCalls] = useState(0);
  const [requested, setRequested] = useState<string | null>(null);
  const [reject, setReject] = useState(false);

  function change(next: string) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) binding.bindChange("value", setSelected)(next);
  }

  useExamplePropertySnapshot("RadioGroup", {
    name: "Name",
    value: selected,
    disabled: false,
    invalid: false,
    gap: "2",
    legend: undefined,
    title: "Title",
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
