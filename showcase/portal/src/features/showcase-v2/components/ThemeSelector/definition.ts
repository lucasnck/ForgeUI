"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ThemeSelectorExample } from "./ThemeSelector.example";
import { basicCode } from "./usage-code";
const definition = {
  ...{
    name: "ThemeSelector",
    slug: "theme-selector",
    level: "molecules",
    specification: "docs/sc/ds/components/molecules/ThemeSelector.sc.md",
    description: "Local controlled theme selection without changing application preferences.",
    properties: [
      {
        name: "id",
        type: "string | undefined",
        required: false,
        defaultValue: null,
        description:
          "Optional public control ID. This preview retains its generated label/control identity.",
        source: "SelectorProps",
      },
      {
        name: "value",
        type: 'import("src/lib/contracts/preferences").Theme',
        required: true,
        defaultValue: null,
        description:
          "Controlled accepted value. Canonical data and native edit state are reported separately.",
        source: "SelectorProps",
      },
      {
        name: "options",
        type: 'readonly SelectorOption<import("src/lib/contracts/preferences").Theme>[]',
        required: true,
        defaultValue: null,
        description: "Real public preference values with stable indexed Label 1..n text.",
        source: "SelectorProps",
      },
      {
        name: "onValueChange",
        type: '(value: import("src/lib/contracts/preferences").Theme) => void',
        required: true,
        defaultValue: null,
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
        source: "SelectorProps",
      },
      {
        name: "label",
        type: "string",
        required: true,
        defaultValue: null,
        description: "Visible connected control label.",
        source: "SelectorProps",
      },
      {
        name: "size",
        type: "ComponentSize | undefined",
        required: false,
        defaultValue: "md",
        description: "Public component size.",
        source: "ComponentSizedProps",
      },
      {
        name: "disabled",
        type: "boolean | undefined",
        required: false,
        defaultValue: "false",
        description: "Disable the native control and its owned actions.",
        source: "SelectorProps",
      },
    ],
    methods: [],
    events: [
      {
        name: "onValueChange",
        signature: '(value: import("src/lib/contracts/preferences").Theme) => void',
        description:
          "Reports an accepted canonical value; caller-owned state records arguments and call count.",
      },
    ],
    features: [
      {
        id: "source",
        name: "Canonical implementation",
        description: "src/design-system/components/molecules/ThemeSelector/ThemeSelector.tsx",
      },
      {
        id: "contract",
        name: "Public value contract",
        description:
          "Options and state belong to this example; no application preference provider is changed.",
      },
    ],
  },
  examples: [
    {
      id: "basic",
      title: "Valid preference options",
      description: "Local controlled theme selection without changing application preferences.",
      code: basicCode,
      Component: ThemeSelectorExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
