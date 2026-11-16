"use client";
import { useState } from "react";
import { type LocaleSelectorProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { initialValue, options } from "./fixtures";

export function useLocaleSelectorExample() {
  const binding =
    useExampleProperties<Pick<LocaleSelectorProps, "value" | "label" | "size" | "disabled">>(
      "LocaleSelector",
    );
  const [value, setValue] = useState<LocaleSelectorProps["value"]>(initialValue);
  const [calls, setCalls] = useState(0);

  function change(next: LocaleSelectorProps["value"]) {
    binding.bindChange("value", setValue)(next);
    setCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("LocaleSelector", {
    ...{ size: "md", disabled: false, label: "Label" },
    value: binding.properties.value ?? value,
  });
  return {
    properties: binding.properties,
    value: binding.properties.value ?? value,
    change,
    options,
    state: { value: binding.properties.value ?? value, calls },
  };
}
