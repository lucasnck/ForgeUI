"use client";
import { useId, useState, type ChangeEvent } from "react";
import { type SearchInputProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { initialValue } from "./fixtures";

export function useSearchInputExample() {
  const id = useId();
  const binding =
    useExampleProperties<
      Pick<
        SearchInputProps,
        | "value"
        | "size"
        | "tone"
        | "appearance"
        | "shape"
        | "fullWidth"
        | "invalid"
        | "disabled"
        | "readOnly"
        | "required"
        | "placeholder"
        | "title"
        | "name"
        | "clearLabel"
      >
    >("SearchInput");
  const [value, setValue] = useState<string>(initialValue);
  const [calls, setCalls] = useState(0);
  const [nativeValidity, setNativeValidity] = useState<unknown>(null);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const next = event.currentTarget.value;
    setNativeValidity({
      valid: event.currentTarget.validity.valid,
    });
    binding.bindChange("value", setValue)(next);
    setCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("SearchInput", {
    ...{
      size: "md",
      disabled: false,
      tone: "neutral",
      appearance: "bordered",
      fullWidth: true,
      readOnly: false,
      required: false,
      placeholder: "Placeholder",
      title: "Title",
      name: "Name",
      clearLabel: "ClearLabel",
    },
    value: binding.properties.value ?? value,
  });
  return {
    id,
    properties: binding.properties,
    value: binding.properties.value ?? value,
    change,
    state: {
      value: binding.properties.value ?? value,
      calls,
      lastNativeValidity: nativeValidity,
    },
  };
}
