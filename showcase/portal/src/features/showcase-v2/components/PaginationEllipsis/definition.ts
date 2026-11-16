"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { PaginationEllipsisExample } from "./PaginationEllipsis.example";
const definition = {
  slug: "pagination-ellipsis",
  name: "PaginationEllipsis",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/PaginationEllipsis.sc.md",
  description: "Controlled twelve-page navigation with caller-owned windows and passive gaps.",
  properties: [
    {
      name: "native attributes",
      type: "NativePaginationEllipsisProps",
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned. Ellipsis accepts only its passive whitelist.",
      source: "PaginationEllipsisProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PaginationEllipsisProps",
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
      description: "src/design-system/components/atoms/PaginationEllipsis/PaginationEllipsis.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Controlled pagination",
      description:
        "Start at page 6; navigate endpoints, reject a request and observe the accepted current page and passive gaps.",
      code: basicCode,
      Component: PaginationEllipsisExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
