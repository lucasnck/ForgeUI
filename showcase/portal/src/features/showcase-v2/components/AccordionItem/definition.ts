"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AccordionItemExample } from "./AccordionItem.example";
const definition = {
  slug: "accordion-item",
  name: "AccordionItem",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/AccordionItem.sc.md",
  description: "Stable indexed expansion through the public owner and regions.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Direct public Header/Body/Footer regions under this owner.",
      source: "ComponentChildrenProps",
    },
    {
      name: "value",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonempty unique identity within Accordion.",
      source: "AccordionItemProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Prevents interaction through the owning public contract.",
      source: "AccordionItemProps",
    },
    {
      name: "native attributes",
      type: "NativeCollectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "AccordionItemProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionItemProps",
    },
  ],
  methods: [],
  events: [],
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
      description: "src/design-system/components/molecules/AccordionItem/AccordionItem.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed expansion",
      description:
        "Expand single or multiple indexed items, disable item 2, and close a focused footer action to verify focus repair.",
      code: basicCode,
      Component: AccordionItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
