"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { CollapseExample } from "./Collapse.example";
const definition = {
  slug: "collapse",
  name: "Collapse",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Collapse.sc.md",
  description: "Controlled disclosure with immediate visibility requests and focus repair.",
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
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Controlled visibility; rejected requests keep the accepted state.",
      source: "ComponentOpenProps",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Initial uncontrolled visibility.",
      source: "ComponentOpenProps",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      required: false,
      defaultValue: null,
      description: "Requests the next visibility; caller accepts controlled changes.",
      source: "ComponentOpenProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Prevents interaction through the owning public contract.",
      source: "CollapseProps",
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
      source: "CollapseProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CollapseProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onOpenChange",
      signature: "(open: boolean) => void",
      description:
        "Reports a visibility request immediately. Controlled props remain authoritative; closing repairs focus from within the panel.",
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
      description: "src/design-system/components/molecules/Collapse/Collapse.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Visible disclosure",
      description:
        "Open by pointer or keyboard, reject a controlled request, and compare animation opt-out. Cancel closes while Save reports independently.",
      code: basicCode,
      Component: CollapseExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
