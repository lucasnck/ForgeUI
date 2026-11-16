import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseDisclosureGroupExample } from "./useDisclosureGroup.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-disclosure-group",
  name: "useDisclosureGroup",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-disclosure-hooks.sc.md",
  source: "@/design-system",
  description:
    "Exclusive and multiple keys. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-disclosure-group-example",
      title: "Exclusive and multiple keys",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseDisclosureGroupExample,
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
          name: "multiple?",
          type: "boolean",
          description: "Allows several expanded item keys.",
        },
        {
          name: "collapsible?",
          type: "boolean",
          description: "Allows the final expanded item to close.",
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
          name: "disabled",
          type: "boolean",
          description:
            "Prevents interaction without removing the native or ARIA disabled semantics.",
        },
        {
          name: "value",
          type: "readonly string[]",
          description: "Controlled selection owned by the caller.",
        },
        {
          name: "registerItem",
          type: "(value: string, disabled?: boolean): () => void",
          description:
            "Register mounted stable item identity and disabled state; run the returned cleanup when it unmounts.",
        },
        {
          name: "isExpanded",
          type: "(value: string): boolean",
          description: "Read expansion of a registered stable key.",
        },
        {
          name: "setExpanded",
          type: "(value: string, open: boolean): void",
          description: "Request expansion for a stable key.",
        },
        {
          name: "toggle",
          type: "(value: string): void",
          description: "Request the inverse open state or expansion of the supplied stable key.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
