"use client";
import { useState } from "react";
import { type ThemeSelectorProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { initialValue, options } from "./fixtures";

export function useThemeSelectorExample() {
  const binding =
    useExampleProperties<Pick<ThemeSelectorProps, "value" | "label" | "size" | "disabled">>(
      "ThemeSelector",
    );
  const [value, setValue] = useState<ThemeSelectorProps["value"]>(initialValue);
  const [calls, setCalls] = useState(0);

  function change(next: ThemeSelectorProps["value"]) {
    binding.bindChange("value", setValue)(next);
    setCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("ThemeSelector", {
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
