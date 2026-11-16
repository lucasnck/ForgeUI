import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseCollapseExample } from "./useCollapse.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-collapse",
  name: "useCollapse",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-disclosure-hooks.sc.md",
  source: "@/design-system",
  description:
    "Controlled and local disclosure. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-collapse-example",
      title: "Controlled and local disclosure",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseCollapseExample,
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
          name: "disabled?",
          type: "boolean",
          description:
            "Prevents interaction without removing the native or ARIA disabled semantics.",
        },
        {
          name: "id?",
          type: "string",
          description: "Optional stable DOM namespace for connected trigger/panel identifiers.",
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
          name: "open",
          type: "boolean",
          description:
            "Semantic open state. A supplied value is controlled; requests take effect only when its owner accepts them.",
        },
        {
          name: "triggerRef",
          type: "RefObject<HTMLButtonElement | null>",
          description: "Attach to the owning trigger.",
        },
        {
          name: "bodyRef",
          type: "RefObject<HTMLDivElement | null>",
          description: "Attach to the disclosure body.",
        },
        {
          name: "triggerProps",
          type: 'ComponentPropsWithRef<"button">',
          description:
            "Spread onto the native button together with triggerRef and wire onClick to toggle.",
        },
        {
          name: "bodyProps",
          type: 'ComponentPropsWithRef<"div">',
          description:
            "Spread onto the body together with bodyRef; preserves connected visibility semantics.",
        },
        {
          name: "requestOpen",
          type: "(open: boolean): void",
          description:
            "Request open/close through the canonical controlled or uncontrolled contract.",
        },
        {
          name: "toggle",
          type: "(): void",
          description: "Request the inverse open state or expansion of the supplied stable key.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
