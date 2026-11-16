"use client";
import { useState } from "react";
import type { DropdownMenuProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useMenuPreview } from "../Menu/useMenuPreview";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useDropdownMenuExample() {
  const binding =
    useExampleProperties<
      Pick<
        DropdownMenuProps,
        "open" | "label" | "disabled" | "animated" | "animationEffect" | "title"
      >
    >("DropdownMenu");
  const menu = useMenuPreview();
  const copy = useResourceExampleCopy();
  const [accepted, setAccepted] = useState(false);
  const [requestedOpen, setRequestedOpen] = useState<boolean | null>(null);
  const [openRequests, setOpenRequests] = useState(0);
  const [closeActions, setCloseActions] = useState(0);
  const open = binding.properties.open ?? accepted;
  const change = binding.bindChange("open", (next: boolean) => {
    setAccepted(next);
    setRequestedOpen(next);
    setOpenRequests((n) => n + 1);
  });

  function close() {
    binding.bindChange("open", setAccepted)(false);
    setCloseActions((n) => n + 1);
  }

  useExamplePropertySnapshot("DropdownMenu", {
    open,
    label: "Label",
    disabled: false,
    animated: true,
    animationEffect: "fade",
    title: "Title",
  });
  return {
    ...menu,
    copy,
    properties: binding.properties,
    open,
    change,
    close,
    state: { ...menu.state, open, requestedOpen, openRequests, closeActions },
  };
}
