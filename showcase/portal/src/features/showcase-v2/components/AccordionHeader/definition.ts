"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AccordionHeaderExample } from "./AccordionHeader.example";
const definition = {
  slug: "accordion-header",
  name: "AccordionHeader",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AccordionHeader.sc.md",
  description: "Stable indexed expansion through the public owner and regions.",
  properties: [
    {
      name: "native attributes",
      type: "NativeCompoundTriggerProps",
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "AccordionHeaderProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionHeaderProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionHeaderProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionHeaderProps",
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
      description: "src/design-system/components/atoms/AccordionHeader/AccordionHeader.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AccordionHeader contextual region",
      description:
        "Isolate this region in its public owner; required contextual siblings stay hidden and actions retain their own feedback.",
      code: basicCode,
      Component: AccordionHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
