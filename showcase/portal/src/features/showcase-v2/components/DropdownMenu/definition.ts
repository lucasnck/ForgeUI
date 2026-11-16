"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DropdownMenuExample, DropdownMenuCompositeExample } from "./DropdownMenu.example";
import { basicCode, compositeCode } from "./usage-code";
const definition = {
  name: "DropdownMenu",
  slug: "dropdown-menu",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/DropdownMenu.sc.md",
  description: "Controlled action popup with default and composed public triggers.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description:
        "Default trigger label; the composite trigger derives its accessible name from its Text child.",
      source: "DropdownMenuProps",
    },
    {
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Controlled accepted open state in this example.",
      source: "ComponentOpenProps",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Initial uncontrolled state only; this controlled preview binds open instead.",
      source: "ComponentOpenProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Disables trigger requests.",
      source: "DropdownMenuProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shared motion opt-out.",
      source: "ComponentAnimationEffectProps",
    },
    {
      name: "animationEffect",
      type: "AnimationEffect",
      required: false,
      defaultValue: "fade",
      description: "Canonical surface motion recipe.",
      source: "ComponentAnimationEffectProps",
    },
    {
      name: "trigger",
      type: "ReactElement<ButtonProps>",
      required: false,
      defaultValue: null,
      description:
        "Default trigger or one public Button with noninteractive Avatar/Text content; select the scenario.",
      source: "DropdownMenuProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Exactly one direct public Menu.",
      source: "ComponentChildrenProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native title forwarded to the semantic owner.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [
    {
      name: "onOpenChange",
      signature: "(open: boolean) => void",
      description:
        "Controlled request from trigger/action/Escape/outside interaction; accepted close returns focus according to the DS overlay contract.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/DropdownMenu/DropdownMenu.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "Menu owns roving focus and action/dismissal. Header/Footer remain outside role=menu; items contain one native public Button and a plain label.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Default trigger",
      description: "Default trigger",
      code: basicCode,
      Component: DropdownMenuExample,
    },
    {
      id: "composite",
      title: "Composite trigger",
      description: "Single public Button with noninteractive Avatar/Text content.",
      code: compositeCode,
      Component: DropdownMenuCompositeExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
