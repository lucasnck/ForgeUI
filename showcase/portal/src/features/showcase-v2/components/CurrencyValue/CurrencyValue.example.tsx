"use client";
import { useExamplePropertySnapshot as useCurrencyValueExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseCurrencyValueProps } from "react";
import { useExampleProperties as useCurrencyValueExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, CurrencyValue } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";

import { useCurrencyValueExample } from "./useCurrencyValueExample";

export function CurrencyValueExample() {
  const { properties: currencyValueProperties } = useCurrencyValuePropertyBindings();

  const view = useCurrencyValueExample();
  const {
    currency: viewCurrency,
    setCurrency: viewSetCurrency,
    locale: viewLocale,
    setLocale: viewSetLocale,
    empty: viewEmpty,
    setEmpty: viewSetEmpty,
  } = view;
  useCurrencyValuePropertySnapshot({
    value: viewEmpty ? null : "1234.56",
    currency: viewCurrency,
    locale: viewLocale,
    emptyLabel: "EmptyLabel",
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="currency"
          value={viewCurrency}
          options={["BRL", "USD"]}
          onChange={viewSetCurrency}
        />
        <SelectControl
          label="locale"
          value={viewLocale}
          options={["pt-BR", "en"]}
          onChange={viewSetLocale}
        />
        <ToggleControl label="value=null" checked={viewEmpty} onChange={viewSetEmpty} />
      </ExampleControls>
      <CurrencyValue
        value={viewEmpty ? null : "1234.56"}
        currency={viewCurrency}
        locale={viewLocale}
        emptyLabel="EmptyLabel"
        {...currencyValueProperties}
      />
    </Stack>
  );
}

function useCurrencyValuePropertyBindings() {
  return useCurrencyValueExampleProperties<
    Pick<
      ShowcaseCurrencyValueProps<typeof CurrencyValue>,
      | "size"
      | "tone"
      | "weight"
      | "currency"
      | "locale"
      | "currencyDisplay"
      | "useGrouping"
      | "value"
      | "emptyLabel"
      | "title"
    >
  >("CurrencyValue");
}

function useCurrencyValuePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useCurrencyValueExamplePropertySnapshot("CurrencyValue", values);
}
