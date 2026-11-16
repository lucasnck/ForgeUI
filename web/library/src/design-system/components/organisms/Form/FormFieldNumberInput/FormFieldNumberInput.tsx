"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldNumberInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldNumberInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldNumberInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { NumberInput } from "../../../molecules/NumberInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldNumberInput } from "./useFormFieldNumberInput";

export function FormFieldNumberInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldNumberInputProps<TValues, TName>) {
  const view = useFormFieldNumberInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <NumberInput
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
