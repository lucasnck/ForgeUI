"use client";
import { useId, useState } from "react";
import type { PageHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";

export function usePageHeaderExample() {
  const id = useId();
  const { properties } =
    useExampleProperties<Pick<PageHeaderProps, "pageTitle" | "description" | "divider" | "title">>(
      "PageHeader",
    );
  const [saves, setSaves] = useState(0);
  const [cancels, setCancels] = useState(0);
  const [navigations, setNavigations] = useState(0);

  function save() {
    setSaves((n) => n + 1);
  }

  function cancel() {
    setCancels((n) => n + 1);
  }

  function navigate() {
    setNavigations((n) => n + 1);
  }

  useExamplePropertySnapshot("PageHeader", {
    pageTitle: "PageTitle",
    description: "Description",
    divider: false,
    title: "Title",
  });
  return {
    id,
    properties,
    save,
    cancel,
    navigate,
    state: { recordId: "item-1", saves, cancels, navigations },
  };
}
