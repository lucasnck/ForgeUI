import type { NativeInputProps } from "./native-control-contracts";

export interface NativeSpecializedInputProps extends Omit<NativeInputProps, "type" | "children"> {}

export interface NativeFileInputProps extends Omit<
  NativeSpecializedInputProps,
  "value" | "defaultValue"
> {}

export interface NativeRangeInputProps extends Omit<NativeSpecializedInputProps, "readOnly"> {}

export interface NativeQueryInputProps extends Omit<
  NativeSpecializedInputProps,
  "value" | "defaultValue" | "onChange" | "list"
> {}
