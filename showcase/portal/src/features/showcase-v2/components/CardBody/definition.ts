"use client";
import { basicCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { CardBodyExample } from "./CardBody.example";
const definition = {
  slug: "card-body",
  name: "CardBody",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/CardBody.sc.md",
  description: "CardBody public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Body content",
      description:
        "Uses the public component contract with caller-owned settings and event feedback.",
      code: basicCode,
      Component: CardBodyExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-composed content in the CardBody region.",
      source: "CardBodyProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description: "Inherits native div attributes, className and ref.",
      source: "CardBodyProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CardBodyProps",
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
      description: "Required content region. This preview contains no optional Header/Footer.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
