"use client";
import { useTreePreview } from "../Tree/useTreePreview";

export function useTreeGroupExample() {
  const view = useTreePreview({ partial: true, reject: false });

  return { ...view };
}
