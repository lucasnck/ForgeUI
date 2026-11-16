"use client";
import { useId } from "react";
import type { ChangeEvent } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldSwitchProps } from "./FormFieldSwitch";

export function useFormFieldSwitch<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, boolean> = FieldPathByValue<TValues, boolean>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  ...inputProps
}: FormFieldSwitchProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldSwitch requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (typeof value !== "boolean") throw new Error("FormFieldSwitch requires boolean defaults.");
  const error = fieldState.error;
  const message =
    displayedError ?? (typeof error?.message === "string" ? error.message : undefined);

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (inputProps.readOnly || disabled || event.defaultPrevented) return;
    field.onChange(event.currentTarget.checked);
  }

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
      checked: value,
      onChange: change,
      "aria-readonly": inputProps.readOnly || undefined,
    },
  };
}
