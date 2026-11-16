"use client";
import { basicCode, hierarchyCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ButtonExample, ButtonHierarchyExample } from "./Button.example";
const definition = {
  slug: "button",
  name: "Button",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Button.sc.md",
  description: "Button public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Basic action",
      description:
        "Uses the public component contract with caller-owned settings and event feedback.",
      code: basicCode,
      Component: ButtonExample,
    },
    {
      id: "crud-hierarchy",
      title: "CRUD action hierarchy",
      description:
        "Caller-owned listing and detail actions: one brand/solid primary, sand/bordered Edit, neutral Back/Retry, and danger only inside destructive confirmation. The tone editor in Basic action explores the supporting palette without assigning CRUD priority.",
      code: hierarchyCode,
      Component: ButtonHierarchyExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Visible action content.",
      source: "ButtonProps",
    },
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      defaultValue: "md",
      description: "xs, sm, md, lg or xl.",
      source: "ButtonProps / canonical capability contract",
    },
    {
      name: "tone",
      type: "ComponentTone",
      required: false,
      defaultValue: "brand",
      description:
        "neutral, brand, success, warning, danger, info, inverse, sand, violet, forest or sky. Tones express presentation; the caller selects action priority. Supporting accents require a justified semantic use.",
      source: "ButtonProps / canonical capability contract",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      required: false,
      defaultValue: null,
      description: "Explicit solid, soft, outlined, bordered, ghost or none; overrides variant.",
      source: "ButtonProps / canonical capability contract",
    },
    {
      name: "shape",
      type: "ComponentShape",
      required: false,
      defaultValue: null,
      description: "Inherits document shape; square, rounded or pill when supplied.",
      source: "ButtonProps / canonical capability contract",
    },
    {
      name: "variant",
      type: "ComponentVariant",
      required: false,
      defaultValue: "solid",
      description: "solid, soft, ghost or outline; outline maps to outlined appearance.",
      source: "ButtonProps / canonical capability contract",
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Fills available width.",
      source: "ButtonProps / canonical capability contract",
    },
    {
      name: "loading",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Shows a decorative spinner, sets aria-busy and disables activation.",
      source: "ButtonProps",
    },
    {
      name: "loadingLabel",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Replaces children while loading when supplied.",
      source: "ButtonProps",
    },
    {
      name: "type",
      type: "button | submit | reset",
      required: false,
      defaultValue: "button",
      description: "Native button action type.",
      source: "ButtonProps",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Native disabled state; loading also disables the button.",
      source: "ButtonProps",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"button">',
      required: false,
      defaultValue: null,
      description: "Inherits title, className, ref, aria attributes and native button events.",
      source: "ButtonProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ButtonProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onClick",
      signature: "(event: MouseEvent<HTMLButtonElement>) => void",
      description: "Native click callback; disabled and loading buttons cannot activate.",
    },
  ],
  features: [
    {
      id: "native",
      name: "Native action",
      description: "Keyboard and form behavior remain native; no custom imperative methods.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
