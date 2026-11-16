"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldTokenInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldTokenInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldTokenInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { TokenInput } from "../../../molecules/TokenInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldTokenInput } from "./useFormFieldTokenInput";

export function FormFieldTokenInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldTokenInputProps<TValues, TName>) {
  const view = useFormFieldTokenInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <TokenInput
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
