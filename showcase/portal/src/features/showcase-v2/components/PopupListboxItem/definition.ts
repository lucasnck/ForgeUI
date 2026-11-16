"use client";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { PopupListboxItemExample } from "./PopupListboxItem.example";
import { basicCode } from "./usage-code";
const definition = {
  name: "PopupListboxItem",
  slug: "popup-listbox-item",
  level: "atoms",
  specification: "docs/sc/ds/components/atoms/PopupListboxItem.sc.md",
  description: "Public popup adapter with indexed options and real keyboard/pointer acceptance.",
  properties: [
    {
      name: "popup",
      type: "PopupListboxContract",
      description: "Real public usePopupListbox adapter shared with the input.",
      required: true,
      defaultValue: null,
      source: "PopupListboxItemProps",
    },
    {
      name: "index",
      type: "number",
      description: "Current enabled-array position; stable keys and text retain original indices.",
      required: true,
      defaultValue: null,
      source: "PopupListboxItemProps",
    },
    {
      name: "label",
      type: "string",
      description: "Editable label prefix followed by original option index.",
      required: true,
      defaultValue: null,
      source: "PopupListboxItemProps",
    },
    {
      name: "animated",
      type: "boolean",
      description: "Canonical active feedback opt-out.",
      required: false,
      defaultValue: "true",
      source: "PopupListboxItemProps",
    },
    {
      name: "title",
      type: "string",
      description: "Native item title prefix followed by original option index.",
      required: false,
      defaultValue: null,
      source: "PopupListboxItemProps",
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
      Component: PopupListboxItemExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
