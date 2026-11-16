"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AccordionExample } from "./Accordion.example";
const definition = {
  slug: "accordion",
  name: "Accordion",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Accordion.sc.md",
  description: "Stable indexed expansion through the public owner and regions.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description:
        "Direct AccordionItems with stable unique values; each item owns its public regions.",
      source: "ComponentChildrenProps",
    },
    {
      name: "level",
      type: "ComponentHeadingLevel",
      required: true,
      defaultValue: null,
      description: "Required semantic level of each owner-provided Heading.",
      source: "ComponentHeadingLevelProps",
    },
    {
      name: "value",
      type: "readonly string[]",
      required: false,
      defaultValue: null,
      description: "Controlled expanded item identities.",
      source: "ComponentDisclosureGroupProps",
    },
    {
      name: "defaultValue",
      type: "readonly string[]",
      required: false,
      defaultValue: "[]",
      description: "Initial uncontrolled expanded identities.",
      source: "ComponentDisclosureGroupProps",
    },
    {
      name: "onValueChange",
      type: "(value: readonly string[]) => void",
      required: false,
      defaultValue: null,
      description: "Requests expanded identities.",
      source: "ComponentDisclosureGroupProps",
    },
    {
      name: "multiple",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Allows more than one expanded item.",
      source: "ComponentDisclosureGroupProps",
    },
    {
      name: "collapsible",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Allows a trigger to close its expanded item.",
      source: "ComponentDisclosureGroupProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Prevents interaction through the owning public contract.",
      source: "ComponentDisclosureGroupProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description:
        "Selects the owned motion recipe; semantic updates stay immediate and reduced motion is respected.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "native attributes",
      type: "NativeCollectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "AccordionProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onValueChange",
      signature: "(value: readonly string[]) => void",
      description:
        "Reports next expanded stable values; caller accepts them. Single mode keeps one identity; disabled items do not toggle.",
    },
  ],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        'Header owns a native trigger; no nested Heading/button is added. Part pages retain hidden contextual siblings and link to the full owner. Footer actions use an end-aligned wrapping Inline gap="2".',
    },
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/Accordion/Accordion.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed expansion",
      description:
        "Expand single or multiple indexed items, disable item 2, and close a focused footer action to verify focus repair.",
      code: basicCode,
      Component: AccordionExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
