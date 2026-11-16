"use client";
import { basicCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ModalHeaderExample } from "./ModalHeader.example";
const definition = {
  slug: "modal-header",
  name: "ModalHeader",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ModalHeader.sc.md",
  description: "ModalHeader public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Dialog heading",
      description:
        "Scoped title and icon with a named close action, divider control and focus return.",
      code: basicCode,
      Component: ModalHeaderExample,
    },
  ],
  properties: [
    {
      name: "title",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonempty visible title; connected to the owner dialog name.",
      source: "ModalHeaderProps",
    },
    {
      name: "icon",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Optional caller-composed decorative icon.",
      source: "ModalHeaderProps",
    },
    {
      name: "divider",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shows the lower separator.",
      source: "ModalHeaderProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Content of the public contextual region.",
      source: "ModalHeaderProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"header">',
      required: false,
      defaultValue: null,
      description: "Native attributes, className and ref; owner relationships take precedence.",
      source: "ModalHeaderProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "owner",
      name: "Modal composition",
      description:
        "Requires the real public Modal context. See the complete Modal aggregator; this page isolates its own region.",
    },
    {
      id: "label",
      name: "Accessible naming",
      description:
        'Header supplies the dialog title. Body/Footer-only previews use explicit aria-label="ModalHeader preview" to preserve a meaningful name when Header is omitted.',
    },
    {
      id: "dismiss",
      name: "Dismissal",
      description:
        "A trigger opens the controlled owner; Escape closes and returns focus. Footer action also closes its preview.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
