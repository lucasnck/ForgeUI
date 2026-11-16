"use client";

import type { ComponentPropsWithRef } from "react";
import { usePaginationContext } from "../../../internal/pagination/PaginationContext";
import type { PaginationItemProps } from "./PaginationItem";

export function usePaginationItem({
  label,
  page,
  disabled,
  onClick,
  children,
  className,
  animated = true,
  "aria-current": current,
  ...props
}: PaginationItemProps) {
  const pagination = usePaginationContext();
  if (!label.trim()) throw new Error("PaginationItem requires a nonempty label.");
  if (!Number.isInteger(page) || page < 1 || page > pagination.pageCount)
    throw new Error("Invalid PaginationItem target.");
  const selected = pagination.page === page && current !== false && current !== "false";
  const unavailable = pagination.disabled || disabled;

  const handleClick: NonNullable<ComponentPropsWithRef<"button">["onClick"]> = (event) => {
    if (unavailable) return;
    onClick?.(event);
    if (!event.defaultPrevented) pagination.requestPage(page);
  };

  return { label, children, className, animated, props, selected, unavailable, handleClick };
}
