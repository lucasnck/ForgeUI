"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldFileInputControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldFileInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly File[]> = FieldPathByValue<
    TValues,
    readonly File[]
  >,
>
  extends FormFieldFileInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { FormField } from "../../../molecules/FormField";
import { FileInput } from "../../../molecules/FileInput";
import { useFormFieldFileInput } from "./useFormFieldFileInput";

export function FormFieldFileInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, readonly File[]> = FieldPathByValue<
    TValues,
    readonly File[]
  >,
>(props: FormFieldFileInputProps<TValues, TName>) {
  const view = useFormFieldFileInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <FileInput
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
