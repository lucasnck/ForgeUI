"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldPasswordPresentationProps,
  NativeFormFieldPasswordProps,
  FormFieldRegistrationProps,
  VisualProps,
  ComponentFullWidthProps,
} from "../../../../types";

import { PasswordInput } from "../../../molecules/PasswordInput";
import { FormField } from "../../../molecules/FormField";
import { useFormFieldPasswordInput } from "./useFormFieldPasswordInput";
export interface FormFieldPasswordInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends
    NativeFormFieldPasswordProps,
    FormFieldRegistrationProps<TValues, TName>,
    VisualProps,
    ComponentFullWidthProps,
    FormFieldPasswordPresentationProps {}

export function FormFieldPasswordInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldPasswordInputProps<TValues, TName>) {
  const view = useFormFieldPasswordInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <PasswordInput
        {...view.inputProps}
        {...view.registration}
        id={view.controlId}
        disabled={view.disabled}
        invalid={Boolean(view.message)}
        aria-required={view.required || undefined}
      ></PasswordInput>
    </FormField>
  );
}
