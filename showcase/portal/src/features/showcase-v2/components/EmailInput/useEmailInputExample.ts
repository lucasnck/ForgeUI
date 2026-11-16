"use client";
import { useId, useState } from "react";
import { type EmailInputProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { initialValue, providers } from "./fixtures";

export function useEmailInputExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding =
    useExampleProperties<
      Pick<
        EmailInputProps,
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
        | "maxSuggestions"
        | "listboxLabel"
      >
    >("EmailInput");
  const [value, setValue] = useState<string>(initialValue);
  const [calls, setCalls] = useState(0);
  const [clearCalls, setClearCalls] = useState(0);

  function change(next: EmailInputProps["value"]) {
    binding.bindChange("value", setValue)(next);
    setCalls((count) => count + 1);
  }

  function clear() {
    binding.bindChange("value", setValue)("");
    setClearCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("EmailInput", {
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
      maxSuggestions: 4,
      listboxLabel: "ListboxLabel",
    },
    value: binding.properties.value ?? value,
  });
  return {
    id,
    copy,
    properties: binding.properties,
    value: binding.properties.value ?? value,
    change,
    clear,
    providers,
    state: {
      value: binding.properties.value ?? value,
      display: binding.properties.value ?? value,
      calls,
      clearCalls,
    },
  };
}
