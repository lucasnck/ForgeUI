"use client";
import type { FormHeaderProps, FormProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useFormHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<FormHeaderProps, "children" | "title">>("FormHeader");
  useExamplePropertySnapshot("FormHeader", {
    children: "Children",
    title: "Title",
  });
  const submit: FormProps["onValidSubmit"] = () => undefined;

  return { properties, submit };
}
