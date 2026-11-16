"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { CheckboxExample } from "./Checkbox.example";
const definition = {
  slug: "checkbox",
  name: "Checkbox",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Checkbox.sc.md",
  description: "Native checked state with an accessible label.",
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
      name: "tone",
      type: "ComponentTone",
      required: false,
      source: "ComponentToneProps",
      defaultValue: "brand",
      description: "Canonical semantic tone; inverse requires an inverse surface.",
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
      name: "invalid",
      type: "boolean",
      required: false,
      source: "ComponentInvalidProps",
      defaultValue: null,
      description: "Validation appearance; FormField may derive this from its error.",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      source: "ComponentAnimatedProps",
      defaultValue: "true",
      description: "False disables visual motion; native semantics and callbacks remain immediate.",
    },
    {
      name: "native attributes",
      type: 'Omit<NativeInputProps, "type" | "children">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "CheckboxProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CheckboxProps",
    },
    {
      name: "placeholder",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CheckboxProps",
    },
    {
      name: "value",
      type: "string | number | readonly string[] | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CheckboxProps",
    },
    {
      name: "checked",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CheckboxProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CheckboxProps",
    },
    {
      name: "readOnly",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CheckboxProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onChange",
      signature: "(event: ChangeEvent<HTMLInputElement>) => void",
      description: "Caller reads currentTarget.checked once. Disabled prevents native changes.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/Checkbox/Checkbox.tsx · src/design-system/components/atoms/Checkbox/Checkbox.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Controlled boolean",
      description:
        "Toggle by keyboard or pointer and observe the real checked value and callback count. Disabled preserves the state.",
      code: basicCode,
      Component: CheckboxExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
