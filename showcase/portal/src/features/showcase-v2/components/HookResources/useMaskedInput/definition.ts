import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { UseMaskedInputExample } from "./useMaskedInput.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "use-masked-input",
  name: "useMaskedInput",
  kind: "hook",
  specification: "docs/sc/ds/hooks/tech-mask.sc.md",
  source: "@/design-system",
  description:
    "Display and canonical mask value. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "use-masked-input-example",
      title: "Display and canonical mask value",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: UseMaskedInputExample,
    },
  ],
  contracts: [
    {
      title: "Parameters",
      entries: [
        {
          name: "mask",
          type: "string",
          description: "Canonical mask pattern; use the exported mask constants when available.",
        },
        {
          name: "value",
          type: "string",
          description:
            "Controlled canonical input value owned by the caller; the mask derives its display value.",
        },
        {
          name: "onValueChange",
          type: "(value: string): void",
          description: "Requests the next canonical value; update caller state to accept.",
        },
      ],
    },
    {
      title: "Returns",
      entries: [
        {
          name: "inputRef",
          type: "RefObject<HTMLInputElement | null>",
          description: "Attach to the actual native input for selection/caret handling.",
        },
        {
          name: "displayValue",
          type: "string",
          description: "Formatted native input value.",
        },
        {
          name: "complete",
          type: "boolean",
          description: "Whether the canonical value fills the mask.",
        },
        {
          name: "inputMode",
          type: '"numeric" | "text"',
          description: "Pass to the actual input keyboard hint.",
        },
        {
          name: "maxLength",
          type: "number",
          description: "Pass to the actual input constraint.",
        },
        {
          name: "onChange",
          type: "(event: ChangeEvent<HTMLInputElement>): void",
          description: "Delegate the native change event; the hook emits the canonical value.",
        },
        {
          name: "onKeyDown",
          type: "(event: KeyboardEvent<HTMLInputElement>): void",
          description: "Delegate the keyboard event to the canonical hook.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
