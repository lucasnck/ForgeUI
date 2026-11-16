import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { PopupRecipesExample } from "./PopupRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "popup-recipes",
  name: "Popup recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-popup-recipes.sc.md",
  source: "@/design-system/styles/popup-components.module.css",
  description:
    "Anchored option surface. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "popup-recipes-example",
      title: "Anchored option surface",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: PopupRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "anchor",
          type: "CSS Module class",
          description:
            "Canonical popup-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "popup",
          type: "CSS Module class",
          description:
            "Canonical popup-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "option",
          type: "CSS Module class",
          description:
            "Canonical popup-components.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Attributes",
      entries: [
        {
          name: "data-active",
          type: "attribute",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
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
          name: "--size-full",
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
          name: "--z-index-popup",
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
          name: "--radius-md",
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
          name: "--radius-sm",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--font-size-sm",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--line-height-normal",
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
          name: "--color-action-brand-background",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-action-foreground",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-transparent",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--border-width-thick",
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
