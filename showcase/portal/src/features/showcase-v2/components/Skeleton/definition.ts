"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { SkeletonExample } from "./Skeleton.example";
const definition = {
  slug: "skeleton",
  name: "Skeleton",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Skeleton.sc.md",
  description: "Decorative loading presentation beside one named status.",
  properties: [
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      source: "ComponentSizedProps",
      defaultValue: "md",
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "shape",
      type: "ComponentShape",
      required: false,
      source: "ComponentShapeProps",
      defaultValue: null,
      description: "Optional shape override; otherwise inherits the document recipe.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      source: "ComponentFullWidthProps",
      defaultValue: "true",
      description: "Expands within available inline space.",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      source: "ComponentAnimatedProps",
      defaultValue: "true",
      description: "False disables visual motion; native semantics and callbacks remain immediate.",
    },
    {
      name: "kind",
      type: "SkeletonKind",
      required: false,
      source: "ComponentSkeletonKindProps",
      defaultValue: "rectangle",
      description: "Skeleton geometry; remains decorative and noninteractive.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "SkeletonProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "SkeletonProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Skeleton/Skeleton.tsx · src/design-system/components/atoms/Skeleton/Skeleton.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Loading presentation",
      description:
        "Toggle loading and motion, then compare supported sizes or geometry. Only the containing status announces loading.",
      code: basicCode,
      Component: SkeletonExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
