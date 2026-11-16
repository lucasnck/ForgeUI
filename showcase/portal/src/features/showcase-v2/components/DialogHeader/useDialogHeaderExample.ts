"use client";
import type { DialogHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useDialogHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<DialogHeaderProps, "title" | "divider">>("DialogHeader");
  const base = useDialogPreview();
  useExamplePropertySnapshot("DialogHeader", { title: "Title", divider: true });
  return { ...base, properties };
}
