"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AvatarExample } from "./Avatar.example";
const definition = {
  slug: "avatar",
  name: "Avatar",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Avatar.sc.md",
  description: "Named or decorative identity with image fallback.",
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
      defaultValue: "pill",
      description: "Optional shape override; otherwise inherits the document recipe.",
    },
    {
      name: "label",
      type: "string",
      required: true,
      source: "AvatarProps",
      defaultValue: null,
      description: "Meaningful accessible name supplied by the caller.",
    },
    {
      name: "src",
      type: "string",
      required: false,
      source: "AvatarProps",
      defaultValue: null,
      description: "Optional image source; Avatar falls back after native image errors.",
    },
    {
      name: "initials",
      type: "string",
      required: false,
      source: "AvatarProps",
      defaultValue: null,
      description: "Optional fallback initials.",
    },
    {
      name: "decorative",
      type: "boolean",
      required: false,
      source: "AvatarProps",
      defaultValue: "false",
      description: "Removes redundant image/loading semantics beside meaningful content.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "AvatarProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AvatarProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "fallback",
      name: "Native image fallback",
      description:
        "image uses a local SVG; broken intentionally requests a missing local image to exercise the public error fallback. Initials remain IN. Decorative removes the image name beside visible identity content.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Avatar/Avatar.tsx · src/design-system/components/atoms/Avatar/Avatar.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Identity fallback",
      description:
        "Compare a valid local image, initials and an intentional broken-image fallback.",
      code: basicCode,
      Component: AvatarExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
