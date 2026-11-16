"use client";
import type { ApplicationLayoutFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTemplateFrame } from "../TemplateDemos/useTemplateFrame";

export function useApplicationLayoutFooterExample(secondary = false) {
  const { properties } =
    useExampleProperties<Pick<ApplicationLayoutFooterProps, "children">>("ApplicationLayoutFooter");
  useExamplePropertySnapshot("ApplicationLayoutFooter", {
    children: "Children",
  });
  return {
    src: useTemplateFrame(
      "application-layout-template",
      secondary ? "minimal" : "footer",
      properties,
    ),
  };
}
