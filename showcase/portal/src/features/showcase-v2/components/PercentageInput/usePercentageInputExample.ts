"use client";
import { useId, useState, type ChangeEvent } from "react";
import { type PercentageInputProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { initialValue } from "./fixtures";

export function usePercentageInputExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding =
    useExampleProperties<
      Pick<
        PercentageInputProps,
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
        | "min"
        | "max"
        | "step"
      >
    >("PercentageInput");
  const [value, setValue] = useState<string>(initialValue);
  const [calls, setCalls] = useState(0);
  const [clearCalls, setClearCalls] = useState(0);
  const [nativeValidity, setNativeValidity] = useState<unknown>(null);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const next = event.currentTarget.value;
    setNativeValidity({
      valid: event.currentTarget.validity.valid,
      rangeUnderflow: event.currentTarget.validity.rangeUnderflow,
      rangeOverflow: event.currentTarget.validity.rangeOverflow,
      stepMismatch: event.currentTarget.validity.stepMismatch,
    });
    binding.bindChange("value", setValue)(next);
    setCalls((count) => count + 1);
  }

  function clear() {
    binding.bindChange("value", setValue)("");
    setClearCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("PercentageInput", {
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
      min: 0,
      max: 100,
      step: 1,
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
    state: {
      value: binding.properties.value ?? value,
      calls,
      clearCalls,
      lastNativeValidity: nativeValidity,
    },
  };
}
