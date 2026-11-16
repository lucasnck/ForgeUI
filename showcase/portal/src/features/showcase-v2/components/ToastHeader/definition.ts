"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ToastHeaderExample } from "./ToastHeader.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ToastHeader",
  slug: "toast-header",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ToastHeader.sc.md",
  description:
    "Scoped indexed notifications with canonical queue ownership, dismissal and focus repair.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Contextual content and real scoped actions.",
      source: "ToastHeaderProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native region title.",
      source: "ToastHeaderProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "scope",
      name: "Public notification scope",
      description:
        "ToastRegion owns live announcements and timers. Public useToast producers/dismissal reuse the same queue; caller record updates preserve ids. Reset unmounts the queue and cancels pending work.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "ToastHeader contextual region",
      description: "Public scoped composition",
      code: basicCode,
      Component: ToastHeaderExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
