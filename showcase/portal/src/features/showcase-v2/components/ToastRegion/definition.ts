"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ToastRegionExample, ToastRegionTimedExample } from "./ToastRegion.example";
import { basicCode, timedCode } from "./usage-code";
const definition = {
  name: "ToastRegion",
  slug: "toast-region",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/ToastRegion.sc.md",
  description:
    "Scoped indexed notifications with canonical queue ownership, dismissal and focus repair.",
  properties: [
    {
      name: "label",
      type: "string",
      description: "Required region accessible name.",
      source: "ToastRegionProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "records",
      type: "readonly ToastRecord[]",
      description: "Accepted controlled records with stable original ids.",
      source: "ToastRegionOptions",
      required: false,
      defaultValue: null,
    },
    {
      name: "defaultRecords",
      type: "readonly ToastRecord[]",
      description: "Uncontrolled initial queue; this example is controlled.",
      source: "ToastRegionOptions",
      required: false,
      defaultValue: null,
    },
    {
      name: "fallbackRef",
      type: "RefObject<HTMLElement | null>",
      description: "Focus destination after the last dismissal.",
      source: "ToastRegionOptions",
      required: false,
      defaultValue: null,
    },
    {
      name: "renderToast",
      type: "(record: ToastRecord) => ReactElement<ToastProps>",
      description: "Must return the public Toast constructor.",
      source: "ToastRegionProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native section title.",
      source: "NativeSectionRootProps",
      required: false,
      defaultValue: null,
    },
  ],
  methods: [],
  events: [
    {
      name: "onRecordsChange",
      signature: "(records: readonly ToastRecord[]) => void",
      description: "Canonical queue requests accepted by the caller.",
    },
  ],
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
      title: "Manual scoped notifications",
      description: "Public scoped composition",
      code: basicCode,
      Component: ToastRegionExample,
    },
    {
      id: "timed",
      title: "Timed queue and pause",
      description: "Canonical short/long durations and controlled record updates",
      code: timedCode,
      Component: ToastRegionTimedExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
