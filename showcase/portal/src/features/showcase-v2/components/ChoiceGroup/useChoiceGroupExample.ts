"use client";
import { useState, useId } from "react";
import type { ChangeEvent } from "react";
import type { ChoiceGroupProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useChoiceGroupExample() {
  const id = useId();
  const binding =
    useExampleProperties<
      Pick<ChoiceGroupProps, "legend" | "disabled" | "invalid" | "gap" | "padding" | "title">
    >("ChoiceGroup");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [calls, setCalls] = useState(0);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setSelected((previous) =>
      checked ? [...previous, value] : previous.filter((item) => item !== value),
    );
    setCalls((n) => n + 1);
  }

  useExamplePropertySnapshot("ChoiceGroup", {
    disabled: false,
    invalid: false,
    gap: "2",
    legend: undefined,
    title: "Title",
  });
  return { id, properties: binding.properties, selected, calls, change };
}
