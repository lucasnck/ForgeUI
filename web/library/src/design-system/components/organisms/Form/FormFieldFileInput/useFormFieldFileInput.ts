"use client";
import { useId, useCallback, useLayoutEffect, useRef } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FormFieldFileInputProps } from "./FormFieldFileInput";

export function useFormFieldFileInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly File[]> = FieldPathByValue<
    TValues,
    readonly File[]
  >,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  ...inputProps
}: FormFieldFileInputProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldFileInput requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  const fieldRef = field.ref;
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const invalid = Boolean(fieldState.error) || Boolean(displayedError);

  if (!Array.isArray(value)) throw new Error("File fields require array defaults.");
  const input = useRef<HTMLInputElement | null>(null);
  const setRef = useCallback(
    (node: HTMLInputElement | null) => {
      input.current = node;
      fieldRef(node);
    },
    [fieldRef],
  );
  useLayoutEffect(() => {
    const node = input.current;
    if (!node) return;

    if (value.length === 0) {
      node.value = "";
      return;
    }

    const selected = Array.from(node.files ?? []);
    if (value.length !== selected.length || value.some((file, index) => file !== selected[index]))
      throw new Error("File fields cannot restore a nonempty browser selection programmatically.");
  }, [value]);

  return {
    controlId,
    label,
    hint,
    message,
    invalid,
    required,
    disabled,
    inputProps,
    binding: { name: field.name, ref: setRef, onFilesChange: field.onChange, onBlur: field.onBlur },
  };
}
