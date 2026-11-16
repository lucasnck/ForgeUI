"use client";
import { useId } from "react";

import { useFormContext, useFormState } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldNumberInputProps } from "./FormFieldNumberInput";

export function useFormFieldNumberInput<
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
}: FormFieldNumberInputProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldNumberInput requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const state = useFormState({ control: methods.control, name, exact: true });
  const { error } = methods.getFieldState(name, state);
  const registration = methods.register(name, { disabled });
  const defaultValue: unknown = methods.getValues(name);
  if (typeof defaultValue !== "string")
    throw new Error("Native text fields require string defaults.");
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
    binding: { ...registration, defaultValue },
  };
}
