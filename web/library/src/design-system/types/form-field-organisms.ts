import type { FieldPath, FieldValues } from "react-hook-form";

export interface FormFieldRegistrationProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues> = FieldPath<TValues>,
> {
  name: TName;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

import type { NativeSpecializedInputProps } from "./input-specializations";
import type {
  NativeMaskedInputProps,
  NativeSelectProps,
  NativeCheckboxProps,
} from "./native-control-contracts";
import type { NativeInternationalTelephoneInputProps } from "./phone";
export interface NativeFormFieldPasswordProps extends Omit<
  NativeSpecializedInputProps,
  "name" | "ref" | "value" | "defaultValue" | "onChange" | "onBlur" | "aria-invalid"
> {}
export interface NativeFormFieldMaskedProps extends Omit<
  NativeMaskedInputProps,
  "name" | "ref" | "onBlur" | "aria-invalid"
> {}
export interface NativeFormFieldTelephoneProps extends Omit<
  NativeInternationalTelephoneInputProps,
  "name" | "ref" | "onBlur" | "aria-invalid"
> {}
export interface NativeFormFieldSelectProps extends Omit<
  NativeSelectProps,
  "name" | "ref" | "value" | "defaultValue" | "onChange" | "onBlur" | "children" | "aria-invalid"
> {}
export interface NativeFormFieldCheckboxProps extends Omit<
  NativeCheckboxProps,
  | "name"
  | "ref"
  | "checked"
  | "defaultChecked"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onBlur"
  | "aria-invalid"
> {}

export type FormViewMode = "form" | "fields";

import type { PasswordInputProps } from "../components/molecules/PasswordInput";
import type { MaskedInputProps } from "../components/molecules/MaskedInput";
import type { InternationalTelephoneInputProps } from "../components/molecules/InternationalTelephoneInput";
export interface FormFieldPasswordPresentationProps extends Pick<
  PasswordInputProps,
  "revealLabel" | "concealLabel" | "revealable"
> {}
export interface FormFieldMaskPresentationProps extends Pick<MaskedInputProps, "mask"> {}
export interface FormFieldTelephonePresentationProps extends Pick<
  InternationalTelephoneInputProps,
  | "locale"
  | "countryLabel"
  | "internationalLabel"
  | "invalidMessage"
  | "countries"
  | "fixedCountry"
  | "showCountrySelector"
  | "defaultCountry"
> {}

import type { ChoiceOption } from "./selection-navigation";
import type { TextareaProps } from "../components/atoms/Textarea";
import type { SwitchProps } from "../components/atoms/Switch";
import type { NumberInputProps } from "../components/molecules/NumberInput";
import type { PercentageInputProps } from "../components/molecules/PercentageInput";
import type { CurrencyInputProps } from "../components/molecules/CurrencyInput";
import type { DateInputProps } from "../components/molecules/DateInput";
import type { DateTimeInputProps } from "../components/molecules/DateTimeInput";
import type { TimeInputProps } from "../components/molecules/TimeInput";
import type { TelephoneInputProps } from "../components/molecules/TelephoneInput";
import type { UrlInputProps } from "../components/molecules/UrlInput";
import type { SearchInputProps } from "../components/molecules/SearchInput";
import type { ColorInputProps } from "../components/molecules/ColorInput";
import type { FileInputProps } from "../components/molecules/FileInput";
import type { SliderProps } from "../components/molecules/Slider";
import type { TaxIdInputProps } from "../components/molecules/TaxIdInput";
import type { PostalCodeInputProps } from "../components/molecules/PostalCodeInput";
import type { TokenInputProps } from "../components/molecules/TokenInput";
import type { AutocompleteProps } from "../components/molecules/Autocomplete";
import type { ComboboxProps } from "../components/molecules/Combobox";
import type { CheckboxGroupProps } from "../components/molecules/CheckboxGroup";
import type { ListBoxProps } from "../components/organisms/ListBox";

type FormFieldOwnedControlKey =
  | "name"
  | "label"
  | "hint"
  | "error"
  | "required"
  | "value"
  | "defaultValue"
  | "checked"
  | "defaultChecked"
  | "onChange"
  | "onBlur"
  | "onValueChange"
  | "onFilesChange"
  | "ref"
  | "invalid"
  | "aria-invalid"
  | "children"
  | "query"
  | "onQueryChange"
  | "selectedValue"
  | "onSelectionChange";

export interface FormFieldTextareaControlProps extends Omit<
  TextareaProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldSwitchControlProps extends Omit<SwitchProps, FormFieldOwnedControlKey> {}

export interface FormFieldNumberInputControlProps extends Omit<
  NumberInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldPercentageInputControlProps extends Omit<
  PercentageInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldCurrencyInputControlProps extends Omit<
  CurrencyInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldDateInputControlProps extends Omit<
  DateInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldDateTimeInputControlProps extends Omit<
  DateTimeInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldTimeInputControlProps extends Omit<
  TimeInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldTelephoneInputControlProps extends Omit<
  TelephoneInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldUrlInputControlProps extends Omit<
  UrlInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldSearchInputControlProps extends Omit<
  SearchInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldColorInputControlProps extends Omit<
  ColorInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldFileInputControlProps extends Omit<
  FileInputProps,
  FormFieldOwnedControlKey | "readOnly"
> {}

export interface FormFieldSliderControlProps extends Omit<SliderProps, FormFieldOwnedControlKey> {}

export interface FormFieldTaxIdInputControlProps extends Omit<
  TaxIdInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldPostalCodeInputControlProps extends Omit<
  PostalCodeInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldTokenInputControlProps extends Omit<
  TokenInputProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldAutocompleteControlProps extends Omit<
  AutocompleteProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldComboboxControlProps extends Omit<
  ComboboxProps,
  FormFieldOwnedControlKey
> {}

export interface FormFieldCheckboxGroupControlProps extends Omit<
  CheckboxGroupProps,
  FormFieldOwnedControlKey
> {
  options: readonly ChoiceOption[];
  readOnly?: boolean;
}

export interface FormFieldListBoxControlProps extends Omit<
  ListBoxProps,
  FormFieldOwnedControlKey
> {}

import type { NativeEmailInputProps } from "./native-control-contracts";
import type { EmailInputProps } from "../components/molecules/EmailInput";

export interface NativeFormFieldEmailProps extends Omit<
  NativeEmailInputProps,
  "name" | "ref" | "value" | "defaultValue" | "onChange" | "onBlur" | "aria-invalid"
> {}

export interface FormFieldEmailPresentationProps extends Pick<
  EmailInputProps,
  "providers" | "maxSuggestions" | "listboxLabel"
> {}
