"use client";
import type { AlertDialogHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useAlertDialogHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<AlertDialogHeaderProps, "title" | "divider">>("AlertDialogHeader");
  const base = useDialogPreview();
  useExamplePropertySnapshot("AlertDialogHeader", {
    title: "Title",
    divider: true,
  });
  return { ...base, properties };
}
