import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { SurfaceAnimationRecipesExample } from "./SurfaceAnimationRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "surface-animations",
  name: "Surface Animation recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/animations/tech-surface-animations.sc.md",
  source: "@/design-system/styles/animations/surface-animations.module.css",
  description:
    "Surface effect comparison. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "surface-animations-example",
      title: "Surface effect comparison",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: SurfaceAnimationRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "none",
          type: "CSS Module class",
          description:
            "Canonical animations/surface-animations.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "fade",
          type: "CSS Module class",
          description:
            "Canonical animations/surface-animations.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "scale",
          type: "CSS Module class",
          description:
            "Canonical animations/surface-animations.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Attributes",
      entries: [
        {
          name: "data-motion-state",
          type: "entering / exiting / entered / ",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-animated",
          type: "false / true",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--motion-opacity-visible",
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
          name: "--motion-opacity-hidden",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--motion-scale-enter",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--motion-scale-rest",
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
