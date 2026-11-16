"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldColorInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldColorInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldColorInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { ColorInput } from "../../../molecules/ColorInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldColorInput } from "./useFormFieldColorInput";

export function FormFieldColorInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldColorInputProps<TValues, TName>) {
  const view = useFormFieldColorInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <ColorInput
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
