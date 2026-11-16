"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { LoadingStateBodyExample } from "./LoadingStateBody.example";
const definition = {
  slug: "loading-state-body",
  name: "LoadingStateBody",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/LoadingStateBody.sc.md",
  description: "A contextual region inside its public owner.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "LoadingStateBodyProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "LoadingStateBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "LoadingStateBodyProps",
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
        "src/design-system/components/molecules/LoadingStateBody/LoadingStateBody.tsx · src/design-system/components/molecules/LoadingStateBody/LoadingStateBody.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "LoadingStateBody contextual region",
      description:
        "Edit the Body content inside the minimum public owner context. Loading remains caller-owned and can be canceled or toggled.",
      code: basicCode,
      Component: LoadingStateBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
