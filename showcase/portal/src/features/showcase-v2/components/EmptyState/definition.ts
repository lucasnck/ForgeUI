"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { EmptyStateExample } from "./EmptyState.example";
const definition = {
  slug: "empty-state",
  name: "EmptyState",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/EmptyState.sc.md",
  description: "Composed feedback with a required Body and optional Header/Footer.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      source: "ComponentChildrenProps",
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
    },
    {
      name: "native attributes",
      type: 'Omit<ComponentPropsWithRef<"section">, "children" | "defaultValue">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "EmptyStateProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "EmptyStateProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "EmptyState owns its public regions and announcement/loading semantics. Header and Footer are optional; Body is required. Footer actions belong to the caller and update only Body feedback.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/EmptyState/EmptyState.tsx · src/design-system/components/molecules/EmptyState/EmptyState.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed feedback",
      description:
        "Exercise the footer actions and observe Body feedback; icon and announcement controls preserve the owner semantics.",
      code: basicCode,
      Component: EmptyStateExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
