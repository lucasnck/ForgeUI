"use client";
import { useLocale } from "../../../../../../../web/library/src/support/i18n";
import { useTheme } from "../../../../../../../web/library/src/support/theme";

export function useTemplateFrame(
  template: string,
  scenario: string,
  properties: Readonly<Record<string, unknown>>,
) {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();
  const query = new URLSearchParams({ locale, theme: resolvedTheme });
  for (const [name, value] of Object.entries(properties))
    if (typeof value === "string" || typeof value === "boolean") query.set(name, String(value));
  return "/demos/templates/" + template + "/" + scenario + "/?" + query.toString();
}
