"use client";

import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import type { ChoiceGroupHeaderProps } from "./ChoiceGroupHeader";

export function useChoiceGroupHeader({
  children,
  className,
  ...nativeProps
}: ChoiceGroupHeaderProps) {
  const context = useChoiceGroupContext();

  return { context, children, className, nativeProps };
}
