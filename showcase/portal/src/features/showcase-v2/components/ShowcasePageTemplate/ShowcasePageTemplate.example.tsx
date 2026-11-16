"use client";
import { TemplateFrame } from "../TemplateDemos/TemplateFrame";
import { useShowcasePageTemplateExample } from "./useShowcasePageTemplateExample";

export function ShowcasePageTemplateExample() {
  const view = useShowcasePageTemplateExample();

  return <TemplateFrame src={view.src} title="ShowcasePageTemplate — catalog" />;
}

export function ShowcasePageTemplateSecondaryExample() {
  const view = useShowcasePageTemplateExample(true);

  return <TemplateFrame src={view.src} title="ShowcasePageTemplate — focused" />;
}
