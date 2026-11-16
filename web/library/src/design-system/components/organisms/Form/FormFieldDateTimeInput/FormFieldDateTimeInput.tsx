"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldDateTimeInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldDateTimeInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldDateTimeInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { DateTimeInput } from "../../../molecules/DateTimeInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldDateTimeInput } from "./useFormFieldDateTimeInput";

export function FormFieldDateTimeInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldDateTimeInputProps<TValues, TName>) {
  const view = useFormFieldDateTimeInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <DateTimeInput
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
