"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { PaginationItemExample } from "./PaginationItem.example";
const definition = {
  slug: "pagination-item",
  name: "PaginationItem",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/PaginationItem.sc.md",
  description: "Controlled twelve-page navigation with caller-owned windows and passive gaps.",
  properties: [
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description:
        "Selects the owned motion recipe; semantic updates stay immediate and reduced motion is respected.",
      source: "ComponentAnimatedProps",
    },
    {
      name: "page",
      type: "number",
      required: true,
      defaultValue: null,
      description: "Required target within the parent range.",
      source: "PaginationItemProps",
    },
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required accessible page name.",
      source: "PaginationItemProps",
    },
    {
      name: "native attributes",
      type: "NativeCollectionButtonProps",
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "PaginationItemProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PaginationItemProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PaginationItemProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PaginationItemProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "Ellipses are aria-hidden, nonfocusable spans without action handlers. Page labels retain their original numeric index.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/PaginationItem/PaginationItem.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Controlled pagination",
      description:
        "Start at page 6; navigate endpoints, reject a request and observe the accepted current page and passive gaps.",
      code: basicCode,
      Component: PaginationItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
