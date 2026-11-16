"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { InputAddonExample } from "./InputAddon.example";
const definition = {
  slug: "input-addon",
  name: "InputAddon",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/InputAddon.sc.md",
  description: "Native input composition with an addon and a trailing action.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "InputAddonProps / inherited native root",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "InputAddonProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "InputAddonProps",
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
        "src/design-system/components/molecules/InputAddon/InputAddon.tsx · src/design-system/components/molecules/InputAddon/InputAddon.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed input actions",
      description:
        "Edit and clear the value; the addon stays connected through aria-describedby and the action aligns with the input.",
      code: basicCode,
      Component: InputAddonExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
