"use client";
import type { AlertDialogBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useAlertDialogBodyExample() {
  const { properties } =
    useExampleProperties<Pick<AlertDialogBodyProps, "children" | "title">>("AlertDialogBody");
  const base = useDialogPreview();
  useExamplePropertySnapshot("AlertDialogBody", {
    children: "Children",
    title: "Title",
  });
  return { ...base, properties };
}
