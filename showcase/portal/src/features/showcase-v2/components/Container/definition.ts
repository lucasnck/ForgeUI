"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ContainerExample } from "./Container.example";
const definition = {
  slug: "container",
  name: "Container",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Container.sc.md",
  description: "Spacing, composition and responsive layout through the public DS contract.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "ContainerProps / inherited native root",
    },
    {
      name: "gap",
      type: "ComponentSpace",
      required: false,
      source: "ComponentSpaceProps",
      defaultValue: null,
      description: "Canonical spacing step between composed children.",
    },
    {
      name: "padding",
      type: "ComponentSpace",
      required: false,
      source: "ComponentSpaceProps",
      defaultValue: null,
      description: "Canonical inner spacing step.",
    },
    {
      name: "as",
      type: "LayoutElement",
      required: false,
      source: "ContainerProps",
      defaultValue: "div",
      description: "Supported semantic root element.",
    },
    {
      name: "size",
      type: "ComponentContainerSize",
      required: false,
      source: "ContainerProps",
      defaultValue: null,
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "ContainerProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ContainerProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Container/Container.tsx · src/design-system/components/atoms/Container/Container.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed content layout",
      description:
        "Change spacing and supported layout settings; Cancel and Save report independent caller actions.",
      code: basicCode,
      Component: ContainerExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
