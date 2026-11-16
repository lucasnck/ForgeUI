"use client";
import { useCallback, useRef, useState } from "react";
import type { RefCallback } from "react";
import type { OverlayPortalProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useOverlayPortalExample() {
  const { properties } =
    useExampleProperties<Pick<OverlayPortalProps, "children">>("OverlayPortal");
  const copy = useResourceExampleCopy();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [shows, setShows] = useState(0);
  const [closes, setCloses] = useState(0);
  const portalRef: RefCallback<HTMLElement> = useCallback((node) => {
    node?.scrollIntoView({ block: "nearest" });
  }, []);

  function show() {
    setOpen(true);
    setShows((n) => n + 1);
  }

  function close() {
    setOpen(false);
    setCloses((n) => n + 1);
    queueMicrotask(() => {
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    });
  }

  useExamplePropertySnapshot("OverlayPortal", { children: "Children" });
  return {
    properties,
    copy,
    triggerRef,
    portalRef,
    open,
    show,
    close,
    state: { open, shows, closes },
  };
}
