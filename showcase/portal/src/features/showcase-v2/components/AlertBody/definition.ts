"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AlertBodyExample } from "./AlertBody.example";
const definition = {
  slug: "alert-body",
  name: "AlertBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AlertBody.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "AlertBodyProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "AlertBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AlertBodyProps",
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
        "src/design-system/components/atoms/AlertBody/AlertBody.tsx · src/design-system/components/atoms/AlertBody/AlertBody.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AlertBody contextual region",
      description: "Edit the Body content inside the minimum public owner context.",
      code: basicCode,
      Component: AlertBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
