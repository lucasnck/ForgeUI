"use client";
import type { ApplicationLayoutBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTemplateFrame } from "../TemplateDemos/useTemplateFrame";

export function useApplicationLayoutBodyExample(secondary = false) {
  const { properties } =
    useExampleProperties<Pick<ApplicationLayoutBodyProps, "children">>("ApplicationLayoutBody");
  useExamplePropertySnapshot("ApplicationLayoutBody", { children: "Children" });
  return {
    src: useTemplateFrame(
      "application-layout-template",
      secondary ? "minimal" : "body",
      properties,
    ),
  };
}
