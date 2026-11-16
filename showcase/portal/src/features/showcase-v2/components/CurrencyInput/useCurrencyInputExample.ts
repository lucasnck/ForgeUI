"use client";
import { useId, useState } from "react";
import { type CurrencyInputProps, validators, type MoneyInputResult } from "@forge-ui/web";
import {
  useExampleProperties,
  useExamplePropertySnapshot,
  useRegisteredControl,
} from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { initialValue, helperRows } from "./fixtures";

export function useCurrencyInputExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding =
    useExampleProperties<
      Pick<
        CurrencyInputProps,
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
        | "currency"
        | "locale"
        | "allowNegative"
        | "invalidMessage"
        | "animated"
      >
    >("CurrencyInput");
  const [value, setValue] = useState<CurrencyInputProps["value"]>(initialValue);
  const [calls, setCalls] = useState(0);
  const [clearCalls, setClearCalls] = useState(0);
  const [valueDraft, setValueDraft] = useState(initialValue);
  const [inputState, setInputState] = useState<MoneyInputResult>({
    kind: "valid",
    value: initialValue,
  });

  function editValue(next: string | boolean) {
    const draft = String(next);
    setValueDraft(draft);
    if (
      draft === "" ||
      validators.money(draft, {
        currency: binding.properties.currency ?? "BRL",
        locale: binding.properties.locale ?? "pt-BR",
      })
    )
      setValue(draft === "" ? null : draft);
  }

  useRegisteredControl({ label: "value", kind: "text", value: valueDraft }, editValue);

  function change(next: CurrencyInputProps["value"]) {
    setValue(next);
    setValueDraft(next ?? "");
    setCalls((count) => count + 1);
  }

  function clear() {
    change(null);
    setClearCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("CurrencyInput", {
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
      currency: "BRL",
      locale: "pt-BR",
      allowNegative: true,
      invalidMessage: "InvalidMessage",
      animated: true,
    },
    value: valueDraft,
  });
  return {
    id,
    copy,
    properties: binding.properties,
    value: value,
    change,
    clear,
    setInputState,
    state: { value, valueDraft, lastInputState: inputState, calls, clearCalls },
    helperRows: helperRows(
      binding.properties.currency ?? "BRL",
      binding.properties.locale ?? "pt-BR",
    ),
  };
}
