"use client";
import { useId, useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";

import type { FocusEvent, MouseEvent } from "react";
import type { FormFieldCheckboxGroupProps } from "./FormFieldCheckboxGroup";

export function useFormFieldCheckboxGroup<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly string[]> = FieldPathByValue<
    TValues,
    readonly string[]
  >,
>({
  id,
  name,
  label,
  hint,
  error: displayedError,
  required,
  disabled: callerDisabled,
  options,
  readOnly,
  ...inputProps
}: FormFieldCheckboxGroupProps<TValues, TName>) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldCheckboxGroup requires FormProvider.");
  const disabled = callerDisabled || methods.formState.disabled;
  const { field, fieldState } = useController({ control: methods.control, name, disabled });
  const value: unknown = field.value;
  const fieldRef = field.ref;
  const message =
    displayedError ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const invalid = Boolean(fieldState.error) || Boolean(displayedError);

  if (!Array.isArray(value) || value.some((key) => typeof key !== "string"))
    throw new Error("Selection groups require string-array defaults.");
  const describedBy =
    [
      ...new Set(
        [
          ...(inputProps["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []),
          hint ? controlId + "-hint" : "",
          message ? controlId + "-error" : "",
        ].filter(Boolean),
      ),
    ].join(" ") || undefined;
  const rootRef = useCallback(
    (node: HTMLFieldSetElement | null) => {
      fieldRef(
        node
          ? {
              focus() {
                node.querySelector<HTMLElement>('input[type="checkbox"]:not(:disabled)')?.focus();
              },
            }
          : null,
      );
    },
    [fieldRef],
  );

  function blur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) field.onBlur();
  }

  function click(event: MouseEvent<HTMLFieldSetElement>) {
    inputProps.onClickCapture?.(event);
    if (readOnly) event.preventDefault();
  }

  function change(next: readonly string[]) {
    if (!readOnly && !disabled) field.onChange(next);
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
    options,
    readOnly,
    binding: {
      name: field.name,
      ref: rootRef,
      value,
      onValueChange: change,
      onBlur: blur,
      onClickCapture: click,
      "aria-describedby": describedBy,
    },
  };
}
