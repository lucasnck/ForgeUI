"use client";
import { basicCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { CardHeaderExample } from "./CardHeader.example";
const definition = {
  slug: "card-header",
  name: "CardHeader",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/CardHeader.sc.md",
  description: "CardHeader public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Header content",
      description:
        "Icon and editable title share an aligned row with token-based spacing; a separate control toggles the divider.",
      code: basicCode,
      Component: CardHeaderExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-composed content in the CardHeader region.",
      source: "CardHeaderProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"header">',
      required: false,
      defaultValue: null,
      description:
        "Inherits native attributes, className and ref; context-owned title ID takes precedence in CardHeader.",
      source: "CardHeaderProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CardHeaderProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "owner",
      name: "Card composition",
      description:
        "Requires the public Card owner. CardBody is required; Header and Footer are optional. See the complete Card aggregator.",
    },
    {
      id: "part",
      name: "Scoped region",
      description:
        "Heading, decorative Icon and Divider are composed children, not additional props. The owner supplies the title ID.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
