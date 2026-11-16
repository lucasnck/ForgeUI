"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { InlineExample } from "./Inline.example";
const definition = {
  slug: "inline",
  name: "Inline",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Inline.sc.md",
  description: "Spacing, composition and responsive layout through the public DS contract.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "InlineProps / inherited native root",
    },
    {
      name: "gap",
      type: "ComponentSpace",
      required: false,
      source: "ComponentSpaceProps",
      defaultValue: null,
      description: "Canonical spacing step between composed children.",
    },
    {
      name: "padding",
      type: "ComponentSpace",
      required: false,
      source: "ComponentSpaceProps",
      defaultValue: null,
      description: "Canonical inner spacing step.",
    },
    {
      name: "align",
      type: "ComponentAlign",
      required: false,
      source: "ComponentAlignProps",
      defaultValue: null,
      description: "Supported cross-axis alignment.",
    },
    {
      name: "justify",
      type: "ComponentJustify",
      required: false,
      source: "ComponentJustifyProps",
      defaultValue: null,
      description: "Supported main-axis alignment.",
    },
    {
      name: "as",
      type: "LayoutElement",
      required: false,
      source: "InlineProps",
      defaultValue: "div",
      description: "Supported semantic root element.",
    },
    {
      name: "wrap",
      type: "boolean",
      required: false,
      source: "InlineProps",
      defaultValue: "true",
      description: "Allows the inline collection to wrap.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "InlineProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "InlineProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Inline/Inline.tsx · src/design-system/components/atoms/Inline/Inline.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Action grouping",
      description:
        "Change spacing and supported layout settings; Cancel and Save report independent caller actions.",
      code: basicCode,
      Component: InlineExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
