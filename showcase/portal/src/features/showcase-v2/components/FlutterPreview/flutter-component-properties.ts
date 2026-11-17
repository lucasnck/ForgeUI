import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Property } from "../../model/showcase-v2.types";
import {
  dartString,
  enumValue,
  flutterSizes,
  flutterTones,
} from "./flutter-button-properties";
export const flutterSpaces = [
  "s0",
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s8",
  "s10",
  "s12",
  "s16",
  "s20",
] as const;
export interface FlutterSpinnerProperties {
  size: string;
  tone: string;
  animated: boolean;
  decorative: boolean;
  label: string;
}
export interface FlutterGroupProperties {
  label: string;
  gap: string;
  padding: string;
  fullWidth: boolean;
}
export const flutterSpinnerSchema: PropertySchema = {
  size: { kind: "select", options: flutterSizes, defaultValue: "md" },
  tone: {
    kind: "select",
    options: ["inherit", ...flutterTones],
    defaultValue: "inherit",
  },
  animated: { kind: "boolean", defaultValue: true },
  decorative: { kind: "boolean", defaultValue: true },
  label: { kind: "text", defaultValue: "Carregando conteúdo" },
};
export const flutterGroupSchema: PropertySchema = {
  label: { kind: "text", defaultValue: "Ações" },
  gap: { kind: "select", options: flutterSpaces, defaultValue: "s2" },
  padding: {
    kind: "select",
    options: ["inherit", ...flutterSpaces],
    defaultValue: "inherit",
  },
  fullWidth: { kind: "boolean", defaultValue: false },
};
function properties(
  schema: PropertySchema,
  source: string,
): readonly ShowcaseV2Property[] {
  return Object.entries(schema).map(([name, s]) => ({
    name,
    type:
      s.kind === "boolean"
        ? "bool"
        : s.kind === "select"
          ? "Forge enum"
          : "String",
    required: name === "label" && source === "ForgeButtonGroup",
    defaultValue: String(s.defaultValue),
    source,
    description:
      source === "ForgeSpinner" && name === "decorative"
        ? "Sem anúncio quando decorativo; caso contrário exige label não vazio."
        : name === "padding"
          ? "inherit não adiciona padding; demais valores usam os tokens."
          : "Propriedade real do widget; alterações atualizam a prévia nativa.",
  }));
}
export const flutterSpinnerProperties = properties(
  flutterSpinnerSchema,
  "ForgeSpinner",
);
export const flutterGroupProperties: readonly ShowcaseV2Property[] = [
  ...properties(flutterGroupSchema, "ForgeButtonGroup"),
  {
    name: "children",
    type: "List<Widget>",
    required: true,
    defaultValue: null,
    source: "ForgeButtonGroup",
    description:
      "Fixture tipada com ações independentes; o exemplo mantém a lista em Dart.",
  },
];
export function resolveSpinner(
  v: Readonly<Record<string, unknown>>,
): FlutterSpinnerProperties {
  return {
    size: enumValue(v.size, flutterSizes, "md"),
    tone: enumValue(v.tone, ["inherit", ...flutterTones], "inherit"),
    animated: v.animated !== false,
    decorative: v.decorative !== false,
    label:
      typeof v.label === "string" && v.label.trim()
        ? v.label.slice(0, 200)
        : "Carregando conteúdo",
  };
}
export function resolveGroup(
  v: Readonly<Record<string, unknown>>,
): FlutterGroupProperties {
  return {
    label:
      typeof v.label === "string" && v.label.trim()
        ? v.label.slice(0, 200)
        : "Ações",
    gap: enumValue(v.gap, flutterSpaces, "s2"),
    padding: enumValue(v.padding, ["inherit", ...flutterSpaces], "inherit"),
    fullWidth: v.fullWidth === true,
  };
}
export function spinnerCode(v: Readonly<Record<string, unknown>>): string {
  const p = resolveSpinner(v);
  return [
    "import 'package:forge_ui/forge_ui.dart';",
    "",
    "ForgeSpinner(",
    "  size: ForgeSize." + p.size + ",",
    ...(p.tone !== "inherit" ? ["  tone: ForgeTone." + p.tone + ","] : []),
    "  animated: " + p.animated + ",",
    "  decorative: " + p.decorative + ",",
    "  label: " + dartString(p.label) + ",",
    ")",
  ].join("\n");
}
export function groupCode(v: Readonly<Record<string, unknown>>): string {
  const p = resolveGroup(v);
  return [
    "import 'package:flutter/widgets.dart';",
    "import 'package:forge_ui/forge_ui.dart';",
    "",
    "ForgeButtonGroup(",
    "  label: " + dartString(p.label) + ",",
    "  gap: ForgeSpace." + p.gap + ",",
    ...(p.padding !== "inherit"
      ? ["  padding: ForgeSpace." + p.padding + ","]
      : []),
    "  fullWidth: " + p.fullWidth + ",",
    "  children: [",
    "    ForgeButton(onPressed: () {}, child: const Text('Salvar')),",
    "    ForgeButton(onPressed: () {}, tone: ForgeTone.neutral, appearance: ForgeAppearance.ghost, child: const Text('Cancelar')),",
    "  ],",
    ")",
  ].join("\n");
}
