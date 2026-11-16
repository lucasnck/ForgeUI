"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ListBoxBodyExample } from "./ListBoxBody.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "ListBoxBody",
    slug: "list-box-body",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/ListBoxBody.sc.md",
    description: "Owner-generated options with roving focus and native form values.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        description: "Not accepted: ListBoxBody generates its items from ListBox.options.",
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
        description: "src/design-system/components/molecules/ListBoxBody/ListBoxBody.tsx",
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
      title: "ListBoxBody contextual region",
      description: "Owner-generated options with roving focus and native form values.",
      code: basicCode,
      Component: ListBoxBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
