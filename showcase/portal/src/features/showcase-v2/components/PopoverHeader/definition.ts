"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PopoverHeaderExample } from "./PopoverHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "PopoverHeader",
  slug: "popover-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/PopoverHeader.sc.md",
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
      name: "divider",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Canonical region separator; not a DOM attribute.",
      source: "PopoverHeaderProps",
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
      description: "src/design-system/components/atoms/PopoverHeader/PopoverHeader.tsx",
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
      title: "PopoverHeader contextual region",
      description: "PopoverHeader contextual region",
      code: basicCode,
      Component: PopoverHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
