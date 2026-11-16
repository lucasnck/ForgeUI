"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import {
  ODataFilterConditionExample,
  ODataFilterConditionExactExample,
} from "./ODataFilterCondition.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ODataFilterCondition",
  slug: "odata-filter-condition",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ODataFilterCondition.sc.md",
  description:
    "Typed local filter editing with canonical public controls and caller-owned expression state.",
  properties: [
    {
      name: "labels",
      type: "ODataFilterLabels",
      description: "Caller technical labels for the existing editors.",
      source: "ODataFilterConditionProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "fields",
      type: "readonly ODataFilterField[]",
      description: "Stable field ids and valid OData paths.",
      source: "ODataFilterConditionProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "value",
      type: "ODataFilterConditionData",
      description: "Authoritative controlled typed expression.",
      source: "ODataFilterConditionProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "simple",
      type: "boolean",
      description: "Forwarded public simple setting.",
      source: "ODataFilterConditionProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Forwarded public disabled setting.",
      source: "ODataFilterConditionProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "title",
      type: "string",
      description: "Forwarded public title setting.",
      source: "ODataFilterConditionProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [
    {
      name: "onValueChange",
      signature: "(value: ODataFilterConditionData) => void",
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
      Component: ODataFilterConditionExample,
    },
    {
      id: "exact",
      title: "GUID and exact decimal conditions",
      description:
        "Switch the typed field and compatible operator without reusing an incompatible previous value.",
      code: basicCode,
      Component: ODataFilterConditionExactExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
