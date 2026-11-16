"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PopoverExample } from "./Popover.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "Popover",
  slug: "popover",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Popover.sc.md",
  description: "Named popup composed from public regions with visible dismissal.",
  properties: [
    {
      name: "triggerLabel",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Default native trigger label.",
      source: "PopoverProps",
    },
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible dialog name.",
      source: "PopoverProps",
    },
    {
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Accepted controlled popup state.",
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
      description: "Shared presence opt-out.",
      source: "ComponentAnimationEffectProps",
    },
    {
      name: "animationEffect",
      type: "AnimationEffect",
      required: false,
      defaultValue: "fade",
      description: "Canonical surface animation recipe.",
      source: "ComponentAnimationEffectProps",
    },
    {
      name: "trigger",
      type: "ReactElement<ButtonProps>",
      required: false,
      defaultValue: null,
      description:
        "Optional public Button/IconButton; required native disclosure props remain owned by Popover.",
      source: "PopoverProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Required Header and Body, optional Footer.",
      source: "ComponentChildrenProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native title forwarded to the semantic region.",
      source: "Native attributes",
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
      description: "src/design-system/components/molecules/Popover/Popover.tsx",
    },
    {
      id: "ownership",
      name: "Public composition",
      description:
        "Popover owns trigger/panel relationships, focus and overlay behavior. Required public Header/Body remain contextual; the target region includes a visible Close action.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Named composed popover",
      description: "Named composed popover",
      code: basicCode,
      Component: PopoverExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
