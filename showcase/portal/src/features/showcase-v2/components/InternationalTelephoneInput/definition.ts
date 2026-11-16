"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { InternationalTelephoneInputExample } from "./InternationalTelephoneInput.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "InternationalTelephoneInput",
    slug: "international-telephone-input",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/InternationalTelephoneInput.sc.md",
    description: "Country-aware canonical phone entry with local numbering metadata.",
    properties: [
      {
        name: "native attributes",
        type: "NativeInternationalTelephoneInputProps",
        required: false,
        defaultValue: null,
        description:
          "Remaining native attributes and ref follow the inherited public contract. Value adaptation remains owned by the control.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "value",
        type: "PhoneInputValue",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted value. Canonical data and native edit state are reported separately.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "onValueChange",
        type: "(value: PhoneInputValue) => void",
        required: true,
        defaultValue: null,
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
        source: "InternationalTelephoneInputProps",
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
        name: "locale",
        type: "Locale",
        required: true,
        defaultValue: null,
        description:
          "Supported locale for presentation; changing it preserves canonical business data.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "countries",
        type: "readonly string[] | undefined",
        required: false,
        defaultValue: null,
        description: "Supported BR/US/PT country fixtures; the DS owns numbering metadata.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "fixedCountry",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description:
          "Optional country restriction. The editor clears the number and aligns country atomically.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "countryLabel",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Accessible name of the country control.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "internationalLabel",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Label for the international/unselected country option.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "invalidMessage",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Native validation message for an invalid or incomplete draft.",
        source: "InternationalTelephoneInputProps",
      },
      {
        name: "onInputStateChange",
        type: "((state: PhoneParseResult) => void) | undefined",
        required: false,
        defaultValue: null,
        description: "Reports native draft parsing separately from the canonical accepted value.",
        source: "InternationalTelephoneInputProps",
      },
    ],
    methods: [],
    events: [
      {
        name: "onValueChange",
        signature: "(value: PhoneInputValue) => void",
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
      },
      {
        name: "onInputStateChange",
        signature: "((state: PhoneParseResult) => void) | undefined",
        description: "Reports native draft parsing separately from the canonical accepted value.",
      },
    ],
    features: [
      {
        id: "value-types",
        name: "Canonical value types",
        description: "src/design-system/types/phone.ts",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description:
          "src/design-system/components/molecules/InternationalTelephoneInput/InternationalTelephoneInput.tsx",
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
      title: "International phone entry",
      description: "Country-aware canonical phone entry with local numbering metadata.",
      code: basicCode,
      Component: InternationalTelephoneInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
