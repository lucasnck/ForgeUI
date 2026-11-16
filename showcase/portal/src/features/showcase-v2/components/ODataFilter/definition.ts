"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import {
  ODataFilterExample,
  ODataFilterAdvancedExample,
  ODataFilterExactExample,
} from "./ODataFilter.example";
import {
  ODataFilterSidebarExample,
  ODataFilterDropdownExample,
} from "./ODataFilterPlacement.example";
import { basicCode, advancedCode, sidebarCode, dropdownCode } from "./usage-code";
const definition = {
  name: "ODataFilter",
  slug: "odata-filter",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/ODataFilter.sc.md",
  description:
    "Typed local filter editing with canonical public controls and caller-owned expression state.",
  properties: [
    {
      name: "labels",
      type: "ODataFilterLabels",
      description: "Caller technical labels for the existing editors.",
      source: "ODataFilterProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "fields",
      type: "readonly ODataFilterField[]",
      description: "Stable field ids and valid OData paths.",
      source: "ODataFilterProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "value",
      type: "ODataFilterExpression",
      description: "Authoritative controlled typed expression.",
      source: "ODataFilterProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "mode",
      type: "ODataFilterMode",
      description: "Forwarded public mode setting.",
      source: "ODataFilterProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Forwarded public disabled setting.",
      source: "ODataFilterProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "title",
      type: "string",
      description: "Forwarded public title setting.",
      source: "ODataFilterProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [
    {
      name: "onValueChange",
      signature: "(value: ODataFilterExpression) => void",
      description: "Requested typed value accepted by the caller.",
    },
    {
      name: "onApply",
      signature: "(value: ODataFilterExpression, filter: string) => void",
      description: "Validated expression and actual canonical serializer output.",
    },
    {
      name: "onCancel",
      signature: "() => void",
      description: "Caller cancellation signal.",
    },
  ],
  features: [
    {
      id: "serializer",
      name: "Typed expression ownership",
      description:
        "Public controls validate compatible fields/operators. Root Apply uses serializeODataFilter; local record filtering evaluates the same typed expression without requests or handcrafted query text.",
    },
  ],
  examples: [
    {
      id: "sidebar",
      title: "Sidebar filters",
      description: "Fixed filter panel beside local results",
      code: sidebarCode,
      Component: ODataFilterSidebarExample,
    },
    {
      id: "dropdown",
      title: "Dropdown filters",
      description: "Filter Popover with apply, cancel and focus restoration",
      code: dropdownCode,
      Component: ODataFilterDropdownExample,
    },
    {
      id: "basic",
      title: "Simple typed fields",
      description: "Typed local data and real public callbacks",
      code: basicCode,
      Component: ODataFilterExample,
    },
    {
      id: "advanced",
      title: "Advanced nested conditions",
      description: "Nested and/or groups with canonical serialization",
      code: advancedCode,
      Component: ODataFilterAdvancedExample,
    },
    {
      id: "exact",
      title: "GUID and exact decimal filters",
      description:
        "Unquoted GUID equality and decimal ranges beyond binary number precision; Apply exposes canonical serialization without fetching or approximating records.",
      code: advancedCode,
      Component: ODataFilterExactExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
