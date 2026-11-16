"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridHeaderExample } from "./DataGridHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "DataGridHeader",
    slug: "data-grid-header",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/DataGridHeader.sc.md",
    description: "Generated indexed column headers inside a native table.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        description: "Not accepted: DataGridHeader generates column headers from the owner schema.",
        source: "DOMAttributes",
        defaultValue: null,
        required: false,
      },
      {
        name: "title",
        type: "string",
        description:
          "Native title on the rendered public part; repeated rows keep their original index.",
        source: "HTMLAttributes",
        defaultValue: null,
        required: false,
      },
      {
        name: "native attributes",
        type: "Native HTML attributes",
        description:
          "Native attributes/events/ref follow the public semantic owner; relationship IDs and generated content remain owned.",
        source: "React",
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
        description: "src/design-system/components/molecules/DataGridHeader/DataGridHeader.tsx",
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
      title: "DataGridHeader contextual region",
      description: "Generated indexed column headers inside a native table.",
      code: basicCode,
      Component: DataGridHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
