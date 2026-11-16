import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { LayoutRecipesExample } from "./LayoutRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "layout-recipes",
  name: "Layout recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-layout.sc.md",
  source: "@/design-system/styles/layout-components.module.css",
  description:
    "Layout composition. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "layout-recipes-example",
      title: "Layout composition",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: LayoutRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "stack",
          type: "CSS Module class",
          description:
            "Canonical layout-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "inline",
          type: "CSS Module class",
          description:
            "Canonical layout-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "grid",
          type: "CSS Module class",
          description:
            "Canonical layout-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "surface",
          type: "CSS Module class",
          description:
            "Canonical layout-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "container",
          type: "CSS Module class",
          description:
            "Canonical layout-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "aspect",
          type: "CSS Module class",
          description:
            "Canonical layout-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Attributes",
      entries: [
        {
          name: "data-gap",
          type: "0 / 1 / 2 / 3 / 4 / 5 / 6 / 8 / 10 / 12 / 16 / 20",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-padding",
          type: " / 0 / 1 / 2 / 3 / 4 / 5 / 6 / 8 / 10 / 12 / 16 / 20",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-align",
          type: "start / center / end / stretch / baseline",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-wrap",
          type: "false",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-justify",
          type: "start / center / end / between",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-columns",
          type: "2 / 3 / 4",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-columns-mobile",
          type: "1 / 2 / 3 / 4",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-columns-wide",
          type: "1 / 2 / 3 / 4",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-elevation",
          type: "raised / floating",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-size",
          type: "narrow",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
        {
          name: "data-ratio",
          type: "square / video / photo / portrait",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--stack-gap",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-4",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--stack-align",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-0",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-1",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-2",
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
          name: "--space-5",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-6",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-8",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-10",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-12",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-16",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--space-20",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--stack-padding",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--inline-wrap",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--inline-align",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--inline-justify",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--inline-gap",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--inline-padding",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--grid-gap",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-column",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--grid-padding",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-two-columns",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-three-columns",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-four-columns",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--surface-raised-background",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--surface-reflection",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--surface-backdrop-filter",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-text-default",
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
          name: "--color-border-subtle",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--shadow-raised",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--shadow-floating",
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
          name: "--layout-container-wide",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-container-padding",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-container-narrow",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--layout-container-padding-wide",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--aspect-square",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--aspect-video",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--aspect-photo",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--aspect-portrait",
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
