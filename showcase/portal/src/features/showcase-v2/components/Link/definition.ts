"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { LinkExample } from "./Link.example";
const definition = {
  slug: "link",
  name: "Link",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Link.sc.md",
  description: "Native navigation to a local preview target.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "LinkProps / inherited native root",
    },
    {
      name: "native attributes",
      type: "AnchorHTMLAttributes<HTMLAnchorElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "LinkProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "LinkProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Link/Link.tsx · src/design-system/components/atoms/Link/Link.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Local anchor navigation",
      description: "Edit Children and activate the link to its named local target.",
      code: basicCode,
      Component: LinkExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
