"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldComboboxControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldComboboxProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string | null> = FieldPathByValue<TValues, string | null>,
>
  extends FormFieldComboboxControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { FormField } from "../../../molecules/FormField";
import { Combobox } from "../../../molecules/Combobox";
import { ComboboxBody } from "../../../molecules/ComboboxBody";
import { useFormFieldCombobox } from "./useFormFieldCombobox";

export function FormFieldCombobox<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string | null> = FieldPathByValue<TValues, string | null>,
>(props: FormFieldComboboxProps<TValues, TName>) {
  const view = useFormFieldCombobox(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Combobox
        {...view.inputProps}
        {...view.binding}
        id={view.controlId}
        disabled={view.disabled}
        invalid={view.invalid}
        aria-required={view.required || undefined}
      >
        <ComboboxBody />
      </Combobox>
    </FormField>
  );
}
