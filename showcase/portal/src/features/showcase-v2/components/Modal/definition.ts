"use client";
import { basicCode, inputCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ModalExample, ModalInputExample } from "./Modal.example";
const definition = {
  slug: "modal",
  name: "Modal",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Modal.sc.md",
  description: "Modal public contract, interactive examples and composition resources.",
  examples: [
    {
      id: "basic",
      title: "Informational dialog",
      description:
        "Uses the public component contract with caller-owned settings and event feedback.",
      code: basicCode,
      Component: ModalExample,
    },
    {
      id: "input",
      title: "Composed input dialog",
      description:
        "Composes Label and Input with cancel and confirm actions; confirmation reports the local value, cancellation discards it.",
      code: inputCode,
      Component: ModalInputExample,
    },
  ],
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: true,
      defaultValue: null,
      description: "Direct public ModalHeader, ModalBody and ModalFooter parts; Body required.",
      source: "ModalProps",
    },
    {
      name: "open",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Controlled open state.",
      source: "ModalProps",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      required: false,
      defaultValue: null,
      description: "Initial uncontrolled open state; defaults effectively to closed.",
      source: "ModalProps",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      required: false,
      defaultValue: null,
      description:
        "Reports requested open-state changes; controlled callers accept them by updating open.",
      source: "ModalProps",
    },
    {
      name: "closeOnOutsideClick",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Enables backdrop dismissal through the shared modal engine.",
      source: "ModalProps",
    },
    {
      name: "animated",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Enables the shared native modal entry recipe; reduced motion is respected.",
      source: "ModalProps / canonical capability contract",
    },
    {
      name: "animationEffect",
      type: "AnimationEffect",
      required: false,
      defaultValue: "fade",
      description: "none, fade or scale.",
      source: "ModalProps / canonical capability contract",
    },
    {
      name: "initialFocusRef",
      type: "RefObject<HTMLElement | null>",
      required: false,
      defaultValue: null,
      description: "Connected initial focus target; required by alertdialog role.",
      source: "ModalProps",
    },
    {
      name: "returnFocusRef",
      type: "RefObject<HTMLElement | null>",
      required: false,
      defaultValue: null,
      description: "Connected target receiving focus after dismissal.",
      source: "ModalProps",
    },
    {
      name: "native attributes",
      type: "NativeModalRootProps",
      required: false,
      defaultValue: null,
      description:
        "Native dialog attributes/ref, excluding open, children, onCancel and onClose. aria-label allows omission of Header.",
      source: "ModalProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "ModalProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onOpenChange",
      signature: "(open: boolean) => void",
      description:
        "Requests state changes on Escape and configured backdrop dismissal; caller-owned footer actions update the controlled state.",
    },
  ],
  features: [
    {
      id: "composition",
      name: "Public aggregator",
      description:
        "Exactly one Body is required. Header is required without a nonempty aria-label. Footer is optional; parts render Header → Body → Footer.",
    },
    {
      id: "focus",
      name: "Dialog lifecycle",
      description:
        "Native top-layer modality, focus containment, Escape handling, initial focus, return focus and cleanup use the existing shared engine.",
    },
    {
      id: "input",
      name: "Caller-owned input",
      description:
        "Input confirmation and cancellation belong to the example, not to a Modal submission API.",
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
