"use client";
import type { FormBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNativeFormExample } from "../Form/useNativeFormExample";

export function useFormBodyExample() {
  const native = useNativeFormExample();
  const { properties } =
    useExampleProperties<Pick<FormBodyProps, "children" | "title">>("FormBody");
  useExamplePropertySnapshot("FormBody", {
    title: "Title",
    children: "Children",
  });
  return { ...native, properties };
}
