"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import {
  ConfirmationModalExample,
  ConfirmationModalPendingExample,
} from "./ConfirmationModal.example";
import { basicCode, secondaryCode } from "./usage-code";
const definition = {
  name: "ConfirmationModal",
  slug: "confirmation-modal",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/ConfirmationModal.sc.md",
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
      name: "title",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonblank title/action label.",
      source: "ConfirmationModalProps",
    },
    {
      name: "closeLabel",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonblank title/action label.",
      source: "ConfirmationModalProps",
    },
    {
      name: "cancelLabel",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonblank title/action label.",
      source: "ConfirmationModalProps",
    },
    {
      name: "confirmLabel",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Required nonblank title/action label.",
      source: "ConfirmationModalProps",
    },
    {
      name: "loading",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Caller-owned pending operation; source Button blocks repeat confirmation.",
      source: "ComponentLoadingProps",
    },
    {
      name: "loadingLabel",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Accessible progress label supplied while pending.",
      source: "ComponentLoadingProps",
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
      description: "Public body content slot.",
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
    {
      name: "onConfirm",
      signature: "() => void",
      description:
        "Caller owns confirmation, cancellable pending work and accepted close; cancel never confirms.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/ConfirmationModal/ConfirmationModal.tsx",
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
      title: "Immediate confirmation",
      description: "Immediate confirmation",
      code: basicCode,
      Component: ConfirmationModalExample,
    },
    {
      id: "secondary",
      title: "Pending confirmation",
      description: "Pending confirmation",
      code: secondaryCode,
      Component: ConfirmationModalPendingExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
