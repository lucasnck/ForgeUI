"use client";
import { useId, useState } from "react";
import { type PostalCodeInputProps, applyMask, unmask } from "@forge-ui/web";
import {
  useExampleProperties,
  useExamplePropertySnapshot,
  useRegisteredControl,
} from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { initialValue, mask, helperRows } from "./fixtures";

export function usePostalCodeInputExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding =
    useExampleProperties<
      Pick<
        PostalCodeInputProps,
        | "value"
        | "mask"
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
      >
    >("PostalCodeInput");
  const [value, setValue] = useState<string>(initialValue);
  const [calls, setCalls] = useState(0);
  const [clearCalls, setClearCalls] = useState(0);

  function change(next: PostalCodeInputProps["value"]) {
    binding.bindChange("value", setValue)(next);
    setCalls((count) => count + 1);
  }

  function clear() {
    binding.bindChange("value", setValue)("");
    setClearCalls((count) => count + 1);
  }

  function changeMask(next: string | boolean) {
    if (typeof next !== "string" || !next) return;
    const raw = unmask(binding.properties.value ?? value, next);
    binding.bindChange("value", setValue)(raw);
  }

  useRegisteredControl(
    { label: "mask", kind: "select", value: binding.properties.mask ?? mask },
    changeMask,
  );
  useExamplePropertySnapshot("PostalCodeInput", {
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
      mask: mask,
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
    mask,
    state: {
      value: binding.properties.value ?? value,
      display: applyMask(
        String(binding.properties.value ?? value),
        binding.properties.mask ?? mask,
      ),
      calls,
      clearCalls,
    },
    helperRows: helperRows(),
  };
}
