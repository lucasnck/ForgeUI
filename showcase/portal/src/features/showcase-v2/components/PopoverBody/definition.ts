"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PopoverBodyExample } from "./PopoverBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "PopoverBody",
  slug: "popover-body",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/PopoverBody.sc.md",
  description: "Named popup composed from public regions with visible dismissal.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description:
        "Editable content within the structured region; visible Close action remains present.",
      source: "Native attributes",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native title forwarded to the semantic region.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/PopoverBody/PopoverBody.tsx",
    },
    {
      id: "ownership",
      name: "Public composition",
      description:
        "Popover owns trigger/panel relationships, focus and overlay behavior. Required public Header/Body remain contextual; the target region includes a visible Close action.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "PopoverBody contextual region",
      description: "PopoverBody contextual region",
      code: basicCode,
      Component: PopoverBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
