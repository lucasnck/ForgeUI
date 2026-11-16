"use client";
import type { ApplicationLayoutHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTemplateFrame } from "../TemplateDemos/useTemplateFrame";

export function useApplicationLayoutHeaderExample(secondary = false) {
  const { properties } =
    useExampleProperties<Pick<ApplicationLayoutHeaderProps, "children">>("ApplicationLayoutHeader");
  useExamplePropertySnapshot("ApplicationLayoutHeader", {
    children: "Children",
  });
  return {
    src: useTemplateFrame(
      "application-layout-template",
      secondary ? "minimal" : "header",
      properties,
    ),
  };
}
