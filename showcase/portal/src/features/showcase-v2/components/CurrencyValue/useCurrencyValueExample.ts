"use client";
import type { CurrencyValueProps } from "@forge-ui/web";
import { useState } from "react";

export function useCurrencyValueExample() {
  const [currency, setCurrency] = useState("BRL");
  const [locale, setLocale] = useState<NonNullable<CurrencyValueProps["locale"]>>("pt-BR");
  const [empty, setEmpty] = useState(false);

  function changeLocale(v: string) {
    setLocale(v as NonNullable<CurrencyValueProps["locale"]>);
  }

  return {
    currency,
    setCurrency,
    locale,
    setLocale: changeLocale,
    empty,
    setEmpty,
  };
}
