"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FormFieldBodyExample } from "./FormFieldBody.example";
const definition = {
  slug: "form-field-body",
  name: "FormFieldBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/FormFieldBody.sc.md",
  description: "Connected field labels, control, hint and error.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "FormFieldBodyProps / inherited native root",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "FormFieldBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FormFieldBodyProps",
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
        "src/design-system/components/atoms/FormFieldBody/FormFieldBody.tsx · src/design-system/components/atoms/FormFieldBody/FormFieldBody.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "FormFieldBody contextual region",
      description:
        "Edit the input and toggle error/disabled state; generated description IDs remain connected.",
      code: basicCode,
      Component: FormFieldBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
