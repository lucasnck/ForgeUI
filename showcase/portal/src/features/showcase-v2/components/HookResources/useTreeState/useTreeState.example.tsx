"use client";
import { TreePreview } from "../tree.shared";
import { useTreeStateResourceExample } from "./useTreeStateResourceExample";

export function UseTreeStateExample() {
  const view = useTreeStateResourceExample();

  return <TreePreview {...view} />;
}
