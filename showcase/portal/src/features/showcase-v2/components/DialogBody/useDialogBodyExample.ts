"use client";
import type { DialogBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useDialogBodyExample() {
  const { properties } =
    useExampleProperties<Pick<DialogBodyProps, "children" | "title">>("DialogBody");
  const base = useDialogPreview();
  useExamplePropertySnapshot("DialogBody", {
    children: "Children",
    title: "Title",
  });
  return { ...base, properties };
}
