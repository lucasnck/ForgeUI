"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PopupListboxExample } from "./PopupListbox.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "PopupListbox",
  slug: "popup-listbox",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/PopupListbox.sc.md",
  description: "Public popup adapter with indexed options and real keyboard/pointer acceptance.",
  properties: [
    {
      name: "popup",
      type: "PopupListboxContract",
      description: "Real public usePopupListbox adapter shared with input.",
      required: true,
      defaultValue: null,
      source: "PopupListboxProps<Item>",
    },
    {
      name: "items",
      type: "readonly Item[]",
      description: "Caller-filtered enabled options with stable original keys.",
      required: true,
      defaultValue: null,
      source: "PopupListboxProps<Item>",
    },
    {
      name: "getOptionLabel",
      type: "(item: Item) => string",
      description: "Plain option label.",
      required: true,
      defaultValue: null,
      source: "PopupListboxProps<Item>",
    },
    {
      name: "getOptionKey",
      type: "(item: Item, index: number) => string",
      description: "Stable record identity.",
      required: false,
      defaultValue: null,
      source: "PopupListboxProps<Item>",
    },
    {
      name: "listboxLabel",
      type: "string",
      description: "Native listbox accessible name.",
      required: false,
      defaultValue: null,
      source: "PopupListboxProps<Item>",
    },
    {
      name: "animated",
      type: "boolean",
      description: "Canonical presence opt-out.",
      required: false,
      defaultValue: "true",
      source: "PopupListboxProps<Item>",
    },
    {
      name: "animationEffect",
      type: "AnimationEffect",
      description: "Canonical popup surface effect.",
      required: false,
      defaultValue: "scale",
      source: "PopupListboxProps<Item>",
    },
  ],
  methods: [],
  events: [],
  features: [
    {
      id: "adapter",
      name: "usePopupListbox",
      description:
        "The public hook owns input focus, active descendant, Escape and acceptance. Canonical popup recipes position the list relative to its input.",
    },
  ],
  examples: [
    {
      id: "basic",
      title: "Public popup adapter",
      description: "Public hook and indexed options",
      code: basicCode,
      Component: PopupListboxExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
