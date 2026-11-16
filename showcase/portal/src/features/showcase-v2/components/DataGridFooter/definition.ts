"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridFooterExample } from "./DataGridFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "DataGridFooter",
    slug: "data-grid-footer",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/DataGridFooter.sc.md",
    description: "Row-count summary and caller-owned pagination outside the table.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description:
          "Public compound composition. Structured children retain required parts and semantic controls.",
        source: "DOMAttributes",
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: null,
        description: "Native title of the demonstrated part.",
        source: "HTMLAttributes",
      },
      {
        name: "native attributes",
        type: "Native HTML attributes",
        required: false,
        defaultValue: null,
        description:
          "Native attributes, events and refs are delegated to the semantic owner. Owned structural relationships remain authoritative.",
        source: "React",
      },
    ],
    methods: [],
    events: [],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/atoms/DataGridFooter/DataGridFooter.tsx",
      },
      {
        id: "ownership",
        name: "Ownership",
        description:
          "Stable indexed fixtures; sorting and paging belong to the caller. Cells use only public DataGrid context.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "DataGridFooter contextual region",
      description: "Row-count summary and caller-owned pagination outside the table.",
      code: basicCode,
      Component: DataGridFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
