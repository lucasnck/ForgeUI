"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { BreadcrumbExample } from "./Breadcrumb.example";
const definition = {
  slug: "breadcrumb",
  name: "Breadcrumb",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Breadcrumb.sc.md",
  description: "A labeled location trail with one current final item.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description:
        "Direct public composition: BreadcrumbItems; exactly one current item must be last.",
      source: "ComponentChildrenProps",
    },
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible navigation name.",
      source: "BreadcrumbProps",
    },
    {
      name: "native attributes",
      type: "NativeSectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Native attributes, events and ref reach the semantic root; reserved role, naming and IDs remain owner-controlled.",
      source: "BreadcrumbProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "BreadcrumbProps",
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
      description: "src/design-system/components/molecules/Breadcrumb/Breadcrumb.tsx",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed location trail",
      description:
        "Toggle compact to omit item 2 without renumbering; ancestor links target local content and the last item remains current.",
      code: basicCode,
      Component: BreadcrumbExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
