"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ErrorStateFooterExample } from "./ErrorStateFooter.example";
const definition = {
  slug: "error-state-footer",
  name: "ErrorStateFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ErrorStateFooter.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "ErrorStateFooterProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"footer">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "ErrorStateFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ErrorStateFooterProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "ErrorState owns its public regions and announcement/loading semantics. This contextual part uses the minimum required Body sibling; see its aggregator.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/ErrorStateFooter/ErrorStateFooter.tsx · src/design-system/components/atoms/ErrorStateFooter/ErrorStateFooter.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "ErrorStateFooter contextual region",
      description:
        "Exercise the end-aligned footer actions and observe caller-owned Body feedback.",
      code: basicCode,
      Component: ErrorStateFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
