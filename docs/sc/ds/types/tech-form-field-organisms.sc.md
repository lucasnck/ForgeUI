---
title: "Form Field Organisms"
scope: "Shared organization and composition contract for registered form fields"
status: "DONE"
type: "type"
ds-level: "none"
---

# Form Field Organisms

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/form-field-organisms.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [React Hook Form integration](../../tech-react-hook-form.sc.md)

## Contract

```ts
import type { FormFieldRegistrationProps } from "@forge-ui/web";
type NameField = FormFieldRegistrationProps<{
  displayName: string;
}>;
```

## Content

```ts
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
```

## Tests

- V2 Consumer snippets for FormFieldInput retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile valid FieldPath values, including nested fields, for the declared form-value generic.
- Reject unknown field paths and a name incompatible with the selected field generic.

## Criteria

- [x] Add canonical control-prop interfaces for the 21 pending registered adapters (Textarea, Switch, NumberInput, PercentageInput, CurrencyInput, DateInput, DateTimeInput, TimeInput, TelephoneInput, UrlInput, SearchInput, ColorInput, FileInput, Slider, TaxIdInput, PostalCodeInput, TokenInput, Autocomplete, Combobox, CheckboxGroup and ListBox). Derive supported props through type-only imports of the existing primitive contracts; exclude adapter-owned registration, label/feedback and controlled channels. Preserve existing exported interfaces and the independently pending email contracts.
- [x] Every new component Props interface extends its canonical control props and FormFieldRegistrationProps, constraining names to the exact input type specified by its owning SC. Optional native onInputStateChange observers must not replace canonical RHF value ownership or draft-invalid submit protection.
- [x] Export canonical NativeFormFieldEmailProps and FormFieldEmailPresentationProps for FormFieldEmailInput, preserving EmailInput's required providers and optional presentation settings without competing RHF channels. Validate nested string paths and rejected non-string/owned-prop consumption; pass touched-file formatting/lint checks, typechecking and targeted form checks.
- [x] Registration names preserve FieldPath for the declared form-value generic, including nested names.
- [x] The label is required and hint/required metadata stays optional without encoding validation rules.
- [x] Shared registration props have one canonical owner; registered organisms consume it through their own named interfaces as specified in their component resources.
- [x] Form-manager types remain outside the native atoms and molecules.

- [x] V2 typed usage fixtures cover FormFieldInput: Typed field paths, FormProvider registration and native-versus-controlled value channels. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.
