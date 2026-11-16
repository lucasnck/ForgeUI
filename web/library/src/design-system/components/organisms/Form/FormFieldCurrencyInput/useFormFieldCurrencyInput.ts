"use client";
import { useId, useEffect, useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { MonetaryValue, MoneyInputResult } from "../../../../types/money";

import type { FormFieldCurrencyInputProps } from "./FormFieldCurrencyInput";

export function useFormFieldCurrencyInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, MonetaryValue> = FieldPathByValue<TValues, MonetaryValue>,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  onInputStateChange,
  ...inputProps
}: FormFieldCurrencyInputProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldCurrencyInput requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const invalid = Boolean(fieldState.error) || Boolean(displayedError);

  if (value !== null && typeof value !== "string")
    throw new Error("Currency fields require MonetaryValue defaults.");
  const [resetKey, setResetKey] = useState(0);
  const subscribe = methods.subscribe;
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: (state) => {
          if (!state.name) setResetKey((key) => key + 1);
        },
      }),
    [subscribe],
  );

  function inputStateChange(state: MoneyInputResult) {
    if (state.kind === "valid" || state.kind === "empty") {
      if (methods.getFieldState(name).error?.type === "draft") methods.clearErrors(name);
    }

    onInputStateChange?.(state);
  }

  return {
    controlId,
    label,
    hint,
    message,
    invalid,
    required,
    disabled,
    inputProps,
    resetKey,
    binding: {
      name: field.name,
      ref: field.ref,
      value,
      onValueChange: field.onChange,
      onBlur: field.onBlur,
      onInputStateChange: inputStateChange,
      "data-form-draft": field.name,
    },
  };
}
