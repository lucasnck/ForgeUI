"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { NavigationMenuHeaderExample } from "./NavigationMenuHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "NavigationMenuHeader",
  slug: "navigation-menu-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/NavigationMenuHeader.sc.md",
  description: "Native local destinations and public expandable navigation groups.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Public content slot.",
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
        "src/design-system/components/atoms/NavigationMenuHeader/NavigationMenuHeader.tsx",
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
      title: "NavigationMenuHeader contextual region",
      description: "NavigationMenuHeader contextual region",
      code: basicCode,
      Component: NavigationMenuHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
