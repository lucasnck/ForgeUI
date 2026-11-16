"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldPercentageInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldPercentageInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldPercentageInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { PercentageInput } from "../../../molecules/PercentageInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldPercentageInput } from "./useFormFieldPercentageInput";

export function FormFieldPercentageInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldPercentageInputProps<TValues, TName>) {
  const view = useFormFieldPercentageInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <PercentageInput
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
