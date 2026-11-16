"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { FormFooterExample } from "./FormFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "FormFooter",
    slug: "form-footer",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/FormFooter.sc.md",
    description: "Native submit and secondary action outside the busy FormBody.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description:
          "Public compound composition. Structured children retain required parts and semantic controls.",
        source: "DOMAttributes",
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Native title of the demonstrated part.",
        source: "HTMLAttributes",
      },
      {
        name: "native attributes",
        type: "Native HTML attributes",
        required: false,
        defaultValue: null,
        description:
          "Native attributes, events and refs are delegated to the semantic owner. Owned structural relationships remain authoritative.",
        source: "React",
      },
    ],
    methods: [],
    events: [],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/atoms/FormFooter/FormFooter.tsx",
      },
      {
        id: "ownership",
        name: "Ownership",
        description:
          "Form owns native submission; fixture state and actions belong to the caller. No backend or secondary validation engine.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "FormFooter contextual region",
      description: "Native submit and secondary action outside the busy FormBody.",
      code: basicCode,
      Component: FormFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
