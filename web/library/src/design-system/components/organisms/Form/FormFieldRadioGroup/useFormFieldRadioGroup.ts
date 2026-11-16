"use client";
import { useId } from "react";
import type { ChangeEvent } from "react";
import { useFormContext, useController } from "react-hook-form";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldRadioGroupProps } from "./FormFieldRadioGroup";

export function useFormFieldRadioGroup<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldRadioGroupProps<TValues, TName>) {
  const generatedId = useId();
  const methods = useFormContext<TValues>();
  if (!methods) throw new Error("FormFieldRadioGroup requires FormProvider.");
  const { field, fieldState } = useController({
    control: methods.control,
    name: props.name,
    disabled: props.disabled,
  });
  const value: unknown = field.value;
  if (typeof value !== "string") throw new Error("Radio groups require string defaults.");
  const controlId = props.id ?? generatedId;
  const message =
    props.error ??
    (typeof fieldState.error?.message === "string" ? fieldState.error.message : undefined);
  const describedBy =
    [props.hint ? controlId + "-hint" : null, message ? controlId + "-error" : null]
      .filter(Boolean)
      .join(" ") || undefined;

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (props.readOnly) {
      event.preventDefault();
      return;
    }

    field.onChange(event.currentTarget.value);
  }

  return {
    controlId,
    message,
    describedBy,
    field,
    value,
    change,
    firstEnabled: props.options.findIndex((option) => !option.disabled),
  };
}
