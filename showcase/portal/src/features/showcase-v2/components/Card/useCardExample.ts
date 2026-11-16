"use client";
import { useState } from "react";
import type { CardProps } from "@forge-ui/web";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function useCardExample(bodyOnly = false) {
  const { copy } = useShowcaseV2Copy();
  const [header, setHeader] = useState(!bodyOnly);
  const [footer, setFooter] = useState(!bodyOnly);
  const [fullWidth, setFullWidth] = useState(true);
  const [shape, setShape] = useState("inherited");
  const [elevation, setElevation] = useState<NonNullable<CardProps["elevation"]>>("raised");
  const [cancelCount, setCancelCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);

  function onCancel() {
    setCancelCount((value) => value + 1);
  }

  function onSave() {
    setSaveCount((value) => value + 1);
  }

  function changeElevation(value: string) {
    setElevation(value as NonNullable<CardProps["elevation"]>);
  }

  return {
    header,
    setHeader,
    footer,
    setFooter,
    fullWidth,
    setFullWidth,
    shape,
    setShape,
    elevation,
    changeElevation,
    copy,
    cancelCount,
    saveCount,
    onCancel,
    onSave,
    resolvedShape: shape === "inherited" ? undefined : (shape as CardProps["shape"]),
  };
}
