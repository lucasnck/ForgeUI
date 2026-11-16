"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { OverlayPortalExample } from "./OverlayPortal.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "OverlayPortal",
  slug: "overlay-portal",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/OverlayPortal.sc.md",
  description: "Caller-owned passive Surface mounted at the document body after hydration.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Portaled public Surface content; the caller owns show/close and focus return.",
      source: "ComponentChildrenProps",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/atoms/OverlayPortal/OverlayPortal.tsx",
    },
    {
      id: "ownership",
      name: "Public composition",
      description:
        "OverlayPortal only owns the portal container. Caller callbacks scroll the mounted passive region into view and return trigger focus; no modal/trap or overlay layer is fabricated.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Mounted portal",
      description: "Mounted portal",
      code: basicCode,
      Component: OverlayPortalExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
