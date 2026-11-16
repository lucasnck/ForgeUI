"use client";
import { useId } from "react";

import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldTokenInputProps } from "./FormFieldTokenInput";

export function useFormFieldTokenInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  ...inputProps
}: FormFieldTokenInputProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldTokenInput requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (typeof value !== "string") throw new Error("FormFieldTokenInput requires string defaults.");
  const error = fieldState.error;
  const message =
    displayedError ?? (typeof error?.message === "string" ? error.message : undefined);

  return {
    controlId: id ?? generatedId,
    label,
    hint,
    required,
    disabled,
    message,
    invalid: Boolean(error) || Boolean(displayedError),
    inputProps,
    binding: {
      name: field.name,
      ref: field.ref,
      onBlur: field.onBlur,
      value,
      onValueChange: field.onChange,
    },
  };
}
