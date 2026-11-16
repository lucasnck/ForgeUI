"use client";
import { useState, useId } from "react";
import type { CheckboxGroupProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useCheckboxGroupExample() {
  const id = useId();
  const binding =
    useExampleProperties<
      Pick<
        CheckboxGroupProps,
        "name" | "legend" | "disabled" | "invalid" | "gap" | "padding" | "title"
      >
    >("CheckboxGroup");
  const [selected, setSelected] = useState<readonly string[]>(["item-1"]);
  const [calls, setCalls] = useState(0);

  function change(next: readonly string[]) {
    setSelected(next);
    setCalls((n) => n + 1);
  }

  useExamplePropertySnapshot("CheckboxGroup", {
    name: "Name",
    disabled: false,
    invalid: false,
    gap: "2",
    legend: undefined,
    title: "Title",
  });
  return { id, properties: binding.properties, selected, calls, change };
}
