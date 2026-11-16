"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  NativeFormFieldEmailProps,
  FormFieldRegistrationProps,
  FormFieldEmailPresentationProps,
  VisualProps,
  ComponentFullWidthProps,
} from "../../../../types";
export interface FormFieldEmailInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends
    NativeFormFieldEmailProps,
    FormFieldRegistrationProps<TValues, TName>,
    FormFieldEmailPresentationProps,
    VisualProps,
    ComponentFullWidthProps {}
import { EmailInput } from "../../../molecules/EmailInput";

import { FormField } from "../../../molecules/FormField";
import { useFormFieldEmailInput } from "./useFormFieldEmailInput";

export function FormFieldEmailInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldEmailInputProps<TValues, TName>) {
  const view = useFormFieldEmailInput(props);

  return (
    <FormField controlId={view.controlId} label={view.label} hint={view.hint} error={view.message}>
      <EmailInput
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
