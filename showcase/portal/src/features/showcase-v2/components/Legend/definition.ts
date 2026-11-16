"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { LegendExample } from "./Legend.example";
const definition = {
  slug: "legend",
  name: "Legend",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Legend.sc.md",
  description: "A native field description connected to its control.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "LegendProps / inherited native root",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLLegendElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "LegendProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "LegendProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/Legend/Legend.tsx · src/design-system/components/molecules/Legend/Legend.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Connected field description",
      description:
        "Edit Children and inspect the native label or description relationship; static error text does not duplicate announcements.",
      code: basicCode,
      Component: LegendExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
