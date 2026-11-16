"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { EmptyStateFooterExample } from "./EmptyStateFooter.example";
const definition = {
  slug: "empty-state-footer",
  name: "EmptyStateFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/EmptyStateFooter.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "EmptyStateFooterProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"footer">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "EmptyStateFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "EmptyStateFooterProps",
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
        "src/design-system/components/atoms/EmptyStateFooter/EmptyStateFooter.tsx · src/design-system/components/atoms/EmptyStateFooter/EmptyStateFooter.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "EmptyStateFooter contextual region",
      description:
        "Exercise the end-aligned footer actions and observe caller-owned Body feedback.",
      code: basicCode,
      Component: EmptyStateFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
