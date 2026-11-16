"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { TagExample } from "./Tag.example";
const definition = {
  slug: "tag",
  name: "Tag",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Tag.sc.md",
  description: "A removable collection with stable original labels.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "TagProps / inherited native root",
    },
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
      defaultValue: "neutral",
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      required: false,
      source: "ComponentAppearanceProps",
      defaultValue: "soft",
      description: "Canonical presentation recipe; preserves native semantics.",
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
      defaultValue: "false",
      description: "Expands within available inline space.",
    },
    {
      name: "onRemove",
      type: "() => void",
      required: false,
      source: "TagProps",
      defaultValue: null,
      description: "Requests removal; the caller removes its stable record.",
    },
    {
      name: "removeLabel",
      type: "string",
      required: false,
      source: "TagProps",
      defaultValue: null,
      description: "Required accessible removal name when onRemove exists.",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      source: "TagProps",
      defaultValue: "false",
      description: "Prevents native interaction or Tag removal while keeping content readable.",
    },
    {
      name: "native attributes",
      type: "HTMLAttributes<HTMLSpanElement>",
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "TagProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "TagProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onRemove",
      signature: "() => void",
      description:
        "Requests caller removal once. The caller preserves original item indices and identity.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/Tag/Tag.tsx · src/design-system/components/molecules/Tag/Tag.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed tag removal",
      description:
        "Remove item 2 and preserve Children 1 and Children 3; reset restores the original collection.",
      code: basicCode,
      Component: TagExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
