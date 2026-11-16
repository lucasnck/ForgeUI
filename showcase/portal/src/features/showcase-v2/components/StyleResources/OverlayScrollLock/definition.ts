import type { ShowcaseV2ResourceDefinition } from "../../../model/showcase-v2-resource.types";
import { OverlayScrollLockExample } from "./OverlayScrollLock.example";
import { usageCode } from "./usage-code";
const definition = {
  slug: "overlay-scroll-lock",
  name: "Overlay Scroll Lock",
  kind: "style",
  specification: "docs/sc/ds/styles/tech-overlay-scroll-lock.sc.md",
  source: "@/design-system/styles/overlay-scroll-lock.css",
  description:
    "Scoped scroll ownership. The preview consumes the real DS resource; state belongs to its caller. Reset restores the initial example and releases its effects.",
  examples: [
    {
      id: "overlay-scroll-lock-example",
      title: "Scoped scroll ownership",
      description:
        "Interact with the controls and observe the actual resource state. The code shows direct public consumption inside your caller context.",
      code: usageCode,
      Component: OverlayScrollLockExample,
    },
  ],
  contracts: [
    {
      title: "Attributes",
      entries: [
        {
          name: "data-overlay-scroll-locked",
          type: "true",
          description:
            "Canonical selector applied by its public DS consumer. Preserve native semantics and supported public props.",
        },
      ],
    },
  ],
  notes: [],
  related: [],
} satisfies ShowcaseV2ResourceDefinition;
export default definition;
