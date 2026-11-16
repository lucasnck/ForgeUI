"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldCurrencyInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";
import type { MonetaryValue } from "../../../../types/money";

export interface FormFieldCurrencyInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, MonetaryValue> = FieldPathByValue<TValues, MonetaryValue>,
>
  extends FormFieldCurrencyInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { FormField } from "../../../molecules/FormField";
import { CurrencyInput } from "../../../molecules/CurrencyInput";
import { useFormFieldCurrencyInput } from "./useFormFieldCurrencyInput";

export function FormFieldCurrencyInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, MonetaryValue> = FieldPathByValue<TValues, MonetaryValue>,
>(props: FormFieldCurrencyInputProps<TValues, TName>) {
  const view = useFormFieldCurrencyInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <CurrencyInput
        key={view.resetKey}
        {...view.inputProps}
        {...view.binding}
        id={view.controlId}
        disabled={view.disabled}
        invalid={view.invalid}
        aria-required={view.required || undefined}
      />
    </FormField>
  );
}
