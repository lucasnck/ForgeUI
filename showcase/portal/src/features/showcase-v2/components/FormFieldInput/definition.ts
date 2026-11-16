"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { FormFieldInputExample, FormFieldInputConditionalExample } from "./FormFieldInput.example";
import { basicCode, conditionalCode } from "./usage-code";
const definition = {
  name: "FormFieldInput",
  slug: "form-field-input",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/Form/FormFieldInput.sc.md",
  description:
    "Registered nested text fields with connected errors, typed submit and retained conditional registration.",
  properties: [
    {
      name: "name",
      type: "FieldPath<TValues>",
      description: "Stable typed registration path; this preview uses profile.name.",
      source: "FormFieldRegistrationProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "label",
      type: "string",
      description:
        "Forwarded public label setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: true,
      defaultValue: null,
    },
    {
      name: "hint",
      type: "string",
      description:
        "Forwarded public hint setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: null,
    },
    {
      name: "placeholder",
      type: "string",
      description:
        "Forwarded public placeholder setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: null,
    },
    {
      name: "required",
      type: "boolean",
      description:
        "Forwarded public required setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: "false",
    },
    {
      name: "disabled",
      type: "boolean",
      description:
        "Forwarded public disabled setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: null,
    },
    {
      name: "readOnly",
      type: "boolean",
      description:
        "Forwarded public readOnly setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: null,
    },
    {
      name: "fullWidth",
      type: "boolean",
      description:
        "Forwarded public fullWidth setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: "true",
    },
    {
      name: "size",
      type: "ComponentSize",
      description:
        "Forwarded public size setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: "md",
    },
    {
      name: "tone",
      type: "ComponentTone",
      description:
        "Forwarded public tone setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: "neutral",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      description:
        "Forwarded public appearance setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: "bordered",
    },
    {
      name: "shape",
      type: "ComponentShape",
      description:
        "Forwarded public shape setting. Required validation is owned by the caller resolver.",
      source: "FormFieldInputProps<TValues>",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "registration",
      name: "React Hook Form",
      description:
        "Installed FormProvider/useForm owns nested values, resolver, error focus and reset. Conditional example retains removed values with shouldUnregister=false and demonstrates setError/clearErrors. No V1 fixture imports.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Registered required field",
      description: "Caller resolver and typed nested value",
      code: basicCode,
      Component: FormFieldInputExample,
    },
    {
      id: "conditional",
      title: "Conditional registered field",
      description: "Retained registration and manual connected errors",
      code: conditionalCode,
      Component: FormFieldInputConditionalExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
