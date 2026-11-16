"use client";
import type { FieldPathByValue, FieldValues } from "react-hook-form";
import type {
  NativeFormFieldCheckboxProps,
  FormFieldRegistrationProps,
  ComponentSizedProps,
  ComponentToneProps,
  ComponentShapeProps,
  ComponentAnimatedProps,
  ComponentFullWidthProps,
} from "../../../../types";

import { Checkbox } from "../../../atoms/Checkbox";
import { FormField } from "../../../molecules/FormField";
import { useFormFieldCheckbox } from "./useFormFieldCheckbox";
export interface FormFieldCheckboxProps<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, boolean> = FieldPathByValue<TValues, boolean>,
>
  extends
    NativeFormFieldCheckboxProps,
    FormFieldRegistrationProps<TValues, TName>,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentShapeProps,
    ComponentAnimatedProps,
    ComponentFullWidthProps {}

export function FormFieldCheckbox<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, boolean> = FieldPathByValue<TValues, boolean>,
>(props: FormFieldCheckboxProps<TValues, TName>) {
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
    change,
    disabled,
    required,
  } = useFormFieldCheckbox(props);

  return (
    <FormField controlId={controlId} label={label} hint={hint} error={message}>
      <Checkbox
        {...inputProps}
        name={fieldName}
        ref={inputRef}
        id={controlId}
        onBlur={onBlur}
        checked={value}
        onChange={change}
        disabled={disabled}
        invalid={Boolean(message)}
        aria-required={required || undefined}
      />
    </FormField>
  );
}
