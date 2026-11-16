"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldDateInputControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldDateInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldDateInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { DateInput } from "../../../molecules/DateInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldDateInput } from "./useFormFieldDateInput";

export function FormFieldDateInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldDateInputProps<TValues, TName>) {
  const view = useFormFieldDateInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <DateInput
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
