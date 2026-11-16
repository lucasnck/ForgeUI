"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridColumnHeaderExample } from "./DataGridColumnHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "DataGridColumnHeader",
    slug: "data-grid-column-header",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/DataGridColumnHeader.sc.md",
    description: "Generated sortable column headers configured through the public schema.",
    properties: [
      {
        name: "columnKey",
        type: "string",
        description: "Stable column identity, supplied by the owner schema.",
        source: "DataGridColumnHeaderProps",
        defaultValue: null,
        required: true,
      },
      {
        name: "label",
        type: "string",
        description:
          "Generated from column.header. The editable prefix preserves original column indices.",
        source: "DataGridColumnHeaderProps via DataGridColumn.header",
        defaultValue: null,
        required: true,
      },
      {
        name: "native attributes",
        type: "NativeTableCellProps",
        description:
          "Generated columns expose their schema fields; arbitrary native cell attributes/children are not injected through DataGridHeader.",
        source: "DataGridColumnHeaderProps",
        defaultValue: null,
        required: false,
      },
    ],
    methods: [],
    events: [],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description:
          "src/design-system/components/molecules/DataGridColumnHeader/DataGridColumnHeader.tsx",
      },
      {
        id: "ownership",
        name: "Public composition",
        description:
          "DataGrid owns table relationships; caller sorting preserves shared fixture identities. Generated headers are configured through columns.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "DataGridColumnHeader contextual region",
      description: "Generated sortable column headers configured through the public schema.",
      code: basicCode,
      Component: DataGridColumnHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
