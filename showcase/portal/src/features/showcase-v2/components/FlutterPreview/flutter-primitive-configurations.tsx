"use client";
import entries from "../../model/flutter-primitives.json";
import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { dartString } from "./flutter-button-properties";
type Entry = (typeof entries)[number];
export function resolvePrimitive(slug: string, raw: Readonly<Record<string, unknown>>) {
  const entry = entries.find(e => e.slug === slug);
  if (!entry) return {};
  const result: Record<string, string | number | boolean> = {};
  for (const [name, field] of Object.entries(entry.schema as unknown as PropertySchema)) {
    const value = raw[name] ?? field.defaultValue;
    const valid = field.kind === "select" ? field.options?.includes(value as string)
      : field.kind === "number" ? typeof value === "number" && Number.isFinite(value) && (name === "level" ? Number.isInteger(value) && value >= 1 && value <= 6 : value >= 0 && value <= 100)
      : field.kind === "boolean" ? typeof value === "boolean"
      : typeof value === "string" && (name !== "label" || value.trim().length > 0);
    result[name] = valid ? (typeof value === "string" ? value.slice(0, 200) : value as number | boolean) : field.defaultValue!;
  }
  return result;
}
function PrimitiveExample({ entry }: { entry: Entry }) {
  const { properties } = useExampleProperties(entry.name);
  return <FlutterPreview slug={entry.slug} properties={properties} />;
}
export function primitiveCode(entry: Entry, overrides: Readonly<Record<string, unknown>>) {
  const values = resolvePrimitive(entry.slug, overrides);
  const args = entry.snippetArgs.flatMap(arg => {
    const value = values[arg.key];
    if (arg.nullable && value === "inherit") return [];
    const literal = arg.type === "String" ? dartString(String(value))
      : arg.type.startsWith("Forge") ? arg.type + "." + String(value)
      : String(value);
    return ["  " + arg.key + ": " + literal + ","];
  });
  for (const fixture of [entry.extra, entry.fixture]) if (fixture) args.push("  " + fixture + ",");
  const imports = ["import 'package:flutter/material.dart';", "import 'package:forge_ui/forge_ui.dart';", ""];
  if (entry.name === "Label" || entry.name === "Link") {
    const label = entry.name === "Label";
    const resources = label ? "final binding = ForgeControlBinding(id: 'example');" : "int activations = 0;";
    const dispose = label ? "@override void dispose() { binding.dispose(); super.dispose(); }" : "";
    const callback = label ? "  control: binding," : "  onActivate: () => setState(() => activations++),\n  child: const Text('Abrir exemplo'),";
    const companion = label ? "ForgeInput(control: binding, semanticLabel: 'Campo do exemplo')" : "Text('Ativações: $activations')";
    return [...imports, "class Example extends StatefulWidget {", "  const Example({super.key});", "  @override State<Example> createState() => _ExampleState();", "}", "class _ExampleState extends State<Example> {", resources, dispose, "  @override Widget build(BuildContext context) => Column(children: [", "Forge" + entry.name + "(", callback, ...args, "),", companion, "]);", "}"].join("\n");
  }
  return ["import 'package:flutter/material.dart';", "import 'package:forge_ui/forge_ui.dart';", "", "Forge" + entry.name + "(", ...args, ")"].join("\n");
}
export const primitiveConfigurations: Record<string, {schema: PropertySchema; properties: readonly ShowcaseV2Property[]; examples: ShowcaseV2Example[]}> = Object.fromEntries(entries.map(entry => [entry.slug, {
  schema: entry.schema as unknown as PropertySchema,
  properties: flutterNativeProperties(entry.slug),
  examples: [{
    id: "basic", title: "Componente nativo", description: "Exemplo executado com a implementação Flutter e propriedades do construtor real.",
    code: primitiveCode(entry, {}), getCode: overrides => primitiveCode(entry, overrides),
    Component: () => <PrimitiveExample entry={entry} />
  }]
}]));
