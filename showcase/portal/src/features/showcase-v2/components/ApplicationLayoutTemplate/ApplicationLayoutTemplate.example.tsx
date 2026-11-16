"use client";
import { TemplateFrame } from "../TemplateDemos/TemplateFrame";
import { useApplicationLayoutTemplateExample } from "./useApplicationLayoutTemplateExample";

export function ApplicationLayoutTemplateExample() {
  const view = useApplicationLayoutTemplateExample();

  return <TemplateFrame src={view.src} title="ApplicationLayoutTemplate — shell" />;
}

export function ApplicationLayoutTemplateSecondaryExample() {
  const view = useApplicationLayoutTemplateExample(true);

  return <TemplateFrame src={view.src} title="ApplicationLayoutTemplate — minimal" />;
}
