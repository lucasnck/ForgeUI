import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { PageTransitionRecipesExample } from "./PageTransitionRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "page-transition-recipes",
  name: "Page Transition recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/animations/tech-page-transitions.sc.md",
  source: "@/design-system/styles/animations/page-transitions.module.css",
  description:
    "Local region transitions. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "page-transition-recipes-example",
      title: "Local region transitions",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: PageTransitionRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "boundary",
          type: "CSS Module class",
          description:
            "Canonical animations/page-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "praticar-page-forward",
          type: "CSS Module class",
          description:
            "Canonical animations/page-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "praticar-page-back",
          type: "CSS Module class",
          description:
            "Canonical animations/page-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "praticar-page-replace",
          type: "CSS Module class",
          description:
            "Canonical animations/page-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "praticar-page-reveal",
          type: "CSS Module class",
          description:
            "Canonical animations/page-transitions.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--zero",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-3",
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
        {
          name: "--ease-standard",
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
          name: "--motion-opacity-hidden",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--page-offset",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--motion-opacity-visible",
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
