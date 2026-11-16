"use client";
import { useId, useState } from "react";
import { type InternationalTelephoneInputProps, type PhoneParseResult } from "@forge-ui/web";
import {
  useExampleProperties,
  useExamplePropertySnapshot,
  useRegisteredControl,
} from "../ExampleScope/useExampleScope";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import { initialValue, countries, helperRows } from "./fixtures";

export function useInternationalTelephoneInputExample() {
  const id = useId();
  const { copy } = useShowcaseV2Copy();
  const binding = useExampleProperties<
    Pick<
      InternationalTelephoneInputProps,
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
      | "locale"
      | "countryLabel"
      | "internationalLabel"
      | "invalidMessage"
    >
  >("InternationalTelephoneInput");
  const [value, setValue] = useState<InternationalTelephoneInputProps["value"]>(initialValue);
  const [calls, setCalls] = useState(0);
  const [clearCalls, setClearCalls] = useState(0);
  const [fixedCountry, setFixedCountry] = useState<string | undefined>();
  const [inputState, setInputState] = useState<PhoneParseResult>({
    kind: "possible",
    number: initialValue.number!,
    country: initialValue.country,
  });

  function changeFixedCountry(next: string | boolean) {
    const country = String(next) || undefined;
    setFixedCountry(country);
    setValue({ number: null, country: country ?? "BR" });
    setInputState({ kind: "empty" });
  }

  useRegisteredControl(
    {
      label: "fixedCountry",
      kind: "select",
      value: fixedCountry ?? "",
      options: ["", "BR", "US", "PT"],
    },
    changeFixedCountry,
  );

  function change(next: InternationalTelephoneInputProps["value"]) {
    setValue(next);
    setCalls((count) => count + 1);
  }

  function clear() {
    change({ number: null, country: fixedCountry ?? value.country });
    setClearCalls((count) => count + 1);
  }

  useExamplePropertySnapshot("InternationalTelephoneInput", {
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
      locale: "pt-BR",
      countryLabel: "CountryLabel",
      internationalLabel: "InternationalLabel",
      invalidMessage: "InvalidMessage",
    },
    fixedCountry,
  });
  return {
    id,
    copy,
    properties: binding.properties,
    value: value,
    change,
    clear,
    countries,
    fixedCountry,
    setInputState,
    state: {
      value,
      lastInputState: inputState,
      fixedCountry,
      calls,
      clearCalls,
    },
    helperRows: helperRows(),
  };
}
