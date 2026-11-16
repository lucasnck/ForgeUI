"use client";
import { basicCode, bodyOnlyCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { CardExample, CardBodyOnlyExample } from "./Card.example";
const definition = {
  slug: "card",
  name: "Card",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Card.sc.md",
  description: "Card public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Complete card",
      description:
        "Composes an icon/title row, content, and two right-aligned actions with secondary and primary hierarchy.",
      code: basicCode,
      Component: CardExample,
    },
    {
      id: "body-only",
      title: "Body-only card",
      description:
        "Starts with the required Body only; optional Header and Footer can be composed through controls.",
      code: bodyOnlyCode,
      Component: CardBodyOnlyExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Direct CardHeader, CardBody and CardFooter parts; Body is required.",
      source: "CardProps",
    },
    {
      name: "elevation",
      type: "ComponentElevation",
      required: false,
      defaultValue: "raised",
      description: "flat, raised or floating surface.",
      source: "CardProps",
    },
    {
      name: "shape",
      type: "ComponentShape",
      required: false,
      defaultValue: null,
      description: "Inherits document shape unless square, rounded or pill is supplied.",
      source: "CardProps / canonical capability contract",
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Fills available width.",
      source: "CardProps / canonical capability contract",
    },
    {
      name: "native attributes",
      type: "NativeSectionRootProps",
      required: false,
      defaultValue: null,
      description:
        "Native section-compatible attributes, className and ref; rendered semantic owner is an article.",
      source: "CardProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CardProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Public composition",
      description:
        "Exactly one required CardBody; optional CardHeader and CardFooter. Parts render Header → Body → Footer. Unknown or duplicate parts are rejected.",
    },
    {
      id: "label",
      name: "Accessible labeling",
      description:
        "CardHeader supplies the context-owned article title ID. Actions inside Body/Footer remain independently operable.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
