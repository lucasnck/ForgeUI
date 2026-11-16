"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { SimpleGridExample } from "./SimpleGrid.example";
const definition = {
  slug: "simple-grid",
  name: "SimpleGrid",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/SimpleGrid.sc.md",
  description: "Spacing, composition and responsive layout through the public DS contract.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "SimpleGridProps / inherited native root",
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
      name: "as",
      type: "LayoutElement",
      required: false,
      source: "SimpleGridProps",
      defaultValue: "div",
      description: "Supported semantic root element.",
    },
    {
      name: "columns",
      type: "ComponentResponsive<ComponentGridColumns>",
      required: true,
      source: "SimpleGridProps",
      defaultValue: null,
      description: "Responsive column counts: required base, optional mobile and wide.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "SimpleGridProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "SimpleGridProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/SimpleGrid/SimpleGrid.tsx · src/design-system/components/atoms/SimpleGrid/SimpleGrid.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed responsive grid",
      description: "Compare responsive columns and spacing across six stable indexed items.",
      code: basicCode,
      Component: SimpleGridExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
