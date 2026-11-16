"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AlertDialogHeaderExample } from "./AlertDialogHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "AlertDialogHeader",
  slug: "alert-dialog-header",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/AlertDialogHeader.sc.md",
  description: "Public native dialog composition with safe actions and caller-owned record state.",
  properties: [
    {
      name: "title",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Nonblank public header title.",
      source: "ModalHeaderProps",
    },
    {
      name: "icon",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Public Icon composition; kept structured in this example.",
      source: "ModalHeaderProps",
    },
    {
      name: "divider",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Canonical separator.",
      source: "ModalHeaderProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Structured public DialogClose action is preserved.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/molecules/AlertDialogHeader/index.ts",
    },
    {
      id: "composition",
      name: "Public composition",
      description:
        "One canonical Modal engine; aliases preserve public constructor identity. Part previews use public Dialog and minimum visible siblings; AlertDialog aggregate separately owns required description and safe initial focus.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "AlertDialogHeader contextual region",
      description: "AlertDialogHeader contextual region",
      code: basicCode,
      Component: AlertDialogHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
