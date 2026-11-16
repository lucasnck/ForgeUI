"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { FormBodyExample } from "./FormBody.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "FormBody",
    slug: "form-body",
    level: "atoms",
    specification: "docs/sc/ds/components/atoms/FormBody.sc.md",
    description: "Native field content and busy state in the public Form body.",
    properties: [
      {
        name: "children",
        type: "ReactNode",
        required: false,
        defaultValue: null,
        description: "Editable text slot, retaining its public Heading or Text composition.",
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
        description: "src/design-system/components/atoms/FormBody/FormBody.tsx",
      },
      {
        id: "ownership",
        name: "Ownership",
        description:
          "Form owns native submission; fixture state and actions belong to the caller. No backend or secondary validation engine.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "FormBody contextual region",
      description: "Native field content and busy state in the public Form body.",
      code: basicCode,
      Component: FormBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
