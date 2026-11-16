import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseListBoxStateExample } from "./useListBoxState.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-list-box-state",
  name: "useListBoxState",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-listbox-state.sc.md",
  source: "@/design-system",
  description:
    "Controlled option selection. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-list-box-state-example",
      title: "Controlled option selection",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseListBoxStateExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "value?",
          type: "readonly string[]",
          description: "Controlled selection owned by the caller.",
        },
        {
          name: "defaultValue?",
          type: "readonly string[]",
          description: "Initial uncontrolled selection.",
        },
        {
          name: "onValueChange?",
          type: "(value: readonly string[]): void",
          description: "Requests the next canonical value; update caller state to accept.",
        },
        {
          name: "options",
          type: "readonly ChoiceOption[]",
          description:
            "Indexed option descriptors with stable values, labels and optional disabled state.",
        },
        {
          name: "fallbackRef?",
          type: "RefObject<HTMLElement | null>",
          description:
            "Caller-owned focus fallback when an active item disappears. Attach to a focusable root.",
        },
        {
          name: "selectionMode?",
          type: "SelectionMode",
          description: "Canonical single or multiple selection behavior.",
        },
        {
          name: "disabled?",
          type: "boolean",
          description:
            "Prevents interaction without removing the native or ARIA disabled semantics.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "selected",
          type: "readonly string[]",
          description: "Current accepted selection.",
        },
        {
          name: "focus",
          type: "RovingFocusContract",
          description: "Canonical registered roving focus contract; not a second selection model.",
        },
        {
          name: "isSelected",
          type: "(value: string): boolean",
          description: "Read accepted selection for a stable value.",
        },
        {
          name: "select",
          type: "(value: string): void",
          description: "Request selection of an enabled stable key.",
        },
        {
          name: "reset",
          type: "(): void",
          description: "Request empty selection.",
        },
        {
          name: "onOptionKeyDown",
          type: "(event: KeyboardEvent<HTMLElement>, value: string): void",
          description: "Delegate option selection/navigation keys.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
