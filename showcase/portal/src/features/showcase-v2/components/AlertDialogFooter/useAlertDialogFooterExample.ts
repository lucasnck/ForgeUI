"use client";
import type { AlertDialogFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useAlertDialogFooterExample() {
  const { properties } =
    useExampleProperties<Pick<AlertDialogFooterProps, "children" | "divider" | "title">>(
      "AlertDialogFooter",
    );
  const base = useDialogPreview();
  useExamplePropertySnapshot("AlertDialogFooter", {
    children: "Children",
    divider: true,
    title: "Title",
  });
  return { ...base, properties };
}
