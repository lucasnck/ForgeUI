"use client";
import { basicCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ModalBodyExample } from "./ModalBody.example";
const definition = {
  slug: "modal-body",
  name: "ModalBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ModalBody.sc.md",
  description: "ModalBody public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Dialog body",
      description:
        "Scoped body content with a visible close control, keyboard dismissal and focus return.",
      code: basicCode,
      Component: ModalBodyExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Content of the public contextual region.",
      source: "ModalBodyProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description: "Native attributes, className and ref; owner relationships take precedence.",
      source: "ModalBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ModalBodyProps",
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
        'Header supplies the dialog title. Body/Footer-only previews use explicit aria-label="ModalBody preview" to preserve a meaningful name when Header is omitted.',
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
