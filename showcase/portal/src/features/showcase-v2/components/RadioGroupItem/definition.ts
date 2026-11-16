"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { RadioGroupItemExample } from "./RadioGroupItem.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "radio-group-item",
    name: "RadioGroupItem",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/RadioGroupItem.sc.md",
    description: "Indexed radio option in a scoped exclusive-selection group.",
    properties: [
      {
        name: "value",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted selection. Item identity is stable and is not edited across all records.",
        source: "RadioGroupItemProps",
      },
      {
        name: "label",
        type: "string",
        required: true,
        defaultValue: null,
        description:
          "Accessible public label. Repeated items append their original one-based index.",
        source: "RadioGroupItemProps",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disables the native control or group through the public contract.",
        source: "RadioGroupItemProps",
      },
      {
        name: "title",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description: "Native title; repeated controls preserve the original item index.",
        source: "HTMLAttributes",
      },
    ],
    methods: [],
    events: [],
    features: [
      {
        id: "composition",
        name: "Public composition",
        description:
          "RadioGroup owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/RadioGroupItem/RadioGroupItem.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed choice composition",
      description: "Indexed radio option in a scoped exclusive-selection group.",
      code: basicCode,
      Component: RadioGroupItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
