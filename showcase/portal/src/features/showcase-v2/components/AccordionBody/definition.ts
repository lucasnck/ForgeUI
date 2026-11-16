"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AccordionBodyExample } from "./AccordionBody.example";
const definition = {
  slug: "accordion-body",
  name: "AccordionBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AccordionBody.sc.md",
  description: "Stable indexed expansion through the public owner and regions.",
  properties: [
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "AccordionBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionBodyProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AccordionBodyProps",
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
      description: "src/design-system/components/atoms/AccordionBody/AccordionBody.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AccordionBody contextual region",
      description:
        "Isolate this region in its public owner; required contextual siblings stay hidden and actions retain their own feedback.",
      code: basicCode,
      Component: AccordionBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
