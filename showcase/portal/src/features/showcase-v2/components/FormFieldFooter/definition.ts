"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FormFieldFooterExample } from "./FormFieldFooter.example";
const definition = {
  slug: "form-field-footer",
  name: "FormFieldFooter",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/FormFieldFooter.sc.md",
  description: "Connected field labels, control, hint and error.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "FormFieldFooterProps / inherited native root",
    },
    {
      name: "hint",
      type: "string",
      required: false,
      source: "FormFieldFooterProps",
      defaultValue: null,
      description: "Field help connected through its generated description ID.",
    },
    {
      name: "error",
      type: "string",
      required: false,
      source: "FormFieldFooterProps",
      defaultValue: null,
      description: "Caller validation message connected by the field owner.",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "FormFieldFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FormFieldFooterProps",
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
        "src/design-system/components/molecules/FormFieldFooter/FormFieldFooter.tsx · src/design-system/components/molecules/FormFieldFooter/FormFieldFooter.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "FormFieldFooter contextual region",
      description:
        "Edit the input and toggle error/disabled state; generated description IDs remain connected.",
      code: basicCode,
      Component: FormFieldFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
