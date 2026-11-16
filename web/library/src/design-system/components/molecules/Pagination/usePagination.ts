"use client";

import type { PaginationProps } from "./Pagination";

export function usePagination({
  label,
  page,
  pageCount,
  onPageChange,
  disabled = false,
  children,
  className,
  ...props
}: PaginationProps) {
  if (!label.trim()) throw new Error("Pagination requires a nonempty navigation label.");

  if (
    !Number.isInteger(pageCount) ||
    pageCount < 1 ||
    !Number.isInteger(page) ||
    page < 1 ||
    page > pageCount
  ) {
    throw new Error("Invalid pagination range.");
  }

  function requestPage(next: number) {
    if (disabled || !Number.isInteger(next) || next === page || next < 1 || next > pageCount)
      return;
    onPageChange(next);
  }

  return { label, page, pageCount, disabled, children, className, props, requestPage };
}
