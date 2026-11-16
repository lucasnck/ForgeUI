import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseToastRegionExample } from "./useToastRegion.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-toast-region",
  name: "useToastRegion",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-notifications.sc.md",
  source: "@/design-system",
  description:
    "Scoped queue operations. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-toast-region-example",
      title: "Scoped queue operations",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseToastRegionExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "fallbackRef?",
          type: "RefObject<HTMLElement | null>",
          description:
            "Caller-owned focus fallback when an active item disappears. Attach to a focusable root.",
        },
        {
          name: "records?",
          type: "readonly ToastRecord[]",
          description:
            "Accepted queue records with stable ids. Controlled updates belong to the owner; duplicate add does not replace records.",
        },
        {
          name: "defaultRecords?",
          type: "readonly ToastRecord[]",
          description: "Initial uncontrolled queue records.",
        },
        {
          name: "onRecordsChange?",
          type: "(records: readonly ToastRecord[]): void",
          description: "Requests the next queue snapshot; accept by updating controlled records.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "records",
          type: "readonly ToastRecord[]",
          description:
            "Accepted queue records with stable ids. Controlled updates belong to the owner; duplicate add does not replace records.",
        },
        {
          name: "announcement",
          type: "{ sequence: number; messages: readonly { text: string; urgency: NotificationUrgency }[] } | null",
          description:
            "Canonical sequence and urgency-grouped messages. Announce each sequence once.",
        },
        {
          name: "registerRecord",
          type: "(id: string, root: RefObject<HTMLElement | null>, action: RefObject<HTMLElement | null>): () => void",
          description:
            "Register toast root/action refs for canonical focus restoration; run returned cleanup on unmount.",
        },
        {
          name: "add",
          type: "(record: ToastRecord): void",
          description: "Enqueue a new unique ToastRecord; duplicate ids throw.",
        },
        {
          name: "dismiss",
          type: "(id: string): void",
          description: "Request removal by stable id.",
        },
        {
          name: "pause",
          type: "(reason: ToastPauseReason): void",
          description: "Pause expiration for a supported reason; reasons can overlap.",
        },
        {
          name: "resume",
          type: "(reason: ToastPauseReason): void",
          description:
            "Release the matching pause reason; remaining duration resumes only after all reasons clear.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
