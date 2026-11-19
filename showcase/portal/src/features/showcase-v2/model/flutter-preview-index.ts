import parts from "./flutter-parts.json";
import advanced from "./flutter-advanced.json";
import transients from "./flutter-transients.json";
import manifest from "./flutter-preview-manifest.json";
import collections from "./flutter-collections.json";
import forms from "./flutter-forms.json";
import interactions from "./flutter-interactions.json";
import primitives from "./flutter-primitives.json";
import inputs from "./flutter-inputs.json";
import composites from "./flutter-composites.json";
import feedback from "./flutter-feedback.json";

export interface PlatformPreviewIndexEntry {
  componentSlug: string;
  platform: "flutter";
  available: true;
  codeLanguage: "dart";
  previewPath: "/flutter/index.html";
  buildId: string;
}

// The finite list is generated only after a real Flutter Web compilation succeeds.
const allowedSlugs = new Set([...parts.map(entry=>entry.slug),...advanced.map(entry=>entry.slug),...transients.map(entry=>entry.slug),...collections.map(entry=>entry.slug),...forms.map(entry=>entry.slug),...interactions.map(entry=>entry.slug),"button", "spinner", "button-group", ...primitives.map(entry => entry.slug), ...inputs.map(entry=>entry.slug), ...composites.map(entry=>entry.slug), ...feedback.map(entry=>entry.slug)]);
export function findFlutterPreview(
  componentSlug: string,
): PlatformPreviewIndexEntry | null {
  const entries = manifest.entries as PlatformPreviewIndexEntry[];
  if (manifest.schemaVersion !== 2) return null;
  const match = entries.find((entry) => entry.componentSlug === componentSlug);
  if (!match || !allowedSlugs.has(componentSlug)) return null;
  if (
    match.platform !== "flutter" ||
    match.available !== true ||
    match.codeLanguage !== "dart" ||
    match.previewPath !== "/flutter/index.html"
  )
    return null;
  if (!/^[a-f0-9]{16}$/.test(match.buildId ?? "")) return null;
  return {
    ...match,
    componentSlug,
    platform: "flutter",
    available: true,
    codeLanguage: "dart",
    previewPath: "/flutter/index.html",
  };
}
