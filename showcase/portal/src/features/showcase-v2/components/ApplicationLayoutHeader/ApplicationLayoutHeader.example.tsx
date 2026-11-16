"use client";
import { TemplateFrame } from "../TemplateDemos/TemplateFrame";
import { useApplicationLayoutHeaderExample } from "./useApplicationLayoutHeaderExample";

export function ApplicationLayoutHeaderExample() {
  const view = useApplicationLayoutHeaderExample();

  return <TemplateFrame src={view.src} title="ApplicationLayoutHeader — header" />;
}
