"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { SharedElementExample } from "./SharedElement.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "SharedElement",
  slug: "shared-element",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/SharedElement.sc.md",
  description:
    "Local record views switched through React transitions with canonical DS motion classes.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Structured transition content; preview keeps one stable record.",
      source: "Native attributes",
      required: true,
      defaultValue: null,
    },
    {
      name: "animated",
      type: "boolean",
      description: "Opt out of owned transition effects without delaying state.",
      source: "ComponentAnimatedProps",
      required: false,
      defaultValue: "true",
    },
    {
      name: "title",
      type: "string",
      description: "Native semantic wrapper title.",
      source: "Native attributes",
      required: false,
      defaultValue: null,
    },
    {
      name: "name",
      type: "SharedElementName",
      description: "Nonempty stable unique record participant identity.",
      source: "SharedElementProps",
      required: true,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "navigation",
      name: "Transition ownership",
      description:
        "Caller startTransition/addTransitionType chooses forward, back, replace or reveal. Public boundaries own CSS effects; unsupported browsers and reduced motion preserve content and immediate semantic updates.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Local view transition",
      description: "One stable record and local typed transition intents",
      code: basicCode,
      Component: SharedElementExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
