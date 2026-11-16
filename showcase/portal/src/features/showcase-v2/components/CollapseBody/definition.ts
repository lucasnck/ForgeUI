"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { CollapseBodyExample } from "./CollapseBody.example";
const definition = {
  slug: "collapse-body",
  name: "CollapseBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/CollapseBody.sc.md",
  description: "Controlled disclosure with immediate visibility requests and focus repair.",
  properties: [
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "CollapseBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CollapseBodyProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CollapseBodyProps",
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
      description: "src/design-system/components/atoms/CollapseBody/CollapseBody.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "CollapseBody contextual region",
      description:
        "Isolate this region in its public owner; required contextual siblings stay hidden and actions retain their own feedback.",
      code: basicCode,
      Component: CollapseBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
