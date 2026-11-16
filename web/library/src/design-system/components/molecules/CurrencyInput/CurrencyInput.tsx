"use client";

import { Input } from "../../atoms/Input";
import { InputGroup } from "../InputGroup";
import { InputAddon } from "../InputAddon";
import type {
  NativeCurrencyInputProps,
  MonetaryValue,
  MoneyInputResult,
  CurrencyCode,
} from "../../../types/money";
import type { Locale } from "../../../../support/contracts/preferences";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { useCurrencyInput } from "./useCurrencyInput";

export interface CurrencyInputProps
  extends
    NativeCurrencyInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps,
    ComponentAnimatedProps {
  value: MonetaryValue;
  onValueChange(value: MonetaryValue): void;
  currency: CurrencyCode;
  locale: Locale;
  allowNegative?: boolean;
  invalidMessage: string;
  onInputStateChange?(state: MoneyInputResult): void;
}

export function CurrencyInput(props: CurrencyInputProps) {
  const view = useCurrencyInput(props);

  return (
    <InputGroup fullWidth={props.fullWidth} leading={<InputAddon>{props.currency}</InputAddon>}>
      <Input {...view.inputProps} />
      <input
        type="hidden"
        name={props.name}
        form={props.form}
        value={view.canonicalValue ?? ""}
        disabled={props.disabled}
      />
    </InputGroup>
  );
}
