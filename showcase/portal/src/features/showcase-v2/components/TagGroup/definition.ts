"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TagGroupExample } from "./TagGroup.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tag-group",
    name: "TagGroup",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/TagGroup.sc.md",
    description: "Removable indexed tags with stable collection identity.",
    properties: [
      {
        name: "items",
        type: "readonly TagGroupEntry[] | undefined",
        required: false,
        defaultValue: null,
        description:
          "Caller-owned records with stable IDs; removal preserves original item indices.",
        source: "TagGroupProps",
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description:
          "Content slot. Structured owner/part children retain the public composition; editable item text keeps its original index.",
        source: "TagGroupProps",
      },
      {
        name: "fullWidth",
        type: "boolean | undefined",
        required: false,
        defaultValue: "true",
        description: "Use the available inline width.",
        source: "ComponentFullWidthProps",
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
          "TagGroup owns the scope; context is supplied through public parts. Collection text preserves original one-based indices.",
      },
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/TagGroup/TagGroup.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed tag removal",
      description: "Removable indexed tags with stable collection identity.",
      code: basicCode,
      Component: TagGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
