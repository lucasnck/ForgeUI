"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldPostalCodeInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldPostalCodeInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldPostalCodeInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { PostalCodeInput } from "../../../molecules/PostalCodeInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldPostalCodeInput } from "./useFormFieldPostalCodeInput";

export function FormFieldPostalCodeInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldPostalCodeInputProps<TValues, TName>) {
  const view = useFormFieldPostalCodeInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <PostalCodeInput
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
