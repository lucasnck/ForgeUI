"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { NavigationMenuSublistExample } from "./NavigationMenuSublist.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "NavigationMenuSublist",
  slug: "navigation-menu-sublist",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/NavigationMenuSublist.sc.md",
  description: "Native local destinations and public expandable navigation groups.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Structured direct NavigationMenuItem children.",
      source: "Native attributes",
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
      description:
        "src/design-system/components/atoms/NavigationMenuSublist/NavigationMenuSublist.tsx",
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
      Component: NavigationMenuSublistExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
