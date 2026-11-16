"use client";

import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import type { ChoiceGroupBodyProps } from "./ChoiceGroupBody";

export function useChoiceGroupBody({ children, className, ...nativeProps }: ChoiceGroupBodyProps) {
  const context = useChoiceGroupContext();

  return { context, children, className, nativeProps };
}
