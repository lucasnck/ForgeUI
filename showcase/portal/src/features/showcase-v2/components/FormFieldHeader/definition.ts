"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FormFieldHeaderExample } from "./FormFieldHeader.example";
const definition = {
  slug: "form-field-header",
  name: "FormFieldHeader",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/FormFieldHeader.sc.md",
  description: "Connected field labels, control, hint and error.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "FormFieldHeaderProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"label">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "FormFieldHeaderProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FormFieldHeaderProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "field-contract",
      name: "Connected control",
      description:
        "The public field owner connects its unique label, hint and error IDs. Error/hint belong to the field footer; action buttons are only used in the InputGroup addon example.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/FormFieldHeader/FormFieldHeader.tsx · src/design-system/components/atoms/FormFieldHeader/FormFieldHeader.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "FormFieldHeader contextual region",
      description:
        "Inspect the public label region; its required control sibling is hidden in this focused preview.",
      code: basicCode,
      Component: FormFieldHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
