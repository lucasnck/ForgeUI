"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AlertExample } from "./Alert.example";
const definition = {
  slug: "alert",
  name: "Alert",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Alert.sc.md",
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
      name: "announcement",
      type: "AnnouncementPoliteness",
      required: false,
      source: "AlertProps",
      defaultValue: "polite",
      description:
        "Actual off/polite/assertive body announcement policy; footers stay outside live content.",
    },
    {
      name: "native attributes",
      type: 'Omit<ComponentPropsWithRef<"section">, "children" | "defaultValue">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "AlertProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AlertProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "Alert owns its public regions and announcement/loading semantics. Header and Footer are optional; Body is required. Footer actions belong to the caller and update only Body feedback.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/Alert/Alert.tsx · src/design-system/components/molecules/Alert/Alert.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed feedback",
      description:
        "Exercise the footer actions and observe Body feedback; icon and announcement controls preserve the owner semantics.",
      code: basicCode,
      Component: AlertExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
