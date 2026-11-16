---
title: "Form configuration types"
scope: "Typed field metadata, validation shape and derived default values"
type: "type"
status: "DONE"
ds-level: "none"
---

# Form configuration types

## Files

```text
lib/forms/form-config.types.ts (M)
lib/forms/index.ts (M)
design-system/types/forms.test.ts (M)
```

## Contract

```ts
import type { FormFieldConfig } from "../../web/library/src/support/forms";
import type { z } from "zod";
type TextField = FormFieldConfig<"displayName", z.ZodString>;
```

## Content

```ts
import type { z } from "zod";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { Locale } from "../contracts/preferences";
import type { SelectionMode } from "../contracts/selection";
export type FormTextInputType = "text" | "email" | "search" | "tel" | "url";
export interface FormFieldOption<Value extends string> {
  value: Value;
  label: string;
  disabled?: boolean;
}
export type FormInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | "autoComplete"
  | "inputMode"
  | "minLength"
  | "maxLength"
  | "readOnly"
  | "disabled"
  | "autoCapitalize"
  | "spellCheck"
  | "min"
  | "max"
  | "step"
>;
type FieldFlags = Pick<FormInputProps, "disabled" | "readOnly">;
type NativeSettings<Props = FormInputProps> = { props?: Props; options?: never; mask?: never };
type MaskSettings = Omit<NativeSettings, "mask"> & { mask: string };
type ChoiceSettings = {
  options: readonly FormFieldOption<string>[];
  props?: FieldFlags;
  mask?: never;
};
export interface FormFieldValueMap {
  input: string;
  password: string;
  email: string;
  maskedInput: string;
  internationalTelephone: { number: string | null; country: string | null };
  select: string;
  checkbox: boolean;
  radioGroup: string;
  textarea: string;
  number: string;
  percentage: string;
  currency: string | null;
  date: string;
  dateTime: string;
  time: string;
  telephone: string;
  url: string;
  search: string;
  color: string;
  file: readonly File[];
  slider: number;
  taxId: string;
  postalCode: string;
  token: string;
  autocomplete: string;
  combobox: string | null;
  checkboxGroup: readonly string[];
  listBox: readonly string[];
  switch: boolean;
}
interface FormRendererSettings {
  input: NativeSettings & { inputType?: FormTextInputType };
  password: NativeSettings & { inputType?: FormTextInputType };
  email: NativeSettings<
    Pick<FormInputProps, "minLength" | "maxLength" | "readOnly" | "disabled">
  > & { providers: readonly string[]; maxSuggestions?: number; listboxLabel?: string };
  maskedInput: Omit<MaskSettings, "mask"> & { mask?: string };
  internationalTelephone: NativeSettings<FieldFlags>;
  select: ChoiceSettings;
  radioGroup: ChoiceSettings;
  checkbox: NativeSettings<FieldFlags>;
  textarea: NativeSettings<
    Pick<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      | "rows"
      | "cols"
      | "minLength"
      | "maxLength"
      | "readOnly"
      | "disabled"
      | "autoComplete"
      | "wrap"
    >
  >;
  number: NativeSettings;
  percentage: NativeSettings;
  dateTime: NativeSettings;
  time: NativeSettings;
  telephone: NativeSettings;
  url: NativeSettings;
  color: NativeSettings;
  date: MaskSettings;
  taxId: MaskSettings;
  postalCode: MaskSettings;
  token: MaskSettings;
  search: NativeSettings & { clearLabel?: string };
  currency: NativeSettings<FieldFlags> & {
    currency: string;
    locale: Locale;
    invalidMessage: string;
    allowNegative?: boolean;
    animated?: boolean;
  };
  file: NativeSettings<
    Pick<InputHTMLAttributes<HTMLInputElement>, "accept" | "multiple" | "disabled">
  >;
  slider: NativeSettings<Pick<FormInputProps, "min" | "max" | "step" | "disabled">> & {
    valueText?: string;
  };
  switch: NativeSettings<FieldFlags>;
  autocomplete: ChoiceSettings & { listboxLabel?: string };
  combobox: ChoiceSettings & { listboxLabel?: string };
  checkboxGroup: ChoiceSettings;
  listBox: Omit<ChoiceSettings, "props"> & {
    props?: Pick<FieldFlags, "disabled">;
    selectionMode?: SelectionMode;
  };
}
export type FormFieldKind = keyof FormFieldValueMap;
export type FormRendererDefinition =
  | { kind?: undefined; props?: never; options?: never; mask?: never }
  | { [Kind in FormFieldKind]: { kind: Kind } & FormRendererSettings[Kind] }[FormFieldKind];
type TypedRendererSettings<Kind extends FormFieldKind, Value> = Kind extends "select" | "radioGroup"
  ? Omit<FormRendererSettings[Kind], "options"> & {
      options: readonly FormFieldOption<Extract<Value, string>>[];
    }
  : FormRendererSettings[Kind];
export type FormRendererMetadata<Value> =
  | { kind?: undefined; props?: never; options?: never; mask?: never }
  | {
      [Kind in FormFieldKind]: [Value] extends [FormFieldValueMap[Kind]]
        ? { kind: Kind } & TypedRendererSettings<Kind, Value>
        : never;
    }[FormFieldKind];

interface FormFieldMetadata<TName extends string, TSchema extends z.ZodType> {
  name: TName;
  id?: string;
  label: string;
  description: string;
  placeholder: string;
  defaultValue: z.input<TSchema>;
  validation: TSchema;
  required?: boolean;
}

export type FormFieldConfig<TName extends string, TSchema extends z.ZodType> = FormFieldMetadata<
  TName,
  TSchema
> &
  FormRendererMetadata<z.input<TSchema>>;

export type FormFieldsConfig<TShape extends z.ZodRawShape> = {
  [Key in keyof TShape]: FormFieldConfig<Extract<Key, string>, TShape[Key]>;
};

export interface FormConfig<TShape extends z.ZodRawShape> {
  fields: FormFieldsConfig<TShape>;
  schema: z.ZodObject<TShape>;
  defaultValues: {
    [Key in keyof TShape]: z.input<TShape[Key]>;
  };
}
```

