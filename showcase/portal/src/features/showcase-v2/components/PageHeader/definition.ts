"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PageHeaderExample } from "./PageHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "PageHeader",
  slug: "page-header",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/PageHeader.sc.md",
  description: "Composed page identity, breadcrumb and grouped secondary/primary actions.",
  properties: [
    {
      name: "titleId",
      type: "string",
      description: "Unique heading identity owned by the caller.",
      source: "PageHeaderContentProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "pageTitle",
      type: "ReactNode",
      description: "Editable heading text.",
      source: "PageHeaderContentProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Editable separate description.",
      source: "PageHeaderContentProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "identity",
      type: "ReactNode",
      description: "Structured Avatar identity.",
      source: "PageHeaderContentProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "breadcrumb",
      type: "ReactNode",
      description: "Native contextual navigation with a real destination.",
      source: "PageHeaderContentProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "actions",
      type: "ReactNode",
      description: "Right-aligned secondary/primary controls with local feedback.",
      source: "PageHeaderContentProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "divider",
      type: "boolean",
      description: "Optional canonical divider.",
      source: "PageHeaderContentProps",
      required: false,
      defaultValue: "false",
    },
    {
      name: "title",
      type: "string",
      description: "Native header title.",
      source: "Native attributes",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "layout",
      name: "Canonical header layout",
      description:
        "Public PageHeader owns identity/heading clustering and action wrapping. Caller supplies Container padding and functional action/navigation state.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Composed page heading",
      description: "Avatar identity and grouped actions",
      code: basicCode,
      Component: PageHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
