"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { DividerExample } from "./Divider.example";
const definition = {
  slug: "divider",
  name: "Divider",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Divider.sc.md",
  description: "A separator between spaced content regions.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "DividerProps / inherited native root",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLHRElement> & RefAttributes<HTMLHRElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "DividerProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "DividerProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Divider/Divider.tsx · src/design-system/components/atoms/Divider/Divider.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Divider public composition",
      description: "Toggle the separator without leaving an empty wrapper.",
      code: basicCode,
      Component: DividerExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
