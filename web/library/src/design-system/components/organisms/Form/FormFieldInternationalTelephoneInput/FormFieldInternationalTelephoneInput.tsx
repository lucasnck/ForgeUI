"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldTelephonePresentationProps,
  NativeFormFieldTelephoneProps,
  FormFieldRegistrationProps,
  VisualProps,
  ComponentFullWidthProps,
  PhoneInputValue,
} from "../../../../types";

import { InternationalTelephoneInput } from "../../../molecules/InternationalTelephoneInput";
import { FormField } from "../../../molecules/FormField";
import { useFormFieldInternationalTelephoneInput } from "./useFormFieldInternationalTelephoneInput";
export interface FormFieldInternationalTelephoneInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, PhoneInputValue> = FieldPathByValue<
    TValues,
    PhoneInputValue
  >,
>
  extends
    NativeFormFieldTelephoneProps,
    FormFieldRegistrationProps<TValues, TName>,
    VisualProps,
    ComponentFullWidthProps,
    FormFieldTelephonePresentationProps {}

export function FormFieldInternationalTelephoneInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, PhoneInputValue> = FieldPathByValue<
    TValues,
    PhoneInputValue
  >,
>(props: FormFieldInternationalTelephoneInputProps<TValues, TName>) {
  const {
    resetKey,
    invalid,
    controlId,
    label,
    hint,
    message,
    inputProps,
    fieldName,
    inputRef,
    onBlur,
    value,
    onChange,
    disabled,
    required,
  } = useFormFieldInternationalTelephoneInput(props);

  return (
    <FormField controlId={controlId} label={label} hint={hint} error={message}>
      <InternationalTelephoneInput
        key={resetKey}
        data-form-draft={fieldName}
        {...inputProps}
        name={fieldName}
        ref={inputRef}
        id={controlId}
        onBlur={onBlur}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        invalid={invalid}
        aria-required={required || undefined}
      />
    </FormField>
  );
}
