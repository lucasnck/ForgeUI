"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ChoiceGroupFooterExample } from "./ChoiceGroupFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "choice-group-footer",
    name: "ChoiceGroupFooter",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/ChoiceGroupFooter.sc.md",
    description: "Description associated with a native choice group.",
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
        description: "src/design-system/components/atoms/ChoiceGroupFooter/ChoiceGroupFooter.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed choice composition",
      description: "Description associated with a native choice group.",
      code: basicCode,
      Component: ChoiceGroupFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
