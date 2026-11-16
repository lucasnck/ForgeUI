"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type { FormFieldSliderControlProps, FormFieldRegistrationProps } from "../../../../types";

export interface FormFieldSliderProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, number> = FieldPathByValue<TValues, number>,
>
  extends FormFieldSliderControlProps, FormFieldRegistrationProps<TValues, TName> {}

import { Slider } from "../../../molecules/Slider";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldSlider } from "./useFormFieldSlider";

export function FormFieldSlider<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, number> = FieldPathByValue<TValues, number>,
>(props: FormFieldSliderProps<TValues, TName>) {
  const view = useFormFieldSlider(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <Slider
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
