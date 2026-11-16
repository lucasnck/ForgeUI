"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { AlertDialogExample, AlertDialogAcknowledgementExample } from "./AlertDialog.example";
import { basicCode, secondaryCode } from "./usage-code";
const definition = {
  name: "AlertDialog",
  slug: "alert-dialog",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/AlertDialog.sc.md",
  description: "Public native dialog composition with safe actions and caller-owned record state.",
  properties: [
    {
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Accepted controlled open state.",
      source: "ComponentOpenProps",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Uncontrolled initial state; this preview is controlled.",
      source: "ComponentOpenProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Canonical dialog presence opt-out.",
      source: "ComponentAnimationEffectProps",
    },
    {
      name: "animationEffect",
      type: "AnimationEffect",
      required: false,
      defaultValue: "fade",
      description: "Canonical modal surface effect.",
      source: "ComponentAnimationEffectProps",
    },
    {
      name: "description",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required visible description associated with the alert dialog.",
      source: "AlertDialogProps",
    },
    {
      name: "initialFocusRef",
      type: "RefObject<HTMLButtonElement | null>",
      required: true,
      defaultValue: null,
      description: "Safe Cancel Button receives initial focus.",
      source: "AlertDialogProps",
    },
    {
      name: "returnFocusRef",
      type: "RefObject<HTMLElement | null>",
      required: false,
      defaultValue: null,
      description: "Caller opener reference for focus return.",
      source: "ModalProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Structured public regions and record controls.",
      source: "ComponentChildrenProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onOpenChange",
      signature: "(open: boolean) => void",
      description:
        "Native close/Escape/backdrop or public DialogClose request; caller accepts controlled state.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/AlertDialog/AlertDialog.tsx",
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
      title: "Record confirmation",
      description: "Record confirmation",
      code: basicCode,
      Component: AlertDialogExample,
    },
    {
      id: "secondary",
      title: "Validated acknowledgement",
      description: "Validated acknowledgement",
      code: secondaryCode,
      Component: AlertDialogAcknowledgementExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
