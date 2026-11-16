"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldSearchInputControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldSearchInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldSearchInputControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { SearchInput } from "../../../molecules/SearchInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldSearchInput } from "./useFormFieldSearchInput";

export function FormFieldSearchInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldSearchInputProps<TValues, TName>) {
  const view = useFormFieldSearchInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <SearchInput
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
