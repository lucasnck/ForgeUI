import { basicCode, editCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { FormPageTemplateExample, FormPageTemplateEditExample } from "./FormPageTemplate.example";
const definition: ShowcaseV2Definition = {
  slug: "form-page",
  name: "FormPageTemplate",
  level: "templates",
  specification: "docs/sc/ds/components/templates/FormPageTemplate.sc.md",
  description: "Caller-owned form page composition.",
  examples: [
    {
      id: "form-page-overview",
      title: "Record form",
      description:
        "Native form owns the single brand/solid Save submit and neutral/ghost Cancel; templates preserve caller slots.",
      code: basicCode,
      Component: FormPageTemplateExample,
    },
    {
      id: "form-page-edit",
      title: "Edit record",
      description:
        "Known identity with native form-owned brand/solid Save, neutral/ghost Cancel and caller-owned validation/discard handling.",
      code: editCode,
      Component: FormPageTemplateEditExample,
    },
  ],
  properties: [
    {
      name: "titleId",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible page heading ID.",
      source: "PageHeaderContentProps",
    },
    {
      name: "pageTitle",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Page heading content.",
      source: "PageHeaderContentProps",
    },
    {
      name: "description",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-owned header slot.",
      source: "PageHeaderContentProps",
    },
    {
      name: "identity",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-owned header slot.",
      source: "PageHeaderContentProps",
    },
    {
      name: "breadcrumb",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-owned header slot.",
      source: "PageHeaderContentProps",
    },
    {
      name: "actions",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Caller-owned header slot.",
      source: "PageHeaderContentProps",
    },
    {
      name: "divider",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Show header divider.",
      source: "PageHeaderContentProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Caller-owned page content.",
      source: "FormPageTemplateProps",
    },
    {
      name: "notice",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Optional caller-owned composition slot.",
      source: "FormPageTemplateProps",
    },
    {
      name: "native attributes",
      type: "NativeSectionRootProps",
      required: false,
      defaultValue: null,
      description: "Native section attributes and ref.",
      source: "NativeSectionRootProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FormPageTemplateProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "composition",
      name: "Composition",
      description: "Pure section template; state and events belong to its supplied slots.",
    },
  ],
  demoHref: "/demos/records/create/",
};
export default definition;
