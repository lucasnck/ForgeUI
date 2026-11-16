"use client";
import { useId } from "react";
import type { ChangeEvent } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldSelectProps } from "./FormFieldSelect";

export function useFormFieldSelect<
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
  options,
  readOnly,
  ...inputProps
}: FormFieldSelectProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldSelect requires FormProvider.");
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (typeof value !== "string") throw new Error("Select fields require string defaults.");

  function change(event: ChangeEvent<HTMLSelectElement>) {
    if (readOnly) {
      event.preventDefault();
      return;
    }

    field.onChange(event.currentTarget.value);
  }

  return {
    controlId: id ?? generatedId,
    label,
    hint,
    required,
    options,
    inputProps,
    fieldName: field.name,
    inputRef: field.ref,
    onBlur: field.onBlur,
    disabled: field.disabled,
    value,
    change,
    message:
      displayedError ??
      (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined),
  };
}
