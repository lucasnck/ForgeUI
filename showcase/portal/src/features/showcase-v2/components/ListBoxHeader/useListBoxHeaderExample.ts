"use client";
import type { ListBoxHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useListBoxHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<ListBoxHeaderProps, "children" | "title">>("ListBoxHeader");
  useExamplePropertySnapshot("ListBoxHeader", {
    children: "Children",
    title: "Title",
  });
  return { properties };
}
