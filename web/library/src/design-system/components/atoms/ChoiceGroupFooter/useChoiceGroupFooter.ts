"use client";

import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import type { ChoiceGroupFooterProps } from "./ChoiceGroupFooter";

export function useChoiceGroupFooter({
  children,
  className,
  ...nativeProps
}: ChoiceGroupFooterProps) {
  const context = useChoiceGroupContext();

  return { context, children, className, nativeProps };
}
