"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  FormFieldMaskPresentationProps,
  NativeFormFieldMaskedProps,
  FormFieldRegistrationProps,
  VisualProps,
  ComponentFullWidthProps,
} from "../../../../types";

import { MaskedInput } from "../../../molecules/MaskedInput";
import { FormField } from "../../../molecules/FormField";
import { useFormFieldMaskedInput } from "./useFormFieldMaskedInput";
export interface FormFieldMaskedInputProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>
  extends
    NativeFormFieldMaskedProps,
    FormFieldRegistrationProps<TValues, TName>,
    VisualProps,
    ComponentFullWidthProps,
    FormFieldMaskPresentationProps {}

export function FormFieldMaskedInput<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, string> = FieldPathByValue<TValues, string>,
>(props: FormFieldMaskedInputProps<TValues, TName>) {
  const {
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
  } = useFormFieldMaskedInput(props);

  return (
    <FormField controlId={controlId} label={label} hint={hint} error={message}>
      <MaskedInput
        {...inputProps}
        name={fieldName}
        ref={inputRef}
        id={controlId}
        onBlur={onBlur}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        invalid={Boolean(message)}
        aria-required={required || undefined}
      />
    </FormField>
  );
}
