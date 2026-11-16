"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { MenuHeaderExample } from "./MenuHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "MenuHeader",
  slug: "menu-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/MenuHeader.sc.md",
  description: "Contextual action menu with indexed labels and native enabled actions.",
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
      description: "Native title forwarded to the semantic owner.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/MenuHeader/MenuHeader.tsx",
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
      title: "MenuHeader contextual region",
      description: "MenuHeader contextual region",
      code: basicCode,
      Component: MenuHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
