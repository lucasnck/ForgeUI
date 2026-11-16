"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ListBoxFooterExample } from "./ListBoxFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "ListBoxFooter",
    slug: "list-box-footer",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/ListBoxFooter.sc.md",
    description: "Selection count and a caller-owned clear action outside the listbox options.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        description:
          "Structured selection counts and the caller-owned clear action. Kept read-only to preserve this composition.",
        source: "DOMAttributes",
        defaultValue: null,
        required: false,
      },
      {
        name: "title",
        type: "string",
        description:
          "Native title on the rendered public part; repeated rows keep their original index.",
        source: "HTMLAttributes",
        defaultValue: null,
        required: false,
      },
      {
        name: "native attributes",
        type: "Native HTML attributes",
        description:
          "Native attributes/events/ref follow the public semantic owner; relationship IDs and generated content remain owned.",
        source: "React",
        defaultValue: null,
        required: false,
      },
    ],
    methods: [],
    events: [],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/atoms/ListBoxFooter/ListBoxFooter.tsx",
      },
      {
        id: "ownership",
        name: "Public composition",
        description:
          "ListBoxBody generates options. No orphan item, private context, nested interactive option or duplicate selection engine is used.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "ListBoxFooter contextual region",
      description: "Selection count and a caller-owned clear action outside the listbox options.",
      code: basicCode,
      Component: ListBoxFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
