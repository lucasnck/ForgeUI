"use client";
import { TemplateFrame } from "../TemplateDemos/TemplateFrame";
import { useApplicationLayoutFooterExample } from "./useApplicationLayoutFooterExample";

export function ApplicationLayoutFooterExample() {
  const view = useApplicationLayoutFooterExample();

  return <TemplateFrame src={view.src} title="ApplicationLayoutFooter — footer" />;
}
