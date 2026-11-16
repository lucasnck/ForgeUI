"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import {
  ShowcasePageTemplateExample,
  ShowcasePageTemplateSecondaryExample,
} from "./ShowcasePageTemplate.example";
import { basicCode, secondaryCode } from "./usage-code";
const definition = {
  name: "ShowcasePageTemplate",
  slug: "showcase-page-template",
  level: "templates",
  specification: "docs/sc/ds/components/templates/ShowcasePageTemplate.sc.md",
  description: "Public structural composition in its own document with one native main landmark.",
  properties: [
    {
      name: "title",
      type: "ReactNode",
      description: "Editable text rendered through the public title slot.",
      source: "ShowcasePageTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Editable text rendered through the public children slot.",
      source: "ShowcasePageTemplateProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "navigation",
      type: "ReactNode",
      description: "Structured public slot with native focus/navigation semantics.",
      source: "ShowcasePageTemplateProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "toolbar",
      type: "ReactNode",
      description: "Structured public slot with native focus/navigation semantics.",
      source: "ShowcasePageTemplateProps",
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
      title: "Catalog shell",
      description: "Native landmarks in an isolated document",
      code: basicCode,
      Component: ShowcasePageTemplateExample,
    },
    {
      id: "secondary",
      title: "Focused preview shell",
      description: "Supported optional-slot composition",
      code: secondaryCode,
      Component: ShowcasePageTemplateSecondaryExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
