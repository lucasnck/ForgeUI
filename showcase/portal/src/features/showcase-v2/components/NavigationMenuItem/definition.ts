"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { NavigationMenuItemExample } from "./NavigationMenuItem.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "NavigationMenuItem",
  slug: "navigation-menu-item",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/NavigationMenuItem.sc.md",
  description: "Native local destinations and public expandable navigation groups.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Group label prefix; retains original depth-first index 1.",
      source: "NavigationMenuItemProps",
    },
    {
      name: "href",
      type: "string",
      required: false,
      defaultValue: null,
      description:
        "Leaves use existing local destination IDs; fixture identity is not edited. Groups reject href.",
      source: "NavigationMenuItemProps",
    },
    {
      name: "current",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description:
        "Leaf aria-current=page follows the caller-owned local destination; groups reject current.",
      source: "NavigationMenuItemProps",
    },
    {
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Accepted controlled group expansion; leaves reject open-state props.",
      source: "ComponentOpenProps",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Initial uncontrolled group expansion; this preview uses controlled open.",
      source: "ComponentOpenProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Canonical expansion motion opt-out.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "A group owns one Sublist; leaves have no sublist.",
      source: "NativeCollectionItemProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Group native title prefix, indexed as Title 1.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [
    {
      name: "onOpenChange",
      signature: "(open: boolean) => void",
      description:
        "Group-only expansion request; caller accepts controlled state. Leaf navigation retains native anchor activation.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/NavigationMenuItem/NavigationMenuItem.tsx",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "Native nav/ul/li/link structure; groups own one Sublist and public Button. Caller tracks current destination; no disabled or selection API is invented.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Nested local navigation",
      description: "Nested local navigation",
      code: basicCode,
      Component: NavigationMenuItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
