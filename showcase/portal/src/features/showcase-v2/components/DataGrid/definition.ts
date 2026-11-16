"use client";
import { basicCode, filteredCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridExample, DataGridFilteredExample } from "./DataGrid.example";
const definition = {
  slug: "data-grid",
  name: "DataGrid",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/DataGrid.sc.md",
  description: "DataGrid public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Sortable collection",
      description:
        "Uses the public component contract with caller-owned settings and event feedback.",
      code: basicCode,
      Component: DataGridExample,
    },
    {
      id: "filtered-paginated",
      title: "Filtered paginated collection",
      description:
        "Composes SearchInput, Pagination and Text with caller-owned filtering and five-row pages; searching resets the current page.",
      code: filteredCode,
      Component: DataGridFilteredExample,
    },
  ],
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible name for the table and its horizontal viewport.",
      source: "DataGridProps",
    },
    {
      name: "rows",
      type: "readonly Row[]",
      required: true,
      defaultValue: null,
      description:
        "Caller-provided visible rows; the grid does not fetch, sort, filter or paginate them.",
      source: "DataGridProps",
    },
    {
      name: "columns",
      type: "readonly DataGridColumn<Row>[]",
      required: true,
      defaultValue: null,
      description:
        "Nonempty unique keys with header, renderCell and optional rowHeader, sortable, sortLabel and align.",
      source: "DataGridProps",
    },
    {
      name: "getRowKey",
      type: "(row: Row) => string",
      required: true,
      defaultValue: null,
      description: "Returns a stable unique nonempty key.",
      source: "DataGridProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Public DataGridHeader, DataGridBody and optional DataGridFooter regions.",
      source: "DataGridProps",
    },
    {
      name: "sort",
      type: "DataGridSort | null",
      required: false,
      defaultValue: "null",
      description: "Current columnKey and ascending/descending direction.",
      source: "DataGridProps",
    },
    {
      name: "onSortChange",
      type: "(sort: DataGridSort) => void",
      required: false,
      defaultValue: null,
      description: "Required for sortable columns; caller supplies ordered rows.",
      source: "DataGridProps",
    },
    {
      name: "emptyContent",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Empty-state content spanning all columns.",
      source: "DataGridProps",
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Fills available width.",
      source: "DataGridProps / canonical capability contract",
    },
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      defaultValue: "md",
      description: "xs, sm, md, lg or xl.",
      source: "DataGridProps / canonical capability contract",
    },
    {
      name: "showBorders",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shows the outer border.",
      source: "DataGridProps",
    },
    {
      name: "showColumnLines",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Shows separators between columns.",
      source: "DataGridProps",
    },
    {
      name: "showRowLines",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shows separators between rows.",
      source: "DataGridProps",
    },
    {
      name: "rowAlternationEnabled",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Alternates row surfaces.",
      source: "DataGridProps",
    },
    {
      name: "native attributes",
      type: "NativeCollectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Native div-compatible root attributes, className and ref; label names the inner table/viewport.",
      source: "DataGridProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "DataGridProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onSortChange",
      signature: "(sort: DataGridSort) => void",
      description:
        "Reports the column and toggled direction once; it does not mutate or reorder input rows.",
    },
  ],
  features: [
    {
      id: "composition",
      name: "Public table parts",
      description:
        "DataGridHeader and DataGridBody form a native table; optional DataGridFooter is outside the viewport.",
    },
    {
      id: "caller",
      name: "Caller-owned operations",
      description:
        "SearchInput filtering, Pagination slicing and visible/total Text are example composition. Selection, editing and virtualization are not built-in APIs.",
    },
    {
      id: "fixtures",
      name: "Stable indexed fixtures",
      description:
        "12 records retain item-1…item-12 identity and original Title N / Description N labels through ordering and pagination. Headers are Header 1 and Header 2.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
