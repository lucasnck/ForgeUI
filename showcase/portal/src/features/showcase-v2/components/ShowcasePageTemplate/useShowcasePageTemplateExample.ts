"use client";
import type { ShowcasePageTemplateProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useTemplateFrame } from "../TemplateDemos/useTemplateFrame";

export function useShowcasePageTemplateExample(secondary = false) {
  const { properties } =
    useExampleProperties<Pick<ShowcasePageTemplateProps, "title" | "children">>(
      "ShowcasePageTemplate",
    );
  useExamplePropertySnapshot("ShowcasePageTemplate", {
    title: "Title",
    children: "Children",
  });
  return {
    src: useTemplateFrame("showcase-page-template", secondary ? "focused" : "catalog", properties),
  };
}
