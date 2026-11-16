"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { SpinnerExample } from "./Spinner.example";
const definition = {
  slug: "spinner",
  name: "Spinner",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Spinner.sc.md",
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
      name: "tone",
      type: "ComponentTone",
      required: false,
      source: "ComponentToneProps",
      defaultValue: null,
      description: "Canonical semantic tone; inverse requires an inverse surface.",
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
      name: "decorative",
      type: "boolean",
      required: false,
      source: "SpinnerProps",
      defaultValue: "true",
      description: "Removes redundant image/loading semantics beside meaningful content.",
    },
    {
      name: "label",
      type: "string",
      required: false,
      source: "SpinnerProps",
      defaultValue: null,
      description: "Meaningful accessible name supplied by the caller.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "SpinnerProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "SpinnerProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Spinner/Spinner.tsx · src/design-system/components/atoms/Spinner/Spinner.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Loading presentation",
      description:
        "Toggle loading and motion, then compare supported sizes or geometry. Only the containing status announces loading.",
      code: basicCode,
      Component: SpinnerExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
