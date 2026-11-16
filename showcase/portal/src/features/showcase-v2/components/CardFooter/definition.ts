"use client";
import { basicCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { CardFooterExample } from "./CardFooter.example";
const definition = {
  slug: "card-footer",
  name: "CardFooter",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/CardFooter.sc.md",
  description: "CardFooter public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Right-aligned actions",
      description:
        "Two right-aligned actions with an explicit gap: secondary Cancel, primary Save, and separate callback counters.",
      code: basicCode,
      Component: CardFooterExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-composed content in the CardFooter region.",
      source: "CardFooterProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"footer">',
      required: false,
      defaultValue: null,
      description: "Inherits native footer attributes, className and ref.",
      source: "CardFooterProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CardFooterProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "Button.onClick",
      signature: "(event: MouseEvent<HTMLButtonElement>) => void",
      description:
        "Separate caller-owned Cancel and Save handlers use the child Button click event; CardFooter adds no custom action API.",
    },
  ],
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
      description: "Optional action region. The preview hides the required contextual Body.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
