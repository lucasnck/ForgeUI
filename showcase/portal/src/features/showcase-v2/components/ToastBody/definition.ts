"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ToastBodyExample } from "./ToastBody.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "ToastBody",
  slug: "toast-body",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/ToastBody.sc.md",
  description:
    "Scoped indexed notifications with canonical queue ownership, dismissal and focus repair.",
  properties: [
    {
      name: "children",
      type: "ReactNode",
      description: "Contextual content and real scoped actions.",
      source: "ToastBodyProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native region title.",
      source: "ToastBodyProps",
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
      title: "ToastBody contextual region",
      description: "Public scoped composition",
      code: basicCode,
      Component: ToastBodyExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
