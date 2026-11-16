"use client";
import { useState } from "react";
import type { SimpleGridProps } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";


export function useSimpleGridExample() {
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
    gapValue: gap as NonNullable<SimpleGridProps["gap"]>,
    setGap,
    padding,
    paddingValue: padding as NonNullable<SimpleGridProps["padding"]>,
    setPadding,
    variant,
    setVariant,
    columns: variant as NonNullable<SimpleGridProps["columns"]>["base"],
    saveCount,
    cancelCount,
    save,
    cancel,
    copy: useResourceExampleCopy(),
  };
}