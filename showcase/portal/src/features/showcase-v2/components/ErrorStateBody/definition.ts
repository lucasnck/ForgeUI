"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ErrorStateBodyExample } from "./ErrorStateBody.example";
const definition = {
  slug: "error-state-body",
  name: "ErrorStateBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ErrorStateBody.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "ErrorStateBodyProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "ErrorStateBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ErrorStateBodyProps",
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
        "src/design-system/components/atoms/ErrorStateBody/ErrorStateBody.tsx · src/design-system/components/atoms/ErrorStateBody/ErrorStateBody.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "ErrorStateBody contextual region",
      description: "Edit the Body content inside the minimum public owner context.",
      code: basicCode,
      Component: ErrorStateBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
