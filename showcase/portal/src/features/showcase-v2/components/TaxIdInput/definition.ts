"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TaxIdInputExample } from "./TaxIdInput.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "TaxIdInput",
    slug: "tax-id-input",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/TaxIdInput.sc.md",
    description:
      "Caller-supplied document masks with separate formatting and check-digit examples.",
    properties: [
      {
        name: "native attributes",
        type: "NativeMaskedInputProps",
        required: false,
        defaultValue: null,
        description:
          "Remaining native attributes and ref follow the inherited public contract. Value adaptation remains owned by the control.",
        source: "TaxIdInputProps",
      },
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted value. Canonical data and native edit state are reported separately.",
        source: "MaskedInputProps",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: true,
        defaultValue: null,
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
        source: "MaskedInputProps",
      },
      {
        name: "mask",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Caller-supplied mask grammar. Changing the example preset restores matching valid fixture digits; this is caller behavior, not a new DS enum.",
        source: "MaskedInputProps",
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
    ],
    methods: [],
    events: [
      {
        name: "onValueChange",
        signature: "(value: string) => void",
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
      },
    ],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/TaxIdInput/TaxIdInput.tsx",
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
      title: "Canonical masked entry",
      description:
        "Caller-supplied document masks with separate formatting and check-digit examples.",
      code: basicCode,
      Component: TaxIdInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
