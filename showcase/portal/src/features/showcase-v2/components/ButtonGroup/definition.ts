"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { ButtonGroupExample } from "./ButtonGroup.example";
const definition = {
  slug: "button-group",
  name: "ButtonGroup",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ButtonGroup.sc.md",
  description: "Spacing, composition and responsive layout through the public DS contract.",
  properties: [
    {
      name: "gap",
      type: "ComponentSpace",
      required: false,
      source: "ComponentSpaceProps",
      defaultValue: "2",
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
      name: "fullWidth",
      type: "boolean",
      required: false,
      source: "ComponentFullWidthProps",
      defaultValue: "false",
      description: "Expands within available inline space.",
    },
    {
      name: "label",
      type: "string",
      required: true,
      source: "ButtonGroupProps",
      defaultValue: null,
      description: "Meaningful accessible name supplied by the caller.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      source: "ButtonGroupProps",
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"div">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "ButtonGroupProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ButtonGroupProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/ButtonGroup/ButtonGroup.tsx · src/design-system/components/molecules/ButtonGroup/ButtonGroup.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Action grouping",
      description:
        "Change spacing and supported layout settings; Cancel and Save report independent caller actions.",
      code: basicCode,
      Component: ButtonGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
