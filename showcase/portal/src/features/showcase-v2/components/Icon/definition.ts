"use client";
import { IconGeometryExample } from "./IconGeometryExample";
import { iconGeometryCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { IconExample } from "./Icon.example";
const definition = {
  slug: "icon",
  name: "Icon",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Icon.sc.md",
  description: "Decorative and named icons with inherited text scale.",
  properties: [
    {
      name: "name",
      type: "IconName",
      required: true,
      source: "IconProps",
      defaultValue: null,
      description: "Supported icon geometry identifier.",
    },
    {
      name: "size",
      type: "ComponentIconSize",
      required: false,
      source: "IconProps",
      defaultValue: null,
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "label",
      type: "string",
      required: false,
      source: "IconProps",
      defaultValue: null,
      description: "Meaningful accessible name supplied by the caller.",
    },
    {
      name: "native attributes",
      type: "SVGProps<SVGSVGElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "IconProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Icon/Icon.tsx · src/design-system/components/atoms/Icon/Icon.module.css",
    },
  ],
  examples: [
    {
      id: "icon-geometry",
      title: "Canonical icon geometry",
      description:
        "The public icon dictionary owns supported vector geometry; no copied SVG paths.",
      code: iconGeometryCode,
      Component: IconGeometryExample,
    },
    {
      id: "basic",
      title: "Inline icon",
      description:
        "Change supported geometry; compare an aligned text/icon row with a standalone named or decorative icon.",
      code: basicCode,
      Component: IconExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
