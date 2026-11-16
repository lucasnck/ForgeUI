"use client";
import type { FormProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useNativeFormExample } from "./useNativeFormExample";

export function useFormExample() {
  const native = useNativeFormExample();
  const { properties } =
    useExampleProperties<
      Pick<FormProps, "loading" | "loadingLabel" | "noValidate" | "name" | "title" | "autoComplete">
    >("Form");
  useExamplePropertySnapshot("Form", {
    loading: false,
    loadingLabel: "LoadingLabel",
    noValidate: false,
    name: "Name",
    title: "Title",
    autoComplete: "on",
  });
  return { ...native, properties };
}
