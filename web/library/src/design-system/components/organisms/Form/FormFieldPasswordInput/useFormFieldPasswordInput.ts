"use client";
import { useId } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldPasswordInputProps } from "./FormFieldPasswordInput";

export function useFormFieldPasswordInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  disabled,
  required,
  ...inputProps
}: FormFieldPasswordInputProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldPasswordInput requires FormProvider.");
  const state = useFormState({ control: methods.control, name, exact: true });
  const { error } = methods.getFieldState(name, state);
  const message =
    displayedError ?? (typeof error?.message === "string" ? error.message : undefined);

  return {
    controlId: id ?? generatedId,
    label,
    hint,
    message,
    disabled: disabled || methods.formState.disabled,
    required,
    inputProps,
    registration: methods.register(name, { disabled: disabled || methods.formState.disabled }),
  };
}
