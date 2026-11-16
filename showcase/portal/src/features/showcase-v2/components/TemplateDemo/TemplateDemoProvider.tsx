"use client";
import { createContext, type ReactNode } from "react";
import { useTemplateDemoState } from "./useTemplateDemo";
export const TemplateDemoContext = createContext<ReturnType<typeof useTemplateDemoState> | null>(
  null,
);

export function TemplateDemoProvider({ children }: { children: ReactNode }) {
  const state = useTemplateDemoState();

  return <TemplateDemoContext value={state}>{children}</TemplateDemoContext>;
}
