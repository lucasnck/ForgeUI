"use client";
import { useState } from "react";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function useCardFooterExample() {
  const { copy } = useShowcaseV2Copy();
  const [cancelCount, setCancelCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);

  function onCancel() {
    setCancelCount((value) => value + 1);
  }

  function onSave() {
    setSaveCount((value) => value + 1);
  }

  return { copy, cancelCount, saveCount, onCancel, onSave };
}
