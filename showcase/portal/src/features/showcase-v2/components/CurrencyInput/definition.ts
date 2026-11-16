"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { CurrencyInputExample } from "./CurrencyInput.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "CurrencyInput",
    slug: "currency-input",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/CurrencyInput.sc.md",
    description: "Exact decimal amount, localized presentation and independent edit state.",
    properties: [
      {
        name: "native attributes",
        type: "NativeCurrencyInputProps",
        required: false,
        defaultValue: null,
        description:
          "Remaining native attributes and ref follow the inherited public contract. Value adaptation remains owned by the control.",
        source: "CurrencyInputProps",
      },
      {
        name: "value",
        type: "MonetaryValue",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted value. Canonical data and native edit state are reported separately. The property editor retains a draft and commits only complete valid decimals; an empty draft commits null.",
        source: "CurrencyInputProps",
      },
      {
        name: "onValueChange",
        type: "(value: MonetaryValue) => void",
        required: true,
        defaultValue: null,
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
        source: "CurrencyInputProps",
      },
      {
        name: "size",
        type: "ComponentSize | undefined",
        required: false,
        defaultValue: "md",
        description: "Public component size.",
        source: "ComponentSizedProps",
      },
      {
        name: "tone",
        type: "ComponentTone | undefined",
        required: false,
        defaultValue: "neutral",
        description: "Public semantic tone.",
        source: "ComponentToneProps",
      },
      {
        name: "appearance",
        type: "ComponentAppearance | undefined",
        required: false,
        defaultValue: "bordered",
        description: "Public control appearance.",
        source: "ComponentAppearanceProps",
      },
      {
        name: "shape",
        type: "ComponentShape | undefined",
        required: false,
        defaultValue: null,
        description: "Public control shape.",
        source: "ComponentShapeProps",
      },
      {
        name: "fullWidth",
        type: "boolean | undefined",
        required: false,
        defaultValue: "true",
        description: "Fill available inline width.",
        source: "ComponentFullWidthProps",
      },
      {
        name: "invalid",
        type: "boolean | undefined",
        required: false,
        defaultValue: null,
        description:
          "Caller-provided invalid presentation, independent of native draft validation.",
        source: "ComponentInvalidProps",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disable the native control and its owned actions.",
        source: "InputHTMLAttributes",
      },
      {
        name: "readOnly",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Prevent user edits and suggestion acceptance.",
        source: "InputHTMLAttributes",
      },
      {
        name: "required",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Native required constraint.",
        source: "InputHTMLAttributes",
      },
      {
        name: "placeholder",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Native placeholder.",
        source: "InputHTMLAttributes",
      },
      {
        name: "title",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Native title.",
        source: "HTMLAttributes",
      },
      {
        name: "name",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Native form field name.",
        source: "InputHTMLAttributes",
      },
      {
        name: "currency",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "ISO currency code. Example options are supported fixtures; the public type remains string.",
        source: "CurrencyInputProps",
      },
      {
        name: "locale",
        type: "Locale",
        required: true,
        defaultValue: null,
        description:
          "Supported locale for presentation; changing it preserves canonical business data.",
        source: "CurrencyInputProps",
      },
      {
        name: "allowNegative",
        type: "boolean | undefined",
        required: false,
        defaultValue: "true",
        description: "Allow negative monetary edits.",
        source: "CurrencyInputProps",
      },
      {
        name: "invalidMessage",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Native validation message for an invalid or incomplete draft.",
        source: "CurrencyInputProps",
      },
      {
        name: "onInputStateChange",
        type: "((state: MoneyInputResult) => void) | undefined",
        required: false,
        defaultValue: null,
        description: "Reports native draft parsing separately from the canonical accepted value.",
        source: "CurrencyInputProps",
      },
      {
        name: "animated",
        type: "boolean | undefined",
        required: false,
        defaultValue: "true",
        description: "Use the public motion recipe.",
        source: "ComponentAnimatedProps",
      },
    ],
    methods: [],
    events: [
      {
        name: "onValueChange",
        signature: "(value: MonetaryValue) => void",
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
      },
      {
        name: "onInputStateChange",
        signature: "((state: MoneyInputResult) => void) | undefined",
        description: "Reports native draft parsing separately from the canonical accepted value.",
      },
    ],
    features: [
      {
        id: "value-types",
        name: "Canonical value types",
        description: "src/design-system/types/money.ts",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/CurrencyInput/CurrencyInput.tsx",
      },
      {
        id: "contract",
        name: "Public value contract",
        description:
          "The input and supporting fixtures call public DS contracts; canonical data, display and validation have separate owners.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Exact monetary entry",
      description: "Exact decimal amount, localized presentation and independent edit state.",
      code: basicCode,
      Component: CurrencyInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
