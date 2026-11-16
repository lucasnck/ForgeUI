"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DataGridRowExample } from "./DataGridRow.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "DataGridRow",
    slug: "data-grid-row",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/DataGridRow.sc.md",
    description: "Public table parts with stable record identities and caller-owned sorting.",
    properties: [
      {
        name: "rowKey",
        type: "string",
        description: "Required stable row identity, coordinated with the owner records.",
        source: "DataGridRowProps",
        defaultValue: null,
        required: true,
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Required public DataGridCell children, exactly one per owner column.",
        source: "DOMAttributes",
        defaultValue: null,
        required: true,
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
        description: "src/design-system/components/molecules/DataGridRow/DataGridRow.tsx",
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
      title: "DataGridRow contextual region",
      description: "Public table parts with stable record identities and caller-owned sorting.",
      code: basicCode,
      Component: DataGridRowExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
