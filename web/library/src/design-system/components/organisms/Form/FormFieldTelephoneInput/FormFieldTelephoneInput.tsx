"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldTelephoneInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldTelephoneInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldTelephoneInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { TelephoneInput } from "../../../molecules/TelephoneInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldTelephoneInput } from "./useFormFieldTelephoneInput";

export function FormFieldTelephoneInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldTelephoneInputProps<TValues, TName>) {
  const view = useFormFieldTelephoneInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <TelephoneInput
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
