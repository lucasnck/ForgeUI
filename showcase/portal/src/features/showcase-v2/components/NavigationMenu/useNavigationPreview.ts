"use client";
import { useId, useState } from "react";
import type { MouseEventHandler } from "react";

export function useNavigationPreview(
  nested = false,
  override?: boolean,
  accept?: (next: boolean) => void,
) {
  const id = useId();
  const [current, setCurrent] = useState(nested ? "item-2" : "item-1");
  const [accepted, setAccepted] = useState(true);
  const [requestedOpen, setRequestedOpen] = useState<boolean | null>(null);
  const [requests, setRequests] = useState(0);
  const [navigations, setNavigations] = useState(0);
  const open = override ?? accepted;

  function change(next: boolean) {
    setAccepted(next);
    accept?.(next);
    setRequestedOpen(next);
    setRequests((n) => n + 1);
  }

  function activate(value: string): MouseEventHandler<HTMLLIElement> {
    return (event) => {
      if (
        !event.defaultPrevented &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.shiftKey &&
        event.currentTarget.querySelector("a")?.contains(event.target as Node)
      ) {
        setCurrent(value);
        setNavigations((n) => n + 1);
      }
    };
  }

  function href(value: string) {
    return "#" + id + "-" + value;
  }

  return {
    id,
    current,
    open,
    change,
    activate,
    href,
    state: {
      current,
      navigations,
      ...(nested ? { open, requestedOpen, requests } : {}),
    },
  };
}
