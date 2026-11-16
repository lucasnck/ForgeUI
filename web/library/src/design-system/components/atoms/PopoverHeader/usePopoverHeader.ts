"use client";
import { usePopoverContext } from "../../../internal/popover/PopoverContext";
import type { PopoverHeaderProps } from "./PopoverHeader";

export function usePopoverHeader(input: PopoverHeaderProps) {
  usePopoverContext();
  return input;
}
