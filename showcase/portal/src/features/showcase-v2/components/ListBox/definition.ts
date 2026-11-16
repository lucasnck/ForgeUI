"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ListBoxExample, ListBoxFilteredExample } from "./ListBox.example";
import { basicCode, filteredCode } from "./usage-code";
const definition = {
  ...{
    name: "ListBox",
    slug: "list-box",
    level: "organisms",
    specification: "docs/sc/ds/components/organisms/ListBox.sc.md",
    description: "Single selection and filtered multiple selection with native submitted values.",
    properties: [
      {
        name: "label",
        type: "string",
        description: "Nonempty accessible listbox name.",
        source: "ListBoxProps",
        defaultValue: null,
        required: true,
      },
      {
        name: "options",
        type: "readonly ListBoxOption[]",
        description:
          "Stable indexed option descriptors. Filtering is caller-owned and retains original values.",
        source: "ListBoxProps",
        defaultValue: null,
        required: true,
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Direct public ListBoxHeader/Body/Footer parts. Body is required.",
        source: "DOMAttributes",
        defaultValue: null,
        required: true,
      },
      {
        name: "value",
        type: "readonly string[]",
        description:
          "Controlled accepted keys. Only visible enabled keys are emitted by native hidden fields.",
        source: "ComponentSelectionProps",
        defaultValue: null,
        required: false,
      },
      {
        name: "defaultValue",
        type: "readonly string[]",
        description: "Initial uncontrolled keys; this preview uses controlled value.",
        source: "ComponentSelectionProps",
        defaultValue: "[]",
        required: false,
      },
      {
        name: "onValueChange",
        type: "(value: readonly string[]) => void",
        description: "Requests the next accepted selection.",
        source: "ComponentSelectionProps",
        defaultValue: null,
        required: false,
      },
      {
        name: "selectionMode",
        type: "SelectionMode",
        description:
          "Single or multiple selection; filtering does not delete retained caller keys.",
        source: "ListBoxProps",
        defaultValue: "single",
        required: false,
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Prevents owned selection and disables associated hidden fields.",
        source: "ListBoxProps",
        defaultValue: "false",
        required: false,
      },
      {
        name: "invalid",
        type: "boolean",
        description: "Applies aria-invalid to the listbox body.",
        source: "ComponentInvalidProps",
        defaultValue: "false",
        required: false,
      },
      {
        name: "animated",
        type: "boolean",
        description: "Selects the shared state-feedback recipe; semantics remain immediate.",
        source: "ComponentAnimatedProps",
        defaultValue: "true",
        required: false,
      },
      {
        name: "name",
        type: "string",
        description: "Name used by the actual native hidden form fields.",
        source: "ListBoxProps",
        defaultValue: null,
        required: false,
      },
      {
        name: "form",
        type: "string",
        description: "Associated native form ID; kept stable with the fixture form.",
        source: "ListBoxProps",
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
    events: [
      {
        name: "onValueChange",
        signature: 'ListBoxProps["onValueChange"]',
        description:
          "Requests a new array of accepted keys. Programmatic caller clear does not manufacture a DS event.",
      },
    ],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/organisms/ListBox/ListBox.tsx",
      },
      {
        id: "ownership",
        name: "Public composition",
        description:
          "ListBoxBody generates options. No orphan item, private context, nested interactive option or duplicate selection engine is used.",
      },
      {
        id: "filtering",
        name: "Filtering and native values",
        description:
          "Caller keys survive filtering. Native hidden fields include only currently available enabled keys; lastNativeValues records the last actual form submission.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Single record selection",
      description: "Single selection and filtered multiple selection with native submitted values.",
      code: basicCode,
      Component: ListBoxExample,
    },
    {
      id: "filtered",
      title: "Filtered multiple selection",
      description: "Caller filtering, retained selection and native submitted values.",
      code: filteredCode,
      Component: ListBoxFilteredExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
