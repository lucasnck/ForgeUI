"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { DialogExample, DialogEditExample } from "./Dialog.example";
import { basicCode, secondaryCode } from "./usage-code";
const definition = {
  name: "Dialog",
  slug: "dialog",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/Dialog.sc.md",
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
      name: "closeOnOutsideClick",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Accepted native backdrop dismissal policy.",
      source: "ModalDismissProps",
    },
    {
      name: "initialFocusRef",
      type: "RefObject<HTMLElement | null>",
      required: false,
      defaultValue: null,
      description: "Safe initial action receives focus.",
      source: "ModalProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native dialog title; the required public Header supplies its accessible name.",
      source: "NativeModalRootProps",
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
      description: "src/design-system/components/organisms/Dialog/Dialog.tsx",
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
      title: "Record inspection",
      description: "Record inspection",
      code: basicCode,
      Component: DialogExample,
    },
    {
      id: "secondary",
      title: "Editable local record",
      description: "Editable local record",
      code: secondaryCode,
      Component: DialogEditExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
