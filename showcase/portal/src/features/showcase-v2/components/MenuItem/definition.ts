"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { MenuItemExample } from "./MenuItem.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "MenuItem",
  slug: "menu-item",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/MenuItem.sc.md",
  description: "Contextual action menu with indexed labels and native enabled actions.",
  properties: [
    {
      name: "value",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Stable item identity; not edited across records.",
      source: "MenuItemProps",
    },
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible name; indexed option prefixes preserve original one-based identity.",
      source: "MenuItemProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Edits option 1 only; option 2 remains the disabled keyboard fixture.",
      source: "MenuItemProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native list item title prefix, followed by the original index.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/MenuItem/MenuItem.tsx",
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
      title: "Indexed action menu",
      description: "Indexed action menu",
      code: basicCode,
      Component: MenuItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
