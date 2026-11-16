"use client";
import { useState } from "react";
import { paginationItems } from "../Pagination/fixtures";

export function usePaginationExample() {
  const [page, setPage] = useState(6);
  const [disabled, setDisabled] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [calls, setCalls] = useState(0);
  const [reject, setReject] = useState(false);
  const [requested, setRequested] = useState<number | null>(null);

  function change(next: number) {
    setCalls((n) => n + 1);
    setRequested(next);
    if (!reject) setPage(next);
  }

  const items = paginationItems
    .filter((item) => item.page === 1 || item.page === 12 || Math.abs(item.page - page) <= 1)
    .map((item, index, array) => ({
      ...item,
      gapBefore: index > 0 && item.page - array[index - 1].page > 1,
    }));

  return {
    page,
    disabled,
    setDisabled,
    animated,
    setAnimated,
    reject,
    setReject,
    calls,
    requested,
    change,
    items,
  };
}
