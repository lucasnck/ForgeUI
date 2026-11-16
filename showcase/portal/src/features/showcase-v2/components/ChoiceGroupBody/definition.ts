"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ChoiceGroupBodyExample } from "./ChoiceGroupBody.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "choice-group-body",
    name: "ChoiceGroupBody",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/ChoiceGroupBody.sc.md",
    description: "Contextual content for native grouped choices.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description:
          "Content slot. Structured owner/part children retain the public composition; editable item text keeps its original index.",
        source: "DOMAttributes",
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
          "ChoiceGroup owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/atoms/ChoiceGroupBody/ChoiceGroupBody.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed choice composition",
      description: "Contextual content for native grouped choices.",
      code: basicCode,
      Component: ChoiceGroupBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
