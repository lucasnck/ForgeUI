"use client";
import { useEffect, useId, useState } from "react";

import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { PhoneInputValue } from "../../../../types";
import type { FormFieldInternationalTelephoneInputProps } from "./FormFieldInternationalTelephoneInput";

export function useFormFieldInternationalTelephoneInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, PhoneInputValue> = FieldPathByValue<
    TValues,
    PhoneInputValue
  >,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  disabled,
  required,
  ...inputProps
}: FormFieldInternationalTelephoneInputProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldInternationalTelephoneInput requires FormProvider.");
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
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  if (
    value === null ||
    typeof value !== "object" ||
    !("number" in value) ||
    !("country" in value) ||
    !(value.number === null || typeof value.number === "string") ||
    !(value.country === null || typeof value.country === "string")
  )
    throw new Error("Telephone fields require canonical phone values.");
  const canonical: PhoneInputValue = { number: value.number, country: value.country };
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);

  return {
    resetKey,
    invalid: Boolean(fieldState.error) || Boolean(displayedError),
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
    value: canonical,
  };
}
