"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { MenuExample } from "./Menu.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "Menu",
  slug: "menu",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Menu.sc.md",
  description: "Contextual action menu with indexed labels and native enabled actions.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible name for the action menu.",
      source: "MenuProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shared animation opt-out.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Required public MenuBody with direct MenuItems; optional Header/Footer.",
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
      name: "onAction",
      signature: "(value: string) => void",
      description: "One activation request for an enabled action; does not establish selection.",
    },
    {
      name: "onDismiss",
      signature: "() => void",
      description:
        "Dismissal notification after action or Escape; a standalone Menu remains mounted.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/Menu/Menu.tsx",
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
      Component: MenuExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
