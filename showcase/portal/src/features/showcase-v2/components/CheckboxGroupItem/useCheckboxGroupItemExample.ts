"use client";
import { useState, useId } from "react";
import type { CheckboxGroupItemProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useCheckboxGroupItemExample() {
  const id = useId();
  const binding =
    useExampleProperties<Pick<CheckboxGroupItemProps, "label" | "disabled" | "title">>(
      "CheckboxGroupItem",
    );
  const [selected, setSelected] = useState<readonly string[]>(["item-1"]);
  const [calls, setCalls] = useState(0);

  function change(next: readonly string[]) {
    setSelected(next);
    setCalls((n) => n + 1);
  }

  useExamplePropertySnapshot("CheckboxGroupItem", {
    label: "Label",
    title: "Title",
    disabled: false,
  });
  return { id, properties: binding.properties, selected, calls, change };
}
