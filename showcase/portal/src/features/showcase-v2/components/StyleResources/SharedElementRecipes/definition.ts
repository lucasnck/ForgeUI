import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { SharedElementRecipesExample } from "./SharedElementRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "shared-element-recipes",
  name: "Shared Element recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/animations/tech-shared-element-transitions.sc.md",
  source: "@/design-system/styles/animations/shared-element-transitions.module.css",
  description:
    "Shared record identity. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "shared-element-recipes-example",
      title: "Shared record identity",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: SharedElementRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "participant",
          type: "CSS Module class",
          description:
            "Canonical animations/shared-element-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "praticar-shared-element",
          type: "CSS Module class",
          description:
            "Canonical animations/shared-element-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--size-full",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--motion-normal",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--ease-standard",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--motion-fast",
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
