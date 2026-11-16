"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AlertFooterExample } from "./AlertFooter.example";
const definition = {
  slug: "alert-footer",
  name: "AlertFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AlertFooter.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "AlertFooterProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"footer">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "AlertFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AlertFooterProps",
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
        "src/design-system/components/atoms/AlertFooter/AlertFooter.tsx · src/design-system/components/atoms/AlertFooter/AlertFooter.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AlertFooter contextual region",
      description:
        "Exercise the end-aligned footer actions and observe caller-owned Body feedback.",
      code: basicCode,
      Component: AlertFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
