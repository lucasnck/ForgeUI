import type { ComponentPropsWithRef } from "react";
import type { NativeInputProps, NativeCheckboxProps } from "./native-control-contracts";

export interface NativeIconButtonProps extends Omit<ComponentPropsWithRef<"button">, "children"> {}

export interface NativeRadioProps extends Omit<NativeInputProps, "type" | "children"> {}

export interface NativeSwitchProps extends Omit<NativeCheckboxProps, "role" | "aria-checked"> {}

export interface ComponentAccessibleNameProps {
  label: string;
}
