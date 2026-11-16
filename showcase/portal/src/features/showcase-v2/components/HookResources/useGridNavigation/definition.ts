import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseGridNavigationExample } from "./useGridNavigation.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-grid-navigation",
  name: "useGridNavigation",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-grid-navigation.sc.md",
  source: "@/design-system",
  description:
    "Cell focus matrix. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-grid-navigation-example",
      title: "Cell focus matrix",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseGridNavigationExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "rowKeys",
          type: "readonly string[]",
          description: "Ordered stable visible row identities.",
        },
        {
          name: "columnKeys",
          type: "readonly string[]",
          description: "Ordered stable column identities.",
        },
        {
          name: "direction?",
          type: "NavigationDirection",
          description: "LTR or RTL keyboard direction.",
        },
        {
          name: "pageRows?",
          type: "number",
          description: "Row distance for PageUp/PageDown.",
        },
        {
          name: "fallbackRef?",
          type: "RefObject<HTMLElement | null>",
          description:
            "Caller-owned focus fallback when an active item disappears. Attach to a focusable root.",
        },
        {
          name: "resolveRemovedCell?",
          type: "(previous: GridCellAddress): GridCellAddress | null",
          description: "Optional canonical address resolver when a cell disappears.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "active",
          type: "GridCellAddress | null",
          description: "Current active cell address.",
        },
        {
          name: "registerCell",
          type: "(address: GridCellAddress, ref: RefObject<HTMLElement | null>): () => void",
          description:
            "Register each mounted cell address/ref; run the returned cleanup on unmount.",
        },
        {
          name: "tabIndex",
          type: "(address: GridCellAddress): number",
          description: "Obtain the canonical roving tab stop for an enabled item/cell.",
        },
        {
          name: "onCellFocus",
          type: "(address: GridCellAddress): void",
          description: "Notify focus entering a registered cell.",
        },
        {
          name: "focusCell",
          type: "(address: GridCellAddress): void",
          description: "Move DOM focus to a registered cell.",
        },
        {
          name: "onCellKeyDown",
          type: "(event: KeyboardEvent<HTMLElement>, address: GridCellAddress): void",
          description: "Delegate grid keyboard traversal using the cell address.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
