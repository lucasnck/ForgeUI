"use client";
import entries from "../../model/flutter-feedback.json";
import type { PropertySchema } from "../ExampleScope/example-store";
import type { ShowcaseV2Example, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { flutterNativeProperties } from "../../model/flutter-native-properties";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { FlutterPreview } from "./FlutterPreview";
import { dartString } from "./flutter-button-properties";

type Entry = (typeof entries)[number];

/** Only serializable controls are bridged. Children/actions stay consumer-owned Dart. */
export function resolveFeedback(slug: string, raw: Readonly<Record<string, unknown>>) {
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) return {};
  const resolved: Record<string, string | boolean> = {};
  for (const [name, field] of Object.entries(entry.schema)) {
    const value: unknown = raw[name] ?? field.defaultValue;
    const valid = field.kind === "boolean" ? typeof value === "boolean"
      : field.kind === "select" ? typeof value === "string" &&
          "options" in field && (field.options as string[]).includes(value)
      : typeof value === "string" && value.length <= 200 &&
          (!("nonblank" in field && field.nonblank) || value.trim().length > 0);
    resolved[name] = valid ? value as string | boolean : field.defaultValue;
  }
  return resolved;
}

/** Standalone expressions refer only to actual forge_ui public constructors. */
export function feedbackCode(slug: string, raw: Readonly<Record<string, unknown>>): string {
  const p = resolveFeedback(slug, raw);
  const s = (name: string) => dartString(String(p[name]));
  const action = `ForgeButton(onPressed: () {}, child: Text(${s("actionLabel")}))`;
  let expression: string;
  switch (slug) {
    case "card":
      expression = [
        "ForgeCard(",
        `  elevation: ForgeElevation.${p.elevation},`,
        `  fullWidth: ${p.fullWidth},`,
        "  children: [",
        `    ForgeCardHeader(child: Text(${s("titleText")})),`,
        `    ForgeCardBody(child: Text(${s("bodyText")})),`,
        `    ForgeCardFooter(child: ${action}),`,
        "  ],",
        ")",
      ].join("\n");
      break;
    case "alert":
      expression = [
        "ForgeAlert(",
        `  announcement: ForgeAnnouncementPoliteness.${p.announcement},`,
        "  children: [",
        `    ForgeAlertHeader(child: Text(${s("titleText")})),`,
        `    ForgeAlertBody(child: Text(${s("bodyText")})),`,
        `    ForgeAlertFooter(child: ${action}),`,
        "  ],",
        ")",
      ].join("\n");
      break;
    case "empty-state":
      expression = [
        "ForgeEmptyState(children: [",
        `  ForgeEmptyStateHeader(child: Text(${s("titleText")})),`,
        `  ForgeEmptyStateBody(child: Text(${s("bodyText")})),`,
        ...(p.showAction ? [`  ForgeEmptyStateFooter(child: ${action}),`] : []),
        "])",
      ].join("\n");
      break;
    case "error-state":
      expression = [
        "ForgeErrorState(",
        `  announcement: ForgeAnnouncementPoliteness.${p.announcement},`,
        "  children: [",
        `    ForgeErrorStateHeader(child: Text(${s("titleText")})),`,
        `    ForgeErrorStateBody(child: Text(${s("bodyText")})),`,
        `    ForgeErrorStateFooter(child: ${action}),`,
        "  ],",
        ")",
      ].join("\n");
      break;
    case "loading-state":
      expression = [
        "ForgeLoadingState(",
        `  label: ${s("label")},`,
        "  children: [",
        ...(p.titleText ? [`    ForgeLoadingStateHeader(child: Text(${s("titleText")})),`] : []),
        `    ForgeLoadingStateBody(child: Text(${s("bodyText")})),`,
        "  ],",
        ")",
      ].join("\n");
      break;
    default:
      return "// Native feedback example unavailable";
  }
  return [
    "import 'package:flutter/material.dart';",
    "import 'package:forge_ui/forge_ui.dart';",
    "",
    "// Connect onPressed to your consumer action; there is no implicit navigation or retry.",
    expression,
  ].join("\n");
}

function FeedbackExample({ entry }: { entry: Entry }) {
  const { properties } = useExampleProperties(entry.name);
  return <FlutterPreview slug={entry.slug} properties={properties} />;
}

export const feedbackConfigurations: Record<string, {
  schema: PropertySchema;
  properties: readonly ShowcaseV2Property[];
  examples: ShowcaseV2Example[];
}> = Object.fromEntries(entries.map((entry) => [entry.slug, {
  schema: entry.schema as unknown as PropertySchema,
  properties: flutterNativeProperties(entry.slug),
  examples: [{
    id: "basic",
    title: "Região de feedback nativa",
    description: "Composição Flutter real com partes canônicas e ações controladas pelo consumidor.",
    code: feedbackCode(entry.slug, {}),
    getCode: (properties: Readonly<Record<string, unknown>>) => feedbackCode(entry.slug, properties),
    Component: () => <FeedbackExample entry={entry} />,
  }],
}]));
