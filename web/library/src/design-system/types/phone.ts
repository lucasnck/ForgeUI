import type { NativeInputProps } from "./native-control-contracts";
export type PhoneCountry = string;
export interface PhoneInputValue {
  number: string | null;
  country: PhoneCountry | null;
}
export interface PhoneCountryOption {
  country: PhoneCountry;
  callingCode: string;
  label: string;
}
export type PhoneParseResult =
  | { kind: "empty" }
  | { kind: "incomplete"; text: string }
  | { kind: "invalid"; text: string }
  | { kind: "possible"; number: string; country: PhoneCountry | null };
export interface NativeInternationalTelephoneInputProps extends Omit<
  NativeInputProps,
  | "type"
  | "children"
  | "inputMode"
  | "autoComplete"
  | "value"
  | "defaultValue"
  | "onChange"
  | "pattern"
  | "maxLength"
  | "list"
> {}
