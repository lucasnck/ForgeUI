"use client";
import { useState } from "react";
import type { StackProps } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useStackExample() {
  const [gap, setGap] = useState("2");
  const [padding, setPadding] = useState("2");
  const [variant, setVariant] = useState("3");
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
    gapValue: gap as NonNullable<StackProps["gap"]>,
    setGap,
    padding,
    paddingValue: padding as NonNullable<StackProps["padding"]>,
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
