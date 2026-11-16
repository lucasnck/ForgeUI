"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { EmptyStateHeaderExample } from "./EmptyStateHeader.example";
const definition = {
  slug: "empty-state-header",
  name: "EmptyStateHeader",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/EmptyStateHeader.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "EmptyStateHeaderProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"header">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "EmptyStateHeaderProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "EmptyStateHeaderProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "EmptyState owns its public regions and announcement/loading semantics. This contextual part uses the minimum required Body sibling; see its aggregator.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/EmptyStateHeader/EmptyStateHeader.tsx · src/design-system/components/atoms/EmptyStateHeader/EmptyStateHeader.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "EmptyStateHeader contextual region",
      description:
        "Edit the title and toggle its decorative icon. The required Body sibling is hidden in this focused preview.",
      code: basicCode,
      Component: EmptyStateHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
