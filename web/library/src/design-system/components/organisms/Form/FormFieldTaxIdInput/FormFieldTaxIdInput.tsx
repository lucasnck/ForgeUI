"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldTaxIdInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldTaxIdInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldTaxIdInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { TaxIdInput } from "../../../molecules/TaxIdInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldTaxIdInput } from "./useFormFieldTaxIdInput";

export function FormFieldTaxIdInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldTaxIdInputProps<TValues, TName>) {
  const view = useFormFieldTaxIdInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <TaxIdInput
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
