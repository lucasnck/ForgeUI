"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { PasswordInputExample } from "./PasswordInput.example";
const definition = {
  slug: "password-input",
  name: "PasswordInput",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/PasswordInput.sc.md",
  description: "Native entry with a connected label and caller-owned value.",
  properties: [
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      source: "ComponentSizedProps",
      defaultValue: null,
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTone",
      required: false,
      source: "ComponentToneProps",
      defaultValue: null,
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      required: false,
      source: "ComponentAppearanceProps",
      defaultValue: null,
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
      name: "revealLabel",
      type: "string",
      required: true,
      source: "PasswordInputProps",
      defaultValue: null,
      description: "Accessible label for password reveal.",
    },
    {
      name: "concealLabel",
      type: "string",
      required: true,
      source: "PasswordInputProps",
      defaultValue: null,
      description: "Accessible label for password conceal.",
    },
    {
      name: "revealable",
      type: "boolean",
      required: false,
      source: "PasswordInputProps",
      defaultValue: "true",
      description: "Includes the public reveal/conceal action.",
    },
    {
      name: "native attributes",
      type: 'Omit<NativeInputProps, "type" | "children">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "PasswordInputProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PasswordInputProps",
    },
    {
      name: "placeholder",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PasswordInputProps",
    },
    {
      name: "value",
      type: "string | number | readonly string[] | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PasswordInputProps",
    },
    {
      name: "checked",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PasswordInputProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PasswordInputProps",
    },
    {
      name: "readOnly",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "PasswordInputProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onChange",
      signature: "(event: ChangeEvent<HTMLInputElement>) => void",
      description:
        "Native event with currentTarget.value; the caller accepts the value. Clear is a separate caller action.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/PasswordInput/PasswordInput.tsx · delegates to public DS primitives",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Reveal and conceal",
      description:
        "Edit or clear the value; compare sizing, disabled and invalid states. Read-only preserves the native value.",
      code: basicCode,
      Component: PasswordInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
