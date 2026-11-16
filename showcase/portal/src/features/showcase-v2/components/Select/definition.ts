"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { SelectExample } from "./Select.example";
const definition = {
  slug: "select",
  name: "Select",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Select.sc.md",
  description: "Native selection with stable indexed options.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "SelectProps / inherited native root",
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
      defaultValue: "solid",
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
      defaultValue: "true",
      description: "Expands within available inline space.",
    },
    {
      name: "invalid",
      type: "boolean",
      required: false,
      source: "ComponentInvalidProps",
      defaultValue: null,
      description: "Validation appearance; FormField may derive this from its error.",
    },
    {
      name: "native attributes",
      type: 'Omit<ComponentPropsWithRef<"select">, "size">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "SelectProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "SelectProps",
    },
    {
      name: "value",
      type: "string | number | readonly string[] | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "SelectProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "SelectProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onChange",
      signature: "(event: ChangeEvent<HTMLSelectElement>) => void",
      description:
        "Native selection reports a stable item value; visible Children indices never change.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Select/Select.tsx · src/design-system/components/atoms/Select/Select.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed native selection",
      description:
        "Select Children 1–3 and observe the original item value. This preview uses the public Select owner.",
      code: basicCode,
      Component: SelectExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
