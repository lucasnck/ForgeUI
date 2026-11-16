"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { StackExample } from "./Stack.example";
const definition = {
  slug: "stack",
  name: "Stack",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Stack.sc.md",
  description: "Spacing, composition and responsive layout through the public DS contract.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "StackProps / inherited native root",
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
      name: "as",
      type: "LayoutElement",
      required: false,
      source: "StackProps",
      defaultValue: "div",
      description: "Supported semantic root element.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "StackProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "StackProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Stack/Stack.tsx · src/design-system/components/atoms/Stack/Stack.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed content layout",
      description:
        "Change spacing and supported layout settings; Cancel and Save report independent caller actions.",
      code: basicCode,
      Component: StackExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
