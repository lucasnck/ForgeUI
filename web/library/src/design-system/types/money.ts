import type { Locale } from "../../support/contracts/preferences";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentTextSizeProps,
  ComponentTextToneProps,
  ComponentFontWeightProps,
  TextElement,
} from "./typography";
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
  | { kind: "empty"; value: null }
  | { kind: "valid"; value: string }
  | { kind: "incomplete"; text: string }
  | { kind: "invalid"; text: string; reason: "syntax" | "precision" | "negative" };
export interface NativeCurrencyInputProps extends Omit<
  NativeInputProps,
  | "type"
  | "children"
  | "inputMode"
  | "value"
  | "defaultValue"
  | "onChange"
  | "min"
  | "max"
  | "step"
  | "pattern"
  | "maxLength"
  | "list"
> {}
export interface NativeCurrencyValueProps
  extends
    Omit<HTMLAttributes<HTMLElement>, "children">,
    RefAttributes<HTMLElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {
  as?: TextElement;
}
