"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { NavigationMenuExample, NavigationMenuNestedExample } from "./NavigationMenu.example";
import { basicCode, nestedCode } from "./usage-code";
const definition = {
  name: "NavigationMenu",
  slug: "navigation-menu",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/NavigationMenu.sc.md",
  description: "Native local destinations and public expandable navigation groups.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible navigation name.",
      source: "NavigationMenuProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Required Body; optional public Header and Footer.",
      source: "ComponentChildrenProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native title forwarded to the public region.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/NavigationMenu/NavigationMenu.tsx",
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
      title: "Flat local destinations",
      description: "Flat local destinations",
      code: basicCode,
      Component: NavigationMenuExample,
    },
    {
      id: "nested",
      title: "Hierarchical destinations",
      description: "Stable depth-first parent/child records and accepted expansion.",
      code: nestedCode,
      Component: NavigationMenuNestedExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
