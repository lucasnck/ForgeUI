"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ODataFilterGroupExample } from "./ODataFilterGroup.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ODataFilterGroup",
  slug: "odata-filter-group",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/ODataFilterGroup.sc.md",
  description:
    "Typed local filter editing with canonical public controls and caller-owned expression state.",
  properties: [
    {
      name: "labels",
      type: "ODataFilterLabels",
      description: "Caller technical labels for the existing editors.",
      source: "ODataFilterGroupProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "value",
      type: "ODataFilterConjunction",
      description: "Controlled and/or conjunction.",
      source: "ODataFilterGroupProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Caller-owned nested conditions.",
      source: "ODataFilterGroupProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "label",
      type: "string",
      description: "Forwarded public label setting.",
      source: "ODataFilterGroupProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "disabled",
      type: "boolean",
      description: "Forwarded public disabled setting.",
      source: "ODataFilterGroupProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "title",
      type: "string",
      description: "Forwarded public title setting.",
      source: "ODataFilterGroupProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [
    {
      name: "onValueChange",
      signature: "(value: ODataFilterConjunction) => void",
      description: "Requested typed value accepted by the caller.",
    },
    {
      name: "onAddCondition",
      signature: "() => void",
      description: "Caller inserts a new condition with a stable id.",
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
      Component: ODataFilterGroupExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
