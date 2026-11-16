"use client";
import { useState } from "react";
import type { TooltipProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function useTooltipExample() {
  const binding =
    useExampleProperties<Pick<TooltipProps, "content" | "open" | "animated">>("Tooltip");
  const [accepted, setAccepted] = useState(false);
  const [requested, setRequested] = useState<boolean | null>(null);
  const [requests, setRequests] = useState(0);
  const open = binding.properties.open ?? accepted;
  const request = binding.bindChange("open", (next: boolean) => {
    setAccepted(next);
    setRequested(next);
    setRequests((n) => n + 1);
  });
  useExamplePropertySnapshot("Tooltip", {
    content: "Content",
    open,
    animated: true,
  });
  return {
    properties: binding.properties,
    open,
    request,
    state: { open, requested, requests },
  };
}
