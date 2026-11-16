"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldSwitchControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldSwitchProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, boolean> = FieldPathByValue<TValues, boolean>,
>
  extends FormFieldSwitchControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { Switch } from "../../../atoms/Switch";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldSwitch } from "./useFormFieldSwitch";

export function FormFieldSwitch<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, boolean> = FieldPathByValue<TValues, boolean>,
>(props: FormFieldSwitchProps<TValues, TName>) {
  const view = useFormFieldSwitch(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Switch
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
