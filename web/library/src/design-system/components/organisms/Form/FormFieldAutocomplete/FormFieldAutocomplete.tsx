"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldAutocompleteControlProps,
  FormFieldRegistrationProps,
} from "../../../../types";

export interface FormFieldAutocompleteProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends FormFieldAutocompleteControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { Autocomplete } from "../../../molecules/Autocomplete";
import { AutocompleteBody } from "../../../molecules/AutocompleteBody";
import { FormField } from "../../../molecules/FormField";
import { useFormFieldAutocomplete } from "./useFormFieldAutocomplete";

export function FormFieldAutocomplete<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldAutocompleteProps<TValues, TName>) {
  const view = useFormFieldAutocomplete(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Autocomplete
        {...view.inputProps}
        {...view.binding}
        id={view.controlId}
        disabled={view.disabled}
        invalid={view.invalid}
        aria-required={view.required || undefined}
      >
        <AutocompleteBody />
      </Autocomplete>
    </FormField>
  );
}
