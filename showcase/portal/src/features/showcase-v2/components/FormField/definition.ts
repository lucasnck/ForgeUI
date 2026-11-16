"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FormFieldExample } from "./FormField.example";
const definition = {
  slug: "form-field",
  name: "FormField",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/FormField.sc.md",
  description: "Connected field labels, control, hint and error.",
  properties: [
    {
      name: "controlId",
      type: "string",
      required: true,
      source: "FormFieldProps",
      defaultValue: null,
      description: "Unique control ID shared by its label, hint and error.",
    },
    {
      name: "label",
      type: "string",
      required: true,
      source: "FormFieldProps",
      defaultValue: null,
      description: "Meaningful accessible name supplied by the caller.",
    },
    {
      name: "hint",
      type: "string",
      required: false,
      source: "FormFieldProps",
      defaultValue: null,
      description: "Field help connected through its generated description ID.",
    },
    {
      name: "error",
      type: "string",
      required: false,
      source: "FormFieldProps",
      defaultValue: null,
      description: "Caller validation message connected by the field owner.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      source: "FormFieldProps",
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
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
        "src/design-system/components/molecules/FormField/FormField.tsx · src/design-system/components/molecules/FormField/FormField.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Field label hint and error",
      description:
        "Edit the input and toggle error/disabled state; generated description IDs remain connected.",
      code: basicCode,
      Component: FormFieldExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
