"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridCellExample } from "./DataGridCell.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "DataGridCell",
    slug: "data-grid-cell",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/DataGridCell.sc.md",
    description: "Explicit public cells with column and optional row-header relationships.",
    properties: [
      {
        name: "rowKey",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Required stable owner row identity; not edited independently of the rows.",
        source: "DataGridCellProps",
      },
      {
        name: "columnKey",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Required owner column identity; not edited independently of columns.",
        source: "DataGridCellProps",
      },
      {
        name: "rowHeader",
        type: "boolean",
        required: false,
        defaultValue: null,
        description:
          "Must agree with the column; this editor updates the column and cells together.",
        source: "DataGridCellProps",
      },
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Editable cell text followed by its original one-based record index.",
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
        description: "src/design-system/components/atoms/DataGridCell/DataGridCell.tsx",
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
      title: "DataGridCell contextual region",
      description: "Explicit public cells with column and optional row-header relationships.",
      code: basicCode,
      Component: DataGridCellExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
