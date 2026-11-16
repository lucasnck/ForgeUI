"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TagGroupItemExample } from "./TagGroupItem.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    slug: "tag-group-item",
    name: "TagGroupItem",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/TagGroupItem.sc.md",
    description: "Semantic list item containing a removable public Tag.",
    properties: [
      {
        name: "tag",
        type: "TagProps",
        required: true,
        defaultValue: null,
        description:
          "Public TagProps object, including indexed children, title, removeLabel and caller-owned removal.",
        source: "TagGroupItemProps",
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
        description: "src/design-system/components/molecules/TagGroupItem/TagGroupItem.tsx",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Indexed tag removal",
      description: "Semantic list item containing a removable public Tag.",
      code: basicCode,
      Component: TagGroupItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
