import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseRovingFocusExample } from "./useRovingFocus.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-roving-focus",
  name: "useRovingFocus",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-roving-focus.sc.md",
  source: "@/design-system",
  description:
    "Registered toolbar focus. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-roving-focus-example",
      title: "Registered toolbar focus",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseRovingFocusExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "orientation",
          type: "NavigationOrientation",
          description: "Canonical horizontal or vertical arrow traversal.",
        },
        {
          name: "direction?",
          type: "NavigationDirection",
          description: "LTR or RTL keyboard direction.",
        },
        {
          name: "loop?",
          type: "boolean",
          description: "Whether traversal wraps at the ends.",
        },
        {
          name: "typeahead?",
          type: "boolean",
          description: "Enable registered text-value search.",
        },
        {
          name: "initialId?",
          type: "string",
          description: "Preferred initially active stable id.",
        },
        {
          name: "fallbackRef?",
          type: "RefObject<HTMLElement | null>",
          description:
            "Caller-owned focus fallback when an active item disappears. Attach to a focusable root.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "activeId",
          type: "string | null",
          description: "Current registered active identity.",
        },
        {
          name: "registerItem",
          type: "(item: FocusItemRegistration): () => void",
          description:
            "Register mounted stable item identity and disabled state; run the returned cleanup when it unmounts.",
        },
        {
          name: "tabIndex",
          type: "(id: string): number",
          description: "Obtain the canonical roving tab stop for an enabled item/cell.",
        },
        {
          name: "isEnabled",
          type: "(id: string): boolean",
          description: "Read whether the registered identity is enabled.",
        },
        {
          name: "onItemFocus",
          type: "(id: string): void",
          description: "Notify actual DOM focus entering an item.",
        },
        {
          name: "focus",
          type: "(id: string): void",
          description: "Move DOM focus to an enabled registered stable identity.",
        },
        {
          name: "focusFirst",
          type: "(): void",
          description: "Focus the first enabled registered item.",
        },
        {
          name: "focusLast",
          type: "(): void",
          description: "Focus the last enabled registered item.",
        },
        {
          name: "onKeyDown",
          type: "(event: KeyboardEvent<HTMLElement>): void",
          description: "Delegate the keyboard event to the canonical hook.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
