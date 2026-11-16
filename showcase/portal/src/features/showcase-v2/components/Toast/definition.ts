"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { ToastExample } from "./Toast.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "Toast",
  slug: "toast",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/Toast.sc.md",
  description:
    "Scoped indexed notifications with canonical queue ownership, dismissal and focus repair.",
  properties: [
    {
      name: "record",
      type: "ToastRecord",
      description: "Authoritative record supplied by the public region.",
      source: "ToastProps",
      required: true,
      defaultValue: null,
    },
    {
      name: "animated",
      type: "boolean",
      description: "Shared surface feedback opt-out.",
      source: "ComponentAnimationEffectProps",
      required: false,
      defaultValue: "true",
    },
    {
      name: "animationEffect",
      type: "AnimationEffect",
      description: "Canonical surface effect.",
      source: "ComponentAnimationEffectProps",
      required: false,
      defaultValue: "fade",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Public Header/Body/Footer composition.",
      source: "NativeWidgetItemProps",
      required: false,
      defaultValue: null,
    },
    {
      name: "title",
      type: "string",
      description: "Native list item title.",
      source: "NativeWidgetItemProps",
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
      title: "Scoped toast composition",
      description: "Public scoped composition",
      code: basicCode,
      Component: ToastExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
