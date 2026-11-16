"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { TooltipExample } from "./Tooltip.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "Tooltip",
  slug: "tooltip",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Tooltip.sc.md",
  description: "Passive supplementary content for one enabled focusable trigger.",
  properties: [
    {
      name: "content",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Nonempty passive supplementary description.",
      source: "TooltipProps",
    },
    {
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Accepted controlled visibility.",
      source: "ComponentOpenProps",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Initial uncontrolled state; this preview controls open.",
      source: "ComponentOpenProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shared passive hint transition opt-out.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "children",
      type: "ReactElement<TooltipTriggerProps>",
      required: true,
      defaultValue: null,
      description: "One enabled public Button with a forwarded ref.",
      source: "TooltipProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onOpenChange",
      signature: "(open: boolean) => void",
      description:
        "Visibility request from the canonical trigger/overlay/hint behavior; caller accepts state.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/Tooltip/Tooltip.tsx",
    },
    {
      id: "ownership",
      name: "Public composition",
      description:
        "One public ref-forwarding Button; content remains passive and is associated through aria-describedby only while visible.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Pointer and focus hint",
      description: "Pointer and focus hint",
      code: basicCode,
      Component: TooltipExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
