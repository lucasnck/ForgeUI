"use client";
import { useId } from "react";
import type { ChangeEvent } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FormFieldCheckboxProps } from "./FormFieldCheckbox";

export function useFormFieldCheckbox<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, boolean> = FieldPathByValue<TValues, boolean>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  disabled,
  required,
  ...inputProps
}: FormFieldCheckboxProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldCheckbox requires FormProvider.");
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (typeof value !== "boolean") throw new Error("Checkbox fields require boolean defaults.");
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (inputProps.readOnly) {
      event.preventDefault();
      return;
    }

    field.onChange(event.currentTarget.checked);
  }

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
    disabled: field.disabled,
    value: value,
    change,
  };
}
