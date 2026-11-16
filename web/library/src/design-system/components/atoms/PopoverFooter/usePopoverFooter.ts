"use client";
import { usePopoverContext } from "../../../internal/popover/PopoverContext";
import type { PopoverFooterProps } from "./PopoverFooter";

export function usePopoverFooter(input: PopoverFooterProps) {
  usePopoverContext();
  return input;
}
