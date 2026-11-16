import type {
  MaskedInputProps,
  DateInputProps,
  PostalCodeInputProps,
  TaxIdInputProps,
  TokenInputProps,
  EmailInputProps,
  SearchInputProps,
  PercentageInputProps,
  CurrencyInputProps,
  InternationalTelephoneInputProps,
  LocaleSelectorProps,
  ThemeSelectorProps,
} from "@forge-ui/web";
import type { PropertyEditors, PropertySchema } from "../components/ExampleScope/example-store";
const options = {
  MaskedInput: {
    value: {
      kind: "text",
    },
    mask: {
      kind: "select",
      options: ["000000", "0000", "00000000", "000-000"],
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
  },
  DateInput: {
    value: {
      kind: "text",
    },
    mask: {
      kind: "select",
      options: ["00/00/0000", "0000-00-00"],
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
  },
  PostalCodeInput: {
    value: {
      kind: "text",
    },
    mask: {
      kind: "select",
      options: ["00000-000"],
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
  },
  TaxIdInput: {
    value: {
      kind: "text",
    },
    mask: {
      kind: "select",
      options: ["000.000.000-00", "00.000.000/0000-00", "SS.SSS.SSS/SSSS-00"],
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
  },
  TokenInput: {
    value: {
      kind: "text",
    },
    mask: {
      kind: "select",
      options: ["000000", "0000", "00000000", "000-000"],
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
  },
  EmailInput: {
    value: {
      kind: "text",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
    maxSuggestions: {
      kind: "number",
    },
    listboxLabel: {
      kind: "text",
    },
  },
  SearchInput: {
    value: {
      kind: "text",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
    clearLabel: {
      kind: "text",
    },
  },
  PercentageInput: {
    value: {
      kind: "text",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
    min: {
      kind: "number",
    },
    max: {
      kind: "number",
    },
    step: {
      kind: "number",
    },
  },
  CurrencyInput: {
    value: {
      kind: "text",
      binding: "registered",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
    currency: {
      kind: "select",
      options: ["BRL", "USD", "EUR", "JPY"],
    },
    locale: {
      kind: "select",
      options: ["pt-BR", "es", "en"],
    },
    allowNegative: {
      kind: "boolean",
    },
    invalidMessage: {
      kind: "text",
    },
    animated: {
      kind: "boolean",
    },
  },
  InternationalTelephoneInput: {
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: {
      kind: "select",
      options: ["square", "rounded", "pill"],
    },
    fullWidth: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    readOnly: {
      kind: "boolean",
    },
    required: {
      kind: "boolean",
    },
    placeholder: {
      kind: "text",
    },
    title: {
      kind: "text",
    },
    name: {
      kind: "text",
    },
    locale: {
      kind: "select",
      options: ["pt-BR", "es", "en"],
    },
    fixedCountry: {
      kind: "select",
      options: ["BR", "US", "PT"],
      binding: "registered",
    },
    countryLabel: {
      kind: "text",
    },
    internationalLabel: {
      kind: "text",
    },
    invalidMessage: {
      kind: "text",
    },
  },
  LocaleSelector: {
    value: {
      kind: "select",
      options: ["pt-BR", "es", "en"],
    },
    label: {
      kind: "text",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: {
      kind: "boolean",
    },
  },
  ThemeSelector: {
    value: {
      kind: "select",
      options: ["light", "dark", "contrast", "liquid-glass"],
    },
    label: {
      kind: "text",
    },
    size: {
      kind: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: {
      kind: "boolean",
    },
  },
} satisfies {
  MaskedInput: PropertyEditors<MaskedInputProps>;
  DateInput: PropertyEditors<DateInputProps>;
  PostalCodeInput: PropertyEditors<PostalCodeInputProps>;
  TaxIdInput: PropertyEditors<TaxIdInputProps>;
  TokenInput: PropertyEditors<TokenInputProps>;
  EmailInput: PropertyEditors<EmailInputProps>;
  SearchInput: PropertyEditors<SearchInputProps>;
  PercentageInput: PropertyEditors<PercentageInputProps>;
  CurrencyInput: PropertyEditors<CurrencyInputProps>;
  InternationalTelephoneInput: PropertyEditors<InternationalTelephoneInputProps>;
  LocaleSelector: PropertyEditors<LocaleSelectorProps>;
  ThemeSelector: PropertyEditors<ThemeSelectorProps>;
};
export const specializedInputControlOptions: Readonly<Record<string, PropertySchema>> = options;
