"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldUrlInputControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldUrlInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldUrlInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { UrlInput } from "../../../molecules/UrlInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldUrlInput } from "./useFormFieldUrlInput";

export function FormFieldUrlInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldUrlInputProps<TValues, TName>) {
  const view = useFormFieldUrlInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <UrlInput
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
