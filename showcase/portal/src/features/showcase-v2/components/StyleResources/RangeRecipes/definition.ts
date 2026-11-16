import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { RangeRecipesExample } from "./RangeRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "range-recipes",
  name: "Range recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-range-recipes.sc.md",
  source: "@/design-system/styles/range-components.module.css",
  description:
    "Range presentation. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "range-recipes-example",
      title: "Range presentation",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: RangeRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "range",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "module",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "css",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "progress",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "meter",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "visual",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "fill",
          type: "CSS Module class",
          description:
            "Canonical range-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Attributes",
      entries: [
        {
          name: "data-size",
          type: "xs / sm / lg / xl",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-animated",
          type: "true / ",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-indeterminate",
          type: "true / ",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--length-2",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--length-20",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--size-full",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--range-height",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--control-background",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--border-width-thin",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--border-style-default",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-border-default",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--radius-sm",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-surface-subtle",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--length-1",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--length-3",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--length-4",
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
          name: "--motion-pulse-duration",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--ease-linear",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--translation-center",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-system-highlight",
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
