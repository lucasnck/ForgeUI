"use client";
import { FileSizeExample } from "./FileSizeExample";
import { fileSizeCode } from "./usage-code";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { basicCode } from "./usage-code";
import { FileInputExample } from "./FileInput.example";
const definition = {
  slug: "file-input",
  name: "FileInput",
  level: "molecules",
  specification: "docs/sc/ds/components/molecules/FileInput.sc.md",
  description: "Local file selection and observable native metadata.",
  properties: [
    {
      name: "size",
      type: "ComponentSize",
      required: false,
      source: "ComponentSizedProps",
      defaultValue: "md",
      description: "Canonical visual size, independent of semantic heading level.",
    },
    {
      name: "tone",
      type: "ComponentTone",
      required: false,
      source: "ComponentToneProps",
      defaultValue: "neutral",
      description: "Canonical semantic tone; inverse requires an inverse surface.",
    },
    {
      name: "appearance",
      type: "ComponentAppearance",
      required: false,
      source: "ComponentAppearanceProps",
      defaultValue: "bordered",
      description: "Canonical presentation recipe; preserves native semantics.",
    },
    {
      name: "shape",
      type: "ComponentShape",
      required: false,
      source: "ComponentShapeProps",
      defaultValue: null,
      description: "Optional shape override; otherwise inherits the document recipe.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      required: false,
      source: "ComponentFullWidthProps",
      defaultValue: "true",
      description: "Expands within available inline space.",
    },
    {
      name: "invalid",
      type: "boolean",
      required: false,
      source: "ComponentInvalidProps",
      defaultValue: null,
      description: "Validation appearance; FormField may derive this from its error.",
    },
    {
      name: "onFilesChange",
      type: "(files: readonly File[]): void",
      required: false,
      source: "FileInputProps",
      defaultValue: null,
      description: "Native local file selection; never uploads by itself.",
    },
    {
      name: "native attributes",
      type: 'Omit<NativeSpecializedInputProps, "value" | "defaultValue">',
      required: false,
      defaultValue: null,
      description:
        "Native attributes/events subject to this inherited contract and owner-reserved IDs/roles. Restricted native channels remain restricted.",
      source: "FileInputProps",
    },
    {
      name: "title",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FileInputProps",
    },
    {
      name: "placeholder",
      type: "string | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FileInputProps",
    },
    {
      name: "checked",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FileInputProps",
    },
    {
      name: "disabled",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FileInputProps",
    },
    {
      name: "readOnly",
      type: "boolean | undefined",
      required: false,
      defaultValue: null,
      description: "Inherited public property; edits apply to this example only.",
      source: "FileInputProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onFilesChange",
      signature: "(files: readonly File[]) => void",
      description:
        "Native local selection supplies file metadata. This preview never uploads files.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description:
        "src/design-system/components/molecules/FileInput/FileInput.tsx · delegates to public DS primitives",
    },
  ],
  examples: [
    {
      id: "file-size",
      title: "File size display",
      description:
        "Fixed byte counts compare decimal and binary units without selecting or uploading files.",
      code: fileSizeCode,
      Component: FileSizeExample,
    },
    {
      id: "basic",
      title: "Local file selection",
      description: "Choose a local file, compare accept/multiple, then clear it. No upload occurs.",
      code: basicCode,
      Component: FileInputExample,
    },
  ],
} satisfies ShowcaseV2Definition;
export default definition;
