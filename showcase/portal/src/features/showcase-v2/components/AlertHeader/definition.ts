"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AlertHeaderExample } from "./AlertHeader.example";
const definition = {
  slug: "alert-header",
  name: "AlertHeader",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AlertHeader.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "AlertHeaderProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"header">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "AlertHeaderProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AlertHeaderProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "Alert owns its public regions and announcement/loading semantics. This contextual part uses the minimum required Body sibling; see its aggregator.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/AlertHeader/AlertHeader.tsx · src/design-system/components/atoms/AlertHeader/AlertHeader.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AlertHeader contextual region",
      description:
        "Edit the title and toggle its decorative icon. The required Body sibling is hidden in this focused preview.",
      code: basicCode,
      Component: AlertHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
