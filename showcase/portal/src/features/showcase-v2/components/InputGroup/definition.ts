"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { InputGroupExample } from "./InputGroup.example";
const definition = {
  slug: "input-group",
  name: "InputGroup",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/InputGroup.sc.md",
  description: "Native input composition with an addon and a trailing action.",
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
      defaultValue: "0",
      description: "Canonical inner spacing step.",
    },
    {
      name: "align",
      type: "ComponentAlign",
      required: false,
      source: "ComponentAlignProps",
      defaultValue: "stretch",
      description: "Supported cross-axis alignment.",
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
      name: "as",
      type: "LayoutElement",
      required: false,
      source: "InputGroupProps",
      defaultValue: "div",
      description: "Supported semantic root element.",
    },
    {
      name: "leading",
      type: "ReactNode",
      required: false,
      source: "InputGroupProps",
      defaultValue: null,
      description: "Caller-owned leading addon node.",
    },
    {
      name: "trailing",
      type: "ReactNode",
      required: false,
      source: "InputGroupProps",
      defaultValue: null,
      description: "Caller-owned trailing addon/action node.",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      source: "InputGroupProps",
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "InputGroupProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "InputGroupProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "field-contract",
      name: "Connected control",
      description:
        "The public field owner connects its unique label, hint and error IDs. Error/hint belong to the field footer; action buttons are only used in the InputGroup addon example.",
    },
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/InputGroup/InputGroup.tsx · src/design-system/components/molecules/InputGroup/InputGroup.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed input actions",
      description:
        "Edit and clear the value; the addon stays connected through aria-describedby and the action aligns with the input.",
      code: basicCode,
      Component: InputGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
