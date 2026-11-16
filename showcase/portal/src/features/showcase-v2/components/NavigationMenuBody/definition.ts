"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { NavigationMenuBodyExample } from "./NavigationMenuBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "NavigationMenuBody",
  slug: "navigation-menu-body",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/NavigationMenuBody.sc.md",
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
      description: "src/design-system/components/atoms/NavigationMenuBody/NavigationMenuBody.tsx",
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
      title: "NavigationMenuBody contextual region",
      description: "NavigationMenuBody contextual region",
      code: basicCode,
      Component: NavigationMenuBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
