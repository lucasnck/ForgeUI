import type { ComponentPropsWithRef } from "react";

export interface NativeInputProps extends Omit<ComponentPropsWithRef<"input">, "size"> {}

export interface NativeSelectProps extends Omit<ComponentPropsWithRef<"select">, "size"> {}

export interface NativeTextareaProps extends Omit<ComponentPropsWithRef<"textarea">, "size"> {}

export interface NativeCheckboxProps extends Omit<NativeInputProps, "type" | "children"> {}

export interface NativeMaskedInputProps extends Omit<
  NativeInputProps,
  "type" | "children" | "inputMode" | "maxLength" | "value" | "defaultValue" | "onChange"
> {}

export interface NativeEmailInputProps extends Omit<
  NativeInputProps,
  | "type"
  | "inputMode"
  | "autoComplete"
  | "autoCapitalize"
  | "autoCorrect"
  | "spellCheck"
  | "list"
  | "value"
  | "defaultValue"
  | "onChange"
> {}

export interface NativeFormFieldInputProps extends Omit<
  NativeInputProps,
  | "name"
  | "type"
  | "value"
  | "defaultValue"
  | "children"
  | "onChange"
  | "onBlur"
  | "ref"
  | "required"
  | "aria-invalid"
> {}
