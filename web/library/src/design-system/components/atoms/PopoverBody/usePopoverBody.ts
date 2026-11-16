"use client";
import { usePopoverContext } from "../../../internal/popover/PopoverContext";
import type { PopoverBodyProps } from "./PopoverBody";

export function usePopoverBody(input: PopoverBodyProps) {
  usePopoverContext();
  return input;
}
