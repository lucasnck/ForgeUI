"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { CurrencyValueExample } from "./CurrencyValue.example";
const definition = {
  slug: "currency-value",
  name: "CurrencyValue",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/CurrencyValue.sc.md",
  description: "Deterministic monetary formatting from valid decimal values.",
  properties: [
    {
      name: "size",
      type: "ComponentTextSize",
      required: false,
      source: "ComponentTextSizeProps",
      defaultValue: null,
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTextTone",
      required: false,
      source: "ComponentTextToneProps",
      defaultValue: null,
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "weight",
      type: "ComponentFontWeight",
      required: false,
      source: "ComponentFontWeightProps",
      defaultValue: null,
      description: "Canonical font weight.",
    },
    {
      name: "as",
      type: "TextElement",
      required: false,
      source: "NativeCurrencyValueProps",
      defaultValue: null,
      description: "Supported semantic root element.",
    },
    {
      name: "currency",
      type: "CurrencyCode",
      required: true,
      source: "MoneyFormatOptions",
      defaultValue: null,
      description: "Valid ISO currency code.",
    },
    {
      name: "locale",
      type: "Locale",
      required: true,
      source: "MoneyFormatOptions",
      defaultValue: null,
      description: "Supported locale, explicit for deterministic monetary formatting.",
    },
    {
      name: "currencyDisplay",
      type: "CurrencyDisplay",
      required: false,
      source: "MoneyFormatOptions",
      defaultValue: null,
      description: "Supported Intl currency display.",
    },
    {
      name: "useGrouping",
      type: "boolean",
      required: false,
      source: "MoneyFormatOptions",
      defaultValue: null,
      description: "Whether formatting groups digits.",
    },
    {
      name: "value",
      type: "MonetaryValue",
      required: true,
      source: "CurrencyValueProps",
      defaultValue: null,
      description: "Valid caller-owned native/canonical value in its declared type.",
    },
    {
      name: "emptyLabel",
      type: "string",
      required: false,
      source: "CurrencyValueProps",
      defaultValue: "—",
      description: "Visible fallback when value is null.",
    },
    {
      name: "native attributes",
      type: 'Omit<HTMLAttributes<HTMLElement>, "children"> & RefAttributes<HTMLElement>',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "CurrencyValueProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "CurrencyValueProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/atoms/CurrencyValue/CurrencyValue.tsx · src/design-system/components/atoms/CurrencyValue/CurrencyValue.module.css",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Exact monetary display",
      description:
        "Compare BRL/USD and pt-BR/en; null displays EmptyLabel without changing the underlying amount.",
      code: basicCode,
      Component: CurrencyValueExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
