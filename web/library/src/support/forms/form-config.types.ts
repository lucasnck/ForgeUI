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

export type FormFieldsConfig<TShape extends Record<string, z.ZodType>> = {
  [Key in keyof TShape]: FormFieldConfig<Extract<Key, string>, TShape[Key]>;
};

export interface FormConfig<TShape extends Record<string, z.ZodType>> {
  fields: FormFieldsConfig<TShape>;
  schema: z.ZodObject<TShape>;
  defaultValues: {
    [Key in keyof TShape]: z.input<TShape[Key]>;
  };
}
