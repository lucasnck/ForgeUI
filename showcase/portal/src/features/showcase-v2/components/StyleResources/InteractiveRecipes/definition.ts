import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { InteractiveRecipesExample } from "./InteractiveRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "interactive-recipes",
  name: "Interactive recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-interactive-primitives.sc.md",
  source: "@/design-system/styles/interactive-primitives.module.css",
  description:
    "Native interaction states. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "interactive-recipes-example",
      title: "Native interaction states",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: InteractiveRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "squareAction",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "radio",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "module",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "css",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "switchTarget",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "switchInput",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "switchTrack",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "switchThumb",
          type: "CSS Module class",
          description:
            "Canonical interactive-primitives.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Attributes",
      entries: [
        {
          name: "data-size",
          type: " / xs / sm / lg / xl",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--control-size-height",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--zero",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--radius-circle",
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
          name: "--color-text-danger",
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
          name: "--switch-track-width-md",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-height-md",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-thumb-size-md",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-width-xs",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-height-xs",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-thumb-size-xs",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-width-sm",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-height-sm",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-thumb-size-sm",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-width-lg",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-height-lg",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-thumb-size-lg",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-width-xl",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-height-xl",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-thumb-size-xl",
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
          name: "--switch-width",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-height",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--radius-full",
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
          name: "--color-text-muted",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-track-opacity",
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
          name: "--size-half",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-thumb",
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
          name: "--translation-center",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-current",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--switch-state-layer-spread",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--checkable-accent",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--opacity-decorative",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--opacity-pulse",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--opacity-disabled",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--border-width-focus",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-focus-ring",
          type: "CSS variable",
          description:
            "Resolved from the current canonical DS theme; do not copy a fixed value into the consumer.",
        },
        {
          name: "--color-system-field-text",
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
        {
          name: "--color-system-canvas-text",
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
