"use client";
import type { DialogCloseProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";

export function useDialogCloseExample() {
  const { properties } =
    useExampleProperties<
      Pick<DialogCloseProps, "children" | "disabled" | "size" | "tone" | "appearance" | "shape">
    >("DialogClose");
  const base = useDialogPreview();
  useExamplePropertySnapshot("DialogClose", {
    children: base.copy.close,
    disabled: false,
    size: "md",
    tone: "brand",
    appearance: "solid",
    shape: "rounded",
  });
  return { ...base, properties };
}
