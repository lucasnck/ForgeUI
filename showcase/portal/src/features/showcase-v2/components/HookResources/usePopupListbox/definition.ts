import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UsePopupListboxExample } from "./usePopupListbox.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-popup-listbox",
  name: "usePopupListbox",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-popup-contracts.sc.md",
  source: "@/design-system",
  description:
    "Active descendant and acceptance. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-popup-listbox-example",
      title: "Active descendant and acceptance",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UsePopupListboxExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "id?",
          type: "string",
          description: "Optional stable DOM namespace for connected trigger/panel identifiers.",
        },
        {
          name: "count",
          type: "number",
          description:
            "Number of eligible options. Filter disabled records before indexing; this hook has no disabled-index API.",
        },
        {
          name: "queryKey",
          type: "string | null",
          description: "Current eligible query identity; null closes/disables the popup.",
        },
        {
          name: "onAcceptOption",
          type: "(index: number): void",
          description: "Receive the accepted eligible zero-based index.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "isOpen",
          type: "boolean",
          description: "Current popup visibility.",
        },
        {
          name: "activeIndex",
          type: "number",
          description: "Current active eligible index, or -1.",
        },
        {
          name: "listboxId",
          type: "string",
          description: "Canonical listbox DOM id.",
        },
        {
          name: "optionId",
          type: "(index: number): string",
          description: "Get a connected option id for an eligible index.",
        },
        {
          name: "comboboxAttributes",
          type: "PopupComboboxAttributes",
          description: "Spread role, expanded, controls and active-descendant on the query input.",
        },
        {
          name: "listboxAttributes",
          type: "PopupListboxAttributes",
          description: "Spread the canonical listbox id and role.",
        },
        {
          name: "optionAttributes",
          type: "(index: number): PopupOptionAttributes",
          description: "Spread connected option identity, role and active state.",
        },
        {
          name: "onFocus",
          type: "(event: FocusEvent<HTMLElement>): void",
          description: "Attach to the query to activate eligible options.",
        },
        {
          name: "onBlur",
          type: "(event: FocusEvent<HTMLElement>): void",
          description: "Attach to the query to dismiss on focus loss.",
        },
        {
          name: "onKeyDown",
          type: "(event: KeyboardEvent<HTMLElement>): void",
          description: "Delegate the keyboard event to the canonical hook.",
        },
        {
          name: "acceptOption",
          type: "(index: number): void",
          description: "Accept an eligible index through the caller callback.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
