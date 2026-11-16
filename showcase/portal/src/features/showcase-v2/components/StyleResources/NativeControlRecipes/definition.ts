import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { NativeControlRecipesExample } from "./NativeControlRecipes.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "native-control-recipes",
  name: "Native Control recipes",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-native-control-recipes.sc.md",
  source: "@/design-system/styles/field-control.module.css",
  description:
    "Native control surfaces. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "native-control-recipes-example",
      title: "Native control surfaces",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: NativeControlRecipesExample,
    },
  ],
  contracts: [
    {
      title: "Classes",
      entries: [
        {
          name: "control",
          type: "CSS Module class",
          description:
            "Canonical field-control.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "module",
          type: "CSS Module class",
          description:
            "Canonical field-control.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
        {
          name: "css",
          type: "CSS Module class",
          description:
            "Canonical field-control.module.css recipe. Consumed by the public DS primitives shown above; compose without duplicating the recipe.",
        },
      ],
    },
    {
      title: "Attributes",
      entries: [
        {
          name: "data-appearance",
          type: "solid",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
      ],
    },
    {
      title: "Token dependencies",
      entries: [
        {
          name: "--color-surface-default",
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
          name: "--color-border-default",
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
          name: "--zero",
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
          name: "--color-action-danger-background",
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
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
