"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PercentageInputExample } from "./PercentageInput.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "PercentageInput",
    slug: "percentage-input",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/PercentageInput.sc.md",
    description: "Native numeric entry with public percentage defaults and suffix.",
    properties: [
      {
        name: "native attributes",
        type: "NativeSpecializedInputProps",
        required: false,
        defaultValue: null,
        description:
          "Remaining native attributes and ref follow the inherited public contract. Value adaptation remains owned by the control.",
        source: "PercentageInputProps",
      },
      {
        name: "value",
        type: "string | number | readonly string[] | undefined",
        required: false,
        defaultValue: null,
        description:
          "Controlled accepted value. Canonical data and native edit state are reported separately.",
        source: "InputHTMLAttributes",
      },
      {
        name: "onChange",
        type: "ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined",
        required: false,
        defaultValue: null,
        description: "Native change event, including the current input value and validity.",
        source: "InputHTMLAttributes",
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
        name: "min",
        type: "string | number | undefined",
        required: false,
        defaultValue: "0",
        description: "Native numeric minimum.",
        source: "InputHTMLAttributes",
      },
      {
        name: "max",
        type: "string | number | undefined",
        required: false,
        defaultValue: "100",
        description: "Native numeric maximum.",
        source: "InputHTMLAttributes",
      },
      {
        name: "step",
        type: "string | number | undefined",
        required: false,
        defaultValue: "1",
        description: "Native numeric step.",
        source: "InputHTMLAttributes",
      },
    ],
    methods: [],
    events: [
      {
        name: "onChange",
        signature: "ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined",
        description: "Native change event, including the current input value and validity.",
      },
    ],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/PercentageInput/PercentageInput.tsx",
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
      title: "Native numeric constraints",
      description: "Native numeric entry with public percentage defaults and suffix.",
      code: basicCode,
      Component: PercentageInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
