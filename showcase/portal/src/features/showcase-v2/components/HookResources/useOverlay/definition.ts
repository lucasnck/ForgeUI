import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseOverlayExample } from "./useOverlay.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-overlay",
  name: "useOverlay",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-overlay-interactions.sc.md",
  source: "@/design-system",
  description:
    "Outside and topmost dismissal. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-overlay-example",
      title: "Outside and topmost dismissal",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseOverlayExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "open",
          type: "boolean",
          description:
            "Semantic open state. A supplied value is controlled; requests take effect only when its owner accepts them.",
        },
        {
          name: "triggerRef",
          type: "RefObject<HTMLElement | null>",
          description: "Attach to the owning trigger.",
        },
        {
          name: "panelRef",
          type: "RefObject<HTMLElement | null>",
          description: "Attach to the overlay content boundary.",
        },
        {
          name: "onEscape",
          type: "(): void",
          description: "Caller dismissal for the topmost eligible overlay.",
        },
        {
          name: "onOutside",
          type: "(): void",
          description: "Caller dismissal for a genuine outside interaction.",
        },
        {
          name: "nativeModal?",
          type: "boolean",
          description: "Marks native modality ownership; avoids competing modal behavior.",
        },
        {
          name: "lockScroll?",
          type: "boolean",
          description: "Acquire shared root scroll ownership while open; releases on cleanup.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "registerBranch",
          type: "(element: HTMLElement): () => void",
          description: "Include an external owned DOM branch as inside; run returned cleanup.",
        },
        {
          name: "restoreTriggerFocus",
          type: "(): void",
          description: "Explicitly restore the connected trigger when the caller closes.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
