"use client";
import { TreePreview } from "../tree.shared";
import { useTreeNavigationResourceExample } from "./useTreeNavigationResourceExample";

export function UseTreeNavigationExample() {
  const view = useTreeNavigationResourceExample();
  const { state: viewState } = view;

  return <TreePreview {...view} navigation={viewState} />;
}
