"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ListBoxHeaderExample } from "./ListBoxHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "ListBoxHeader",
    slug: "list-box-header",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/ListBoxHeader.sc.md",
    description: "A heading and decorative icon in the public ListBox header.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        description: "Editable heading text inside the public header composition.",
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
        description: "src/design-system/components/atoms/ListBoxHeader/ListBoxHeader.tsx",
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
      title: "ListBoxHeader contextual region",
      description: "A heading and decorative icon in the public ListBox header.",
      code: basicCode,
      Component: ListBoxHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
