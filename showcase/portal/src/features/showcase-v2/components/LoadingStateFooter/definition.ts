"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { LoadingStateFooterExample } from "./LoadingStateFooter.example";
const definition = {
  slug: "loading-state-footer",
  name: "LoadingStateFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/LoadingStateFooter.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "LoadingStateFooterProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"footer">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "LoadingStateFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "LoadingStateFooterProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "LoadingState owns its public regions and announcement/loading semantics. This contextual part uses the minimum required Body sibling; see its aggregator.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/LoadingStateFooter/LoadingStateFooter.tsx · src/design-system/components/atoms/LoadingStateFooter/LoadingStateFooter.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "LoadingStateFooter contextual region",
      description:
        "Exercise the end-aligned footer actions and observe caller-owned Body feedback. Loading remains caller-owned and can be canceled or toggled.",
      code: basicCode,
      Component: LoadingStateFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
