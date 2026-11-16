"use client";
import { useTreePreview } from "../Tree/useTreePreview";

export function useTreeItemExample() {
  const view = useTreePreview({ partial: true, reject: false });

  return { ...view };
}
