"use client";

import { createContext, useContext } from "react";
import type { ModalContract } from "../../types/modal";

export const ModalContext = createContext<
  (Pick<ModalContract, "open" | "requestOpen"> & { titleId: string }) | null
>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal parts must be rendered inside Modal.");
  return context;
}
