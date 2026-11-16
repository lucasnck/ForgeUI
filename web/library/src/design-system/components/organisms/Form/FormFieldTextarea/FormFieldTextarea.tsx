"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldTextareaControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldTextareaProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldTextareaControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { Textarea } from "../../../atoms/Textarea";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldTextarea } from "./useFormFieldTextarea";

export function FormFieldTextarea<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldTextareaProps<TValues, TName>) {
  const view = useFormFieldTextarea(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Textarea
        {...view.inputProps}
        {...view.binding}
        id={view.controlId}
        disabled={view.disabled}
        invalid={view.invalid}
        aria-required={view.required || undefined}
      />
    </FormField>
  );
}
