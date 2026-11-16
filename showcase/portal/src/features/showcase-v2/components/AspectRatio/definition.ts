"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { AspectRatioExample } from "./AspectRatio.example";
const definition = {
  slug: "aspect-ratio",
  name: "AspectRatio",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AspectRatio.sc.md",
  description: "Named media ratios with a local image.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "AspectRatioProps / inherited native root",
    },
    {
      name: "as",
      type: "LayoutElement",
      required: false,
      source: "AspectRatioProps",
      defaultValue: "div",
      description: "Supported semantic root element.",
    },
    {
      name: "ratio",
      type: "ComponentAspectRatio",
      required: true,
      source: "AspectRatioProps",
      defaultValue: null,
      description: "Named aspect ratio; the caller sizes its media to the frame.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "AspectRatioProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "AspectRatioProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "media",
      name: "Consumer media sizing",
      description:
        "The caller media class applies inline-size/block-size: var(--size-full) and object-fit: cover. The frame changes ratio; it does not stretch the image.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/AspectRatio/AspectRatio.tsx · src/design-system/components/atoms/AspectRatio/AspectRatio.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Media ratio",
      description: "Switch ratio while the image uses cover sizing inside its frame.",
      code: basicCode,
      Component: AspectRatioExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
