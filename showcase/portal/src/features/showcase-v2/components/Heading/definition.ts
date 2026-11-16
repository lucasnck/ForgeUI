"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { HeadingExample } from "./Heading.example";
const definition = {
  slug: "heading",
  name: "Heading",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Heading.sc.md",
  description: "Semantic text with independent visual size and weight.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "HeadingProps / inherited native root",
    },
    {
      name: "level",
      type: "ComponentHeadingLevel",
      required: true,
      source: "ComponentHeadingLevelProps",
      defaultValue: null,
      description: "Semantic heading level, independent of visual size.",
    },
    {
      name: "size",
      type: "ComponentTextSize",
      required: false,
      source: "ComponentTextSizeProps",
      defaultValue: null,
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "weight",
      type: "ComponentFontWeight",
      required: false,
      source: "ComponentFontWeightProps",
      defaultValue: null,
      description: "Canonical font weight.",
    },
    {
      name: "tone",
      type: "ComponentTextTone",
      required: false,
      source: "ComponentTextToneProps",
      defaultValue: null,
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "HeadingProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "HeadingProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Heading/Heading.tsx · src/design-system/components/atoms/Heading/Heading.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Semantic typography",
      description:
        "Edit Children or load long content; compare the semantic element, visual size, weight and wrapping.",
      code: basicCode,
      Component: HeadingExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
