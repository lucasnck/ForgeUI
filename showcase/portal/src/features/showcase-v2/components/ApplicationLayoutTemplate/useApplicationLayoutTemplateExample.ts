"use client";
import type { ApplicationLayoutTemplateProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTemplateFrame } from "../TemplateDemos/useTemplateFrame";

export function useApplicationLayoutTemplateExample(secondary = false) {
  const { properties } = useExampleProperties<
    Pick<ApplicationLayoutTemplateProps, "mainId" | "title" | "header" | "footer" | "children">
  >("ApplicationLayoutTemplate");
  useExamplePropertySnapshot("ApplicationLayoutTemplate", {
    mainId: "main-content",
    title: "Title",
    header: "Header",
    footer: "Footer",
    children: "Children",
  });
  return {
    src: useTemplateFrame(
      "application-layout-template",
      secondary ? "minimal" : "shell",
      properties,
    ),
  };
}
