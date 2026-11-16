"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldTimeInputControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldTimeInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldTimeInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { TimeInput } from "../../../molecules/TimeInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldTimeInput } from "./useFormFieldTimeInput";

export function FormFieldTimeInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldTimeInputProps<TValues, TName>) {
  const view = useFormFieldTimeInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <TimeInput
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
