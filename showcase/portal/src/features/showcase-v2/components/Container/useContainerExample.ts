"use client";
import { useState } from "react";
import type { ContainerProps } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useContainerExample() {
  const [gap, setGap] = useState("2");
  const [padding, setPadding] = useState("2");
  const [variant, setVariant] = useState("narrow");
  const [saveCount, setSaveCount] = useState(0);
  const [cancelCount, setCancelCount] = useState(0);

  function save() {
    setSaveCount((v) => v + 1);
  }

  function cancel() {
    setCancelCount((v) => v + 1);
  }

  return {
    gap,
    gapValue: gap as NonNullable<ContainerProps["gap"]>,
    setGap,
    padding,
    paddingValue: padding as NonNullable<ContainerProps["padding"]>,
    setPadding,
    variant,
    setVariant,
    saveCount,
    cancelCount,
    save,
    cancel,
    copy: useResourceExampleCopy(),
  };
}
