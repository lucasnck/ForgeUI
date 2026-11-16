"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { PaginationExample } from "./Pagination.example";
const definition = {
  slug: "pagination",
  name: "Pagination",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Pagination.sc.md",
  description: "Controlled twelve-page navigation with caller-owned windows and passive gaps.",
  properties: [
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Prevents interaction through the owning public contract.",
      source: "PaginationProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Direct PaginationItem/PaginationEllipsis or keyed fragments.",
      source: "ComponentChildrenProps",
    },
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonempty navigation name.",
      source: "PaginationProps",
    },
    {
      name: "page",
      type: "number",
      required: true,
      defaultValue: null,
      description: "Current integer page in 1..pageCount.",
      source: "PaginationProps",
    },
    {
      name: "pageCount",
      type: "number",
      required: true,
      defaultValue: null,
      description: "Positive integer total; the fixture uses twelve pages.",
      source: "PaginationProps",
    },
    {
      name: "onPageChange",
      type: "(page: number) => void",
      required: true,
      defaultValue: null,
      description: "Requests a different valid page; identical/disabled requests are suppressed.",
      source: "PaginationProps",
    },
    {
      name: "native attributes",
      type: "NativeSectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Allowed native attributes/events/ref follow the canonical type; owner-reserved IDs, expanded/current semantics and trigger type remain owned.",
      source: "PaginationProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PaginationProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onPageChange",
      signature: "(page: number) => void",
      description:
        "Reports a valid different page; accepted page props determine aria-current. Page windows remain caller-owned.",
    },
  ],
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
      description: "src/design-system/components/molecules/Pagination/Pagination.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Controlled pagination",
      description:
        "Start at page 6; navigate endpoints, reject a request and observe the accepted current page and passive gaps.",
      code: basicCode,
      Component: PaginationExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
