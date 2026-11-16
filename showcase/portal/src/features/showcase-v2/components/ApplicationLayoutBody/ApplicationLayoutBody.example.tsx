"use client";
import { TemplateFrame } from "../TemplateDemos/TemplateFrame";
import { useApplicationLayoutBodyExample } from "./useApplicationLayoutBodyExample";

export function ApplicationLayoutBodyExample() {
  const view = useApplicationLayoutBodyExample();

  return <TemplateFrame src={view.src} title="ApplicationLayoutBody — body" />;
}
