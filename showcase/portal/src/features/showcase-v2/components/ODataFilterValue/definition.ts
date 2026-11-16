"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ODataFilterValueExample, ODataFilterValueExactExample } from "./ODataFilterValue.example";
import { basicCode, exactCode } from "./usage-code";
const definition = {
  name: "ODataFilterValue",
  slug: "odata-filter-value",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ODataFilterValue.sc.md",
  description:
    "Typed local filter editing with canonical public controls and caller-owned expression state.",
  properties: [
    {
      name: "labels",
      type: "ODataFilterLabels",
      description: "Caller technical labels for the existing editors.",
      source: "ODataFilterValueProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "field",
      type: "ODataFilterField",
      description: "Typed field descriptor for the editor.",
      source: "ODataFilterValueProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "value",
      type: "ODataFilterValueData",
      description: "Controlled typed scalar/range/options value.",
      source: "ODataFilterValueProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "operator",
      type: "ODataFilterOperator",
      description: "Compatible operator supplied by caller.",
      source: "ODataFilterValueProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "label",
      type: "string",
      description: "Forwarded public label setting.",
      source: "ODataFilterValueProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Forwarded public disabled setting.",
      source: "ODataFilterValueProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "invalid",
      type: "boolean",
      description: "Forwarded public invalid setting.",
      source: "ODataFilterValueProps",
      required: false,
      defaultValue: "false",
    },
  ],
  methods: [],
  events: [
    {
      name: "onValueChange",
      signature: "(value: ODataFilterValueData) => void",
      description: "Requested typed value accepted by the caller.",
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
      id: "basic",
      title: "Typed filter editing",
      description: "Typed local data and real public callbacks",
      code: basicCode,
      Component: ODataFilterValueExample,
    },
    {
      id: "exact",
      title: "GUID and exact decimal values",
      description:
        "Controlled text preserves GUID input and both decimal range endpoints beyond binary number precision.",
      code: exactCode,
      Component: ODataFilterValueExactExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
