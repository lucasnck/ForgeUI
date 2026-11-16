import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseModalExample } from "./useModal.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-modal",
  name: "useModal",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-modal-interactions.sc.md",
  source: "@/design-system",
  description:
    "Native modal lifecycle. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-modal-example",
      title: "Native modal lifecycle",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseModalExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "open?",
          type: "boolean",
          description:
            "Semantic open state. A supplied value is controlled; requests take effect only when its owner accepts them.",
        },
        {
          name: "defaultOpen?",
          type: "boolean",
          description: "Initial open state for an uncontrolled caller.",
        },
        {
          name: "onOpenChange?",
          type: "(open: boolean): void",
          description:
            "Requests the next semantic open state; does not override a controlled value.",
        },
        {
          name: "closeOnOutsideClick?",
          type: "boolean",
          description: "Enable native dialog backdrop dismissal.",
        },
        {
          name: "initialFocusRef?",
          type: "RefObject<HTMLElement | null>",
          description: "Optional initial focus target inside the native dialog.",
        },
        {
          name: "returnFocusRef?",
          type: "RefObject<HTMLElement | null>",
          description: "Owning trigger to restore after native modal close.",
        },
        {
          name: "requiredInitialFocus?",
          type: "boolean",
          description: "Require a valid initial focus target.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "open",
          type: "boolean",
          description:
            "Semantic open state. A supplied value is controlled; requests take effect only when its owner accepts them.",
        },
        {
          name: "dialogRef",
          type: "RefObject<HTMLDialogElement | null>",
          description: "Attach to the actual dialog; the hook owns showModal/close lifecycle.",
        },
        {
          name: "requestOpen",
          type: "(open: boolean): void",
          description:
            "Request open/close through the canonical controlled or uncontrolled contract.",
        },
        {
          name: "onPointerDown",
          type: "(event: PointerEvent<HTMLDialogElement>): void",
          description: "Attach to the dialog for backdrop gesture ownership.",
        },
        {
          name: "onPointerCancel",
          type: "(event: PointerEvent<HTMLDialogElement>): void",
          description: "Attach to the dialog to cancel backdrop gesture tracking.",
        },
        {
          name: "onClick",
          type: "(event: MouseEvent<HTMLDialogElement>): void",
          description: "Attach to the dialog to complete backdrop dismissal.",
        },
        {
          name: "onCancel",
          type: "(event: SyntheticEvent<HTMLDialogElement>): void",
          description: "Attach to native dialog cancel; preserves caller-controlled state.",
        },
        {
          name: "onClose",
          type: "(event: SyntheticEvent<HTMLDialogElement>): void",
          description: "Attach to native dialog close reconciliation.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
