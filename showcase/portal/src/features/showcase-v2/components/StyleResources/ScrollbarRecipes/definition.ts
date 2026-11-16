import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { ScrollbarRecipesExample } from "./ScrollbarRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "scrollbars",
  name: "Scrollbar recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-scrollbars.sc.md",
  source: "@/design-system/styles/scrollbars.css",
  description:
    "Bounded scroll region. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "scrollbars-example",
      title: "Bounded scroll region",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: ScrollbarRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--color-scrollbar-thumb",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-scrollbar-track",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--scrollbar-size",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--scrollbar-radius",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-scrollbar-thumb-hover",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
