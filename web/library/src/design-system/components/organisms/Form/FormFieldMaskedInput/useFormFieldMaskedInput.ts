"use client";
import { useId } from "react";

import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FormFieldMaskedInputProps } from "./FormFieldMaskedInput";

export function useFormFieldMaskedInput<
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
}: FormFieldMaskedInputProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldMaskedInput requires FormProvider.");
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (typeof value !== "string") throw new Error("Masked fields require string defaults.");
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);

  return {
    controlId: id ?? generatedId,
    label,
    hint,
    message,
    required,
    inputProps,
    fieldName: field.name,
    inputRef: field.ref,
    onBlur: field.onBlur,
    onChange: field.onChange,
    disabled: field.disabled,
    value: value,
  };
}
