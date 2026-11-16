"use client";
import type { DialogFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useDialogFooterExample() {
  const { properties } =
    useExampleProperties<Pick<DialogFooterProps, "children" | "divider" | "title">>("DialogFooter");
  const base = useDialogPreview();
  useExamplePropertySnapshot("DialogFooter", {
    children: "Children",
    divider: true,
    title: "Title",
  });
  return { ...base, properties };
}
