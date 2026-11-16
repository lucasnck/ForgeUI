"use client";
import { useState } from "react";
import type { AnnouncementPoliteness } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useErrorStateExample() {
  const [children, setChildren] = useState("Children");
  const [showIcon, setShowIcon] = useState(true);
  const [announcement, setAnnouncement] = useState<AnnouncementPoliteness>("off");
  const [loading, setLoading] = useState(true);
  const [lastAction, setLastAction] = useState("—");
  const [count, setCount] = useState(0);

  function action() {
    setLastAction("retry");
    setCount((v) => v + 1);
  }

  function cancel() {
    setLastAction("cancel");
    setCount((v) => v + 1);
  }

  function changeAnnouncement(v: string) {
    setAnnouncement(v as AnnouncementPoliteness);
  }

  return {
    children,
    setChildren,
    showIcon,
    setShowIcon,
    announcement,
    changeAnnouncement,
    loading,
    setLoading,
    lastAction,
    count,
    action,
    cancel,
    copy: useResourceExampleCopy(),
  };
}
