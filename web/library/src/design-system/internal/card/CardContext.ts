"use client";

import { createContext, useContext } from "react";

export interface CardContextValue {
  titleId?: string;
}
export const CardContext = createContext<CardContextValue | null>(null);

export function useCardContext() {
  const context = useContext(CardContext);
  if (!context) throw new Error("Card parts must be rendered inside Card.");
  return context;
}
