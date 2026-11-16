"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ApplicationLayoutHeaderExample } from "./ApplicationLayoutHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ApplicationLayoutHeader",
  slug: "application-layout-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ApplicationLayoutHeader.sc.md",
  description: "Public structural composition in its own document with one native main landmark.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Editable text rendered through the public children slot.",
      source: "ApplicationLayoutHeaderProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description:
        "Native wrapper title is owned by the generated region; the template does not expose a forwarding prop.",
      source: "ApplicationLayoutHeaderProps",
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
      title: "ApplicationLayoutHeader contextual region",
      description: "Native landmarks in an isolated document",
      code: basicCode,
      Component: ApplicationLayoutHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