## Tests

- Compile each newly specified renderer against the exact schema input type in the new adapter criteria; reject wrong scalar/nullable/array shapes, missing masks, missing money presentation and unsupported per-kind props. File types remain type-only and safe for SSR imports.
- Type tests reject unrecognized kinds and invalid per-kind options, values and required metadata.
- Type tests preserve existing typed defaults and field-name literal contracts while the page migrations remain pending.

- Field keys and name literals must match; incompatible default input types are rejected.
- Schema transforms preserve separate input defaults and output submission types.
- Optional display-required metadata adds no duplicate schema constraint.

## Criteria

- [x] Extend the closed renderer union and corresponding FormRendererMetadata branches with the 21 kinds listed below, preserving existing kinds and the separately pending email extension. The metadata stays in pure lib/forms without imports from DS components/types; use its canonical FormFieldOption where options are needed and structurally compatible neutral value contracts.
- [x] `textarea` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `switch` accepts `boolean` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `number` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `percentage` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `currency` accepts `MonetaryValue` schema input; expose currency, locale, invalidMessage as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `date` accepts `string` schema input; expose mask as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `dateTime` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `time` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `telephone` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `url` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `search` accepts `string` schema input; expose clearLabel as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `color` accepts `string` schema input; expose supported native/presentation props only as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `file` accepts `readonly File[]` schema input; expose multiple, accept as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `slider` accepts `number` schema input; expose min, max, step as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `taxId` accepts `string` schema input; expose mask as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `postalCode` accepts `string` schema input; expose mask as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `token` accepts `string` schema input; expose mask as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `autocomplete` accepts `string` schema input; expose options, listboxLabel as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `combobox` accepts `string | null` schema input; expose options, listboxLabel as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `checkboxGroup` accepts `readonly string[]` schema input; expose options as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] `listBox` accepts `readonly string[]` schema input; expose options, selectionMode as renderer metadata or its typed props according to the adapter contract. Exclude caller-owned registration channels and reject other schema shapes.
- [x] Add explicit kind="email" for string-valued fields with required readonly string[] providers, optional maxSuggestions and optional listboxLabel translation key. Reject this metadata on other kinds and reject non-string defaults; keep existing inputType="email" compatibility.
- [x] Metadata does not expose RHF-owned value/defaultValue/name/ref/change channels or import rendered components. Preserve Zod input/output inference and field-name literals; add accepted/rejected type cases and pass touched-file formatting/lint checks, typechecking and targeted form checks for the email extension.
- [x] A typed field renderer discriminant supports input, password, maskedInput, internationalTelephone, select, checkbox and radioGroup without permissive unknown kinds.
- [x] Renderer-specific metadata is valid only for the corresponding field kind; preserve typed schema-input default values, literal field names and safe props.
- [x] Pure lib/forms types do not import rendered components at runtime; use type-only public contracts where required.
- [x] Existing configuration consumers retain compatibility until their migration is completed in the authorized implementer scope.
- [x] Task-touched type tests reject invalid renderer/value/option combinations and preserve Zod input/output type inference.

- [x] Field metadata has one shared owner and remains independent of component, feature and transport imports.
- [x] Each default value is typed against its field schema input; parsed output belongs to submission.
- [x] Names retain literal keys and support the documented flat object configuration.

- [x] Omitted kind remains a legacy field declaration; explicit kinds are a closed discriminated union. Select/radio options preserve schema-input literals, checkbox requires boolean input, and telephone metadata requires nullable number/country strings. Props exclude owned value/name/ref/change channels.
