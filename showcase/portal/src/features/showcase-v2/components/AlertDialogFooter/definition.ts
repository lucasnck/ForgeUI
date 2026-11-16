"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AlertDialogFooterExample } from "./AlertDialogFooter.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "AlertDialogFooter",
  slug: "alert-dialog-footer",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/AlertDialogFooter.sc.md",
  description: "Public native dialog composition with safe actions and caller-owned record state.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Editable text within the public region; the visible Close action remains.",
      source: "Native attributes",
    },
    {
      name: "divider",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Canonical separator.",
      source: "ModalFooterProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native property forwarded to its public owner.",
      source: "Native attributes",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/AlertDialogFooter/index.ts",
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
      title: "AlertDialogFooter contextual region",
      description: "AlertDialogFooter contextual region",
      code: basicCode,
      Component: AlertDialogFooterExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
