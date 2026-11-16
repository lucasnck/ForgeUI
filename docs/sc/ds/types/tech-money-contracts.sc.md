---
title: "Money contracts"
scope: "Exact decimal monetary values, explicit currency and locale, and monetary input parse states"
status: "DONE"
type: "type"
ds-level: "none"
---

# Money contracts

## Files

```text
design-system/types/money.ts (C)
design-system/types/index.ts (M)
design-system/index.ts (M)
../scripts/check-money.cjs (C)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Native control contracts](tech-native-control-contracts.sc.md)

## Contract

```ts
import type { MonetaryValue, MoneyFormatOptions, MoneyInputResult } from "@forge-ui/web";
const amount: MonetaryValue = "1234.56";
const options: MoneyFormatOptions = {currency: "BRL", locale: "pt-BR"};
```

## Content

```ts
import type { Locale } from "@/lib/contracts/preferences";
import type { HTMLAttributes, RefAttributes } from "react";
import type { ComponentTextSizeProps, ComponentTextToneProps, ComponentFontWeightProps, TextElement } from "./typography";
import type { NativeInputProps } from "./native-control-contracts";

export type MonetaryValue = string | null;
export type CurrencyCode = string;
export type CurrencyDisplay = NonNullable<Intl.NumberFormatOptions["currencyDisplay"]>;
export interface MoneyFormatOptions {
  currency: CurrencyCode;
  locale: Locale;
  currencyDisplay?: CurrencyDisplay;
  useGrouping?: boolean;
}
export type MoneyInputResult =
  | {kind: "empty"; value: null}
  | {kind: "valid"; value: string}
  | {kind: "incomplete"; text: string}
  | {kind: "invalid"; text: string; reason: "syntax" | "precision" | "negative"};
export interface NativeCurrencyInputProps extends Omit<NativeInputProps,
  "type" | "children" | "inputMode" | "value" | "defaultValue" | "onChange" |
  "min" | "max" | "step" | "pattern" | "maxLength" | "list"> {}
export interface NativeCurrencyValueProps extends Omit<HTMLAttributes<HTMLElement>, "children">,
  RefAttributes<HTMLElement>, ComponentTextSizeProps, ComponentTextToneProps, ComponentFontWeightProps {
  as?: TextElement;
}
```

## Tests

- V2 Consumer snippets for CurrencyInput, CurrencyValue retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile explicit BRL/USD/EUR/JPY/KWD options under every supported Locale.
- Reject number/NaN amounts and competing native value/defaultValue/onChange/type/min/max/step channels.
- Narrow parse outcomes before reading value; incomplete/invalid outcomes must not masquerade as empty.

## Criteria

- [x] MonetaryValue is a major-unit exact decimal string or null; null means absent and "0" means zero. JSON and form adapters never require BigInt serialization or floating-point coercion.
- [x] Canonical non-null values match `^-?(0|[1-9][0-9]*)(\.[0-9]+)?$`: dot decimal, no grouping, exponent, currency symbol, whitespace, NaN or Infinity. Negative zero is normalized to positive zero.
- [x] Currency uses an explicit uppercase three-letter ISO 4217 code supplied by the caller. Runtime validates code shape; Intl acceptance alone does not certify that a code is an assigned ISO currency. No fixed BRL/USD/EUR-only union or locale-to-currency inference exists.
- [x] Intl currency minor-unit precision is authoritative: BRL/USD/EUR have two digits, JPY zero and KWD three. This increment does not define cryptocurrency scales, exchange rates, taxes or business rounding policies.
- [x] Both components share this owner. NativeCurrencyInputProps adapts native conflicts here; supported refs, id/name/form, disabled/readOnly/required and accessible relationships remain available.
- [x] Delivered money contracts are exported by their shared owner; existing DONE native-control resources retain their delivered status.

- [x] V2 typed usage fixtures cover CurrencyInput, CurrencyValue: Exact decimal money, supported currencies and locale-independent business values. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. Pending status covers these consumer checks only; existing exports remain available.
