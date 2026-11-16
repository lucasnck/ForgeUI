"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { OptionExample } from "./Option.example";
const definition = {
  slug: "option",
  name: "Option",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/Option.sc.md",
  description: "Native selection with stable indexed options.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller content within the declared public owner/parts contract.",
      source: "OptionProps / inherited native root",
    },
    {
      name: "value",
      type: "string",
      required: true,
      source: "OptionProps",
      defaultValue: null,
      description: "Valid caller-owned native/canonical value in its declared type.",
    },
    {
      name: "native attributes",
      type: 'ComponentPropsWithRef<"option">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "OptionProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "OptionProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "OptionProps",
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
        "src/design-system/components/atoms/Option/Option.tsx · src/design-system/components/atoms/Option/Option.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Indexed native selection",
      description:
        "Select Children 1–3 and observe the original item value. This preview uses the public Select owner.",
      code: basicCode,
      Component: OptionExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
