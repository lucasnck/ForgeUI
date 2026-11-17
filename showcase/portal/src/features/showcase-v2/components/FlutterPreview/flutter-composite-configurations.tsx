"use client";
import entries from "../../model/flutter-composites.json";
import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { dartString } from "./flutter-button-properties";

// Bridge knobs are explicitly mapped to real owner/part props. Widget slots,
// controllers and callbacks remain typed Dart fixtures, never fake JSON props.
type Entry = (typeof entries)[number];

export function resolveComposite(slug: string, raw: Readonly<Record<string, unknown>>) {
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) return {};
  const output: Record<string, string | boolean | number> = {};
  for (const [name, field] of Object.entries(entry.schema)) {
    const value: unknown = raw[name] ?? field.defaultValue;
    const valid = field.kind === "boolean" ? typeof value === "boolean"
      : field.kind === "number" ? typeof value === "number" && Number.isInteger(value) &&
          value >= ("min" in field ? field.min : 1) &&
          value <= ("max" in field ? field.max : 12)
      : typeof value === "string" && value.length <= 200 &&
          (!("nonblank" in field && field.nonblank) || value.trim().length > 0);
    output[name] = valid ? value as string | boolean | number : field.defaultValue;
  }
  if (slug === "pagination" && (output.page as number) > (output.pageCount as number)) {
    output.page = output.pageCount;
  }
  return output;
}

export function compositeCode(slug: string, raw: Readonly<Record<string, unknown>>): string {
  const p = resolveComposite(slug, raw);
  const s = (name: string) => dartString(String(p[name]));
  switch (slug) {
    case "breadcrumb":
      return [
        "import 'package:flutter/material.dart';",
        "import 'package:forge_ui/forge_ui.dart';",
        "",
        "ForgeBreadcrumb(",
        `  label: ${s("label")},`,
        "  children: [",
        "    // Replace this consumer-owned callback with your router.",
        `    ForgeBreadcrumbItem(href: '/catalog', onActivate: () {}, child: Text(${s("ancestorLabel")})),`,
        `    ForgeBreadcrumbItem(current: true, child: Text(${s("currentLabel")})),`,
        "  ],",
        ")",
      ].join("\n");
    case "pagination":
      return [
        "import 'package:flutter/material.dart';",
        "import 'package:forge_ui/forge_ui.dart';",
        "",
        "class PaginationExample extends StatefulWidget {",
        "  const PaginationExample({super.key});",
        "  @override State<PaginationExample> createState() => _PaginationExampleState();",
        "}",
        "class _PaginationExampleState extends State<PaginationExample> {",
        `  int page = ${p.page};`,
        "  @override Widget build(BuildContext context) => ForgePagination(",
        `    label: ${s("label")},`,
        "    page: page,",
        `    pageCount: ${p.pageCount},`,
        `    disabled: ${p.disabled},`,
        "    onPageChange: (next) => setState(() => page = next),",
        "    children: [",
        `      for (var n = 1; n <= ${p.pageCount}; n++)`,
        "        ForgePaginationItem(page: n, label: 'Página $n'),",
        "    ],",
        "  );",
        "}",
      ].join("\n");
    case "tag-group":
      return [
        "import 'package:flutter/material.dart';",
        "import 'package:forge_ui/forge_ui.dart';",
        "",
        "class TagGroupExample extends StatefulWidget {",
        "  const TagGroupExample({super.key});",
        "  @override State<TagGroupExample> createState() => _TagGroupExampleState();",
        "}",
        "class _TagGroupExampleState extends State<TagGroupExample> {",
        "  final removed = <String>{};",
        "  @override Widget build(BuildContext context) => ForgeTagGroup(",
        `    label: ${s("label")},`,
        `    fullWidth: ${p.fullWidth},`,
        "    items: [",
        "      if (!removed.contains('flutter')) ForgeTagGroupEntry(",
        "        id: 'flutter',",
        "        tag: ForgeTagConfiguration(",
        `          text: ${s("tagText")},`,
        `          removeLabel: ${s("removeLabel")},`,
        `          disabled: ${p.disabled},`,
        "          onRemove: () => setState(() => removed.add('flutter')),",
        "        ),",
        "      ),",
        "    ],",
        "  );",
        "}",
      ].join("\n");
    case "page-header":
      return [
        "import 'package:flutter/material.dart';",
        "import 'package:forge_ui/forge_ui.dart';",
        "",
        "ForgePageHeader(",
        `  titleId: ${s("titleId")},`,
        `  pageTitle: Text(${s("pageTitle")}),`,
        ...(p.description ? [`  description: Text(${s("description")}),`] : []),
        "  identity: const ForgeAvatar(label: 'Equipe Forge', initials: 'F'),",
        ...[
          "  breadcrumb: ForgeBreadcrumb(label: 'Localização', children: [",
          "    ForgeBreadcrumbItem(href: '/home', onActivate: () {}, child: const Text('Início')),",
          "    const ForgeBreadcrumbItem(current: true, child: Text('Registros')),",
          "  ]),",
        ],
        ...[
          "  actions: ForgeButton(onPressed: () {}, child: const Text('Adicionar')),",
        ],
        `  divider: ${p.divider},`,
        ")",
      ].join("\n");
    default:
      return "// Composition unavailable";
  }
}

function CompositeExample({ entry }: { entry: Entry }) {
  const { properties } = useExampleProperties(entry.name);
  return <FlutterPreview slug={entry.slug} properties={properties} />;
}

export const compositeConfigurations: Record<string, {
  schema: PropertySchema;
  properties: readonly ShowcaseV2Property[];
  examples: ShowcaseV2Example[];
}> = Object.fromEntries(entries.map((entry) => [entry.slug, {
  schema: entry.schema as unknown as PropertySchema,
  properties: flutterNativeProperties(entry.slug),
  examples: [{
    id: "basic",
    title: "Composição nativa",
    description: "Widget Flutter real com filhos canônicos e estado controlado pelo consumidor.",
    code: compositeCode(entry.slug, {}),
    getCode: (properties: Readonly<Record<string, unknown>>) => compositeCode(entry.slug, properties),
    Component: () => <CompositeExample entry={entry} />,
  }],
}]));
