import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseTreeNavigationExample } from "./useTreeNavigation.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-tree-navigation",
  name: "useTreeNavigation",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-tree-state.sc.md",
  source: "@/design-system",
  description:
    "Hierarchical focus traversal. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-tree-navigation-example",
      title: "Hierarchical focus traversal",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseTreeNavigationExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "value?",
          type: "string | null",
          description: "Controlled selection owned by the caller.",
        },
        {
          name: "defaultValue?",
          type: "string | null",
          description: "Initial uncontrolled selection.",
        },
        {
          name: "onValueChange?",
          type: "(value: string | null): void",
          description: "Requests the next canonical value; update caller state to accept.",
        },
        {
          name: "expandedValue?",
          type: "readonly string[]",
          description:
            "Caller-owned DOM or state contract. Use the canonical public type and delegate to the resource.",
        },
        {
          name: "defaultExpandedValue?",
          type: "readonly string[]",
          description:
            "Caller-owned DOM or state contract. Use the canonical public type and delegate to the resource.",
        },
        {
          name: "onExpandedValueChange?",
          type: "(value: readonly string[]): void",
          description:
            "Caller-owned DOM or state contract. Use the canonical public type and delegate to the resource.",
        },
        {
          name: "nodes",
          type: "readonly TreeNodeDescriptor[]",
          description:
            "Canonical nested descriptors with stable keys; disabled nodes remain in the visible structure.",
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
          name: "selected",
          type: "string | null",
          description: "Current accepted selection.",
        },
        {
          name: "expanded",
          type: "readonly string[]",
          description: "Accepted expanded stable keys.",
        },
        {
          name: "visibleNodes",
          type: "readonly VisibleTreeNode[]",
          description:
            "Flattened visible nodes with canonical parent, level and sibling position metadata.",
        },
        {
          name: "isExpanded",
          type: "(key: string): boolean",
          description: "Read expansion of a registered stable key.",
        },
        {
          name: "setExpanded",
          type: "(key: string, expanded: boolean): void",
          description: "Request expansion for a stable key.",
        },
        {
          name: "select",
          type: "(key: string): void",
          description: "Request selection of an enabled stable key.",
        },
        {
          name: "focus",
          type: "RovingFocusContract",
          description: "Canonical registered roving focus contract; not a second selection model.",
        },
        {
          name: "onNodeKeyDown",
          type: "(event: KeyboardEvent<HTMLElement>, key: string): void",
          description: "Delegate hierarchical navigation to the canonical hook.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
