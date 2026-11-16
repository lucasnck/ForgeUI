"use client";
import type { FormFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNativeFormExample } from "../Form/useNativeFormExample";

export function useFormFooterExample() {
  const native = useNativeFormExample();
  const { properties } = useExampleProperties<Pick<FormFooterProps, "title">>("FormFooter");
  useExamplePropertySnapshot("FormFooter", { title: "Title" });
  return { ...native, properties };
}
