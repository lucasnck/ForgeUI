"use client";

import { useId } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import type { FormFieldInputProps } from "./FormFieldInput";

export function useFormFieldInput<
  TValues extends FieldValues,
  TName extends FieldPath<TValues> = FieldPath<TValues>,
>({
  id,
  name,
  disabled,
  label,
  hint,
  required = false,
  inputType = "text",
  error: displayedError,
  ...inputProps
}: FormFieldInputProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldInput requires FormProvider.");
  const state = useFormState({ control: methods.control, name, exact: true });
  const { error } = methods.getFieldState(name, state);
  const message =
    displayedError ?? (typeof error?.message === "string" ? error.message : undefined);
  const registration = methods.register(name, { disabled: disabled || methods.formState.disabled });

  return {
    inputType,
    controlId,
    label,
    hint,
    required,
    disabled: disabled || methods.formState.disabled,
    inputProps,
    registration,
    error,
    message,
  };
}
