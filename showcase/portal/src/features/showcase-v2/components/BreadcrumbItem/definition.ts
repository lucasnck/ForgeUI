"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { BreadcrumbItemExample } from "./BreadcrumbItem.example";
const definition = {
  slug: "breadcrumb-item",
  name: "BreadcrumbItem",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/BreadcrumbItem.sc.md",
  description: "Ancestor links and the current page within the public breadcrumb owner.",
  properties: [
    {
      name: "current",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: 'Renders the final non-link item with aria-current="page".',
      source: "BreadcrumbItemProps",
    },
    {
      name: "href",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Required nonempty href for each ancestor; current item renders a span.",
      source: "BreadcrumbItemProps",
    },
    {
      name: "native attributes",
      type: "NativeCollectionItemProps",
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "BreadcrumbItemProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "BreadcrumbItemProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "BreadcrumbItemProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "Part pages use the real owner and required siblings. Collection indices and keys remain stable under caller filtering and reordering; no selection/listbox API is added.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/BreadcrumbItem/BreadcrumbItem.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed location trail",
      description:
        "Toggle compact to omit item 2 without renumbering; ancestor links target local content and the last item remains current.",
      code: basicCode,
      Component: BreadcrumbItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
