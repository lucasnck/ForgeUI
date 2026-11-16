"use client";
import { basicCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ModalFooterExample } from "./ModalFooter.example";
const definition = {
  slug: "modal-footer",
  name: "ModalFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ModalFooter.sc.md",
  description: "ModalFooter public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Dialog footer",
      description:
        "Right-aligned Cancel and Confirm actions with independent outcomes and a divider control.",
      code: basicCode,
      Component: ModalFooterExample,
    },
  ],
  properties: [
    {
      name: "divider",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Shows the upper separator.",
      source: "ModalFooterProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Content of the public contextual region.",
      source: "ModalFooterProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description: "Native attributes, className and ref; owner relationships take precedence.",
      source: "ModalFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ModalFooterProps",
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
        'Header supplies the dialog title. Body/Footer-only previews use explicit aria-label="ModalFooter preview" to preserve a meaningful name when Header is omitted.',
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
