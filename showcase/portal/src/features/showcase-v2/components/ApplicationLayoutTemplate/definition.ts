"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import {
  ApplicationLayoutTemplateExample,
  ApplicationLayoutTemplateSecondaryExample,
} from "./ApplicationLayoutTemplate.example";
import { basicCode, secondaryCode } from "./usage-code";
const definition = {
  name: "ApplicationLayoutTemplate",
  slug: "application-layout-template",
  level: "templates",
  specification: "docs/sc/ds/components/templates/ApplicationLayoutTemplate.sc.md",
  description: "Public structural composition in its own document with one native main landmark.",
  properties: [
    {
      name: "mainId",
      type: "string",
      description: "Editable text rendered through the public mainId slot.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: "main-content",
    },
    {
      name: "title",
      type: "string",
      description: "Editable text rendered through the public title slot.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "header",
      type: "ReactNode",
      description: "Editable text rendered through the public header slot.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "footer",
      type: "ReactNode",
      description: "Editable text rendered through the public footer slot.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Editable text rendered through the public children slot.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "navigation",
      type: "ReactNode",
      description: "Structured public slot with native focus/navigation semantics.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "toolbar",
      type: "ReactNode",
      description: "Structured public slot with native focus/navigation semantics.",
      source: "ApplicationLayoutTemplateProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "landmarks",
      name: "Isolated document",
      description:
        "A titled iframe loads a finite statically exported demo. The real public template creates its own main and region wrappers; caller Container supplies padding. Locale/theme follow the parent, and native buttons/navigation update local state. Copied code omits preview infrastructure.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Application shell",
      description: "Native landmarks in an isolated document",
      code: basicCode,
      Component: ApplicationLayoutTemplateExample,
    },
    {
      id: "secondary",
      title: "Minimal content shell",
      description: "Supported optional-slot composition",
      code: secondaryCode,
      Component: ApplicationLayoutTemplateSecondaryExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
