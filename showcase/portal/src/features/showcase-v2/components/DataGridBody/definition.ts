"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridBodyExample } from "./DataGridBody.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "DataGridBody",
    slug: "data-grid-body",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/DataGridBody.sc.md",
    description: "Owner-generated table rows under the public body.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        description:
          "Optional matching public DataGridRow children. This example uses the owner-generated rows.",
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
        description: "src/design-system/components/molecules/DataGridBody/DataGridBody.tsx",
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
      title: "DataGridBody contextual region",
      description: "Owner-generated table rows under the public body.",
      code: basicCode,
      Component: DataGridBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
