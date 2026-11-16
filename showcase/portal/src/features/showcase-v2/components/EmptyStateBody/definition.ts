"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { EmptyStateBodyExample } from "./EmptyStateBody.example";
const definition = {
  slug: "empty-state-body",
  name: "EmptyStateBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/EmptyStateBody.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "EmptyStateBodyProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "EmptyStateBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "EmptyStateBodyProps",
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
        "src/design-system/components/atoms/EmptyStateBody/EmptyStateBody.tsx · src/design-system/components/atoms/EmptyStateBody/EmptyStateBody.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "EmptyStateBody contextual region",
      description: "Edit the Body content inside the minimum public owner context.",
      code: basicCode,
      Component: EmptyStateBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
