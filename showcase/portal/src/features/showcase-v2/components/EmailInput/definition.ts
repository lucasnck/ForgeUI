"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { EmailInputExample } from "./EmailInput.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "EmailInput",
    slug: "email-input",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/EmailInput.sc.md",
    description: "Controlled e-mail entry with local provider completion.",
    properties: [
      {
        name: "native attributes",
        type: "NativeEmailInputProps",
        required: false,
        defaultValue: null,
        description:
          "Remaining native attributes and ref follow the inherited public contract. Value adaptation remains owned by the control.",
        source: "EmailInputProps",
      },
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted value. Canonical data and native edit state are reported separately.",
        source: "EmailInputProps",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        required: true,
        defaultValue: null,
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
        source: "EmailInputProps",
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
        name: "providers",
        type: "readonly string[]",
        required: true,
        defaultValue: null,
        description: "Unique valid provider domains supplied by this example; no network lookup.",
        source: "EmailInputProps",
      },
      {
        name: "maxSuggestions",
        type: "number | undefined",
        required: false,
        defaultValue: "4",
        description: "Maximum number of domain completions; values below one suppress suggestions.",
        source: "EmailInputProps",
      },
      {
        name: "listboxLabel",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Accessible name of the public popup listbox.",
        source: "ComponentPopupProps",
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
        description: "src/design-system/components/molecules/EmailInput/EmailInput.tsx",
      },
      {
        id: "contract",
        name: "Public value contract",
        description:
          "Native values and callbacks use the public control; fixture actions remain caller-owned.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Provider completion",
      description: "Controlled e-mail entry with local provider completion.",
      code: basicCode,
      Component: EmailInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
