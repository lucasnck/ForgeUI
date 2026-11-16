import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseTreeStateExample } from "./useTreeState.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-tree-state",
  name: "useTreeState",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-tree-state.sc.md",
  source: "@/design-system",
  description:
    "Controlled tree data state. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-tree-state-example",
      title: "Controlled tree data state",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseTreeStateExample,
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
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
