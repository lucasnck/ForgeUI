"use client";
import { useId, useState, startTransition, addTransitionType } from "react";
import type { PageTransitionProps, PageTransitionIntent } from "@forge-ui/web";
import { pageTransitionTypes } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function usePageTransitionExample() {
  const id = useId();
  const copy = useResourceExampleCopy();
  const { properties } =
    useExampleProperties<Pick<PageTransitionProps, "animated" | "title">>("PageTransition");
  const [detail, setDetail] = useState(false);
  const [changes, setChanges] = useState(0);
  const [intent, setIntent] = useState<PageTransitionIntent>("forward");

  function change(next: PageTransitionIntent) {
    startTransition(() => {
      addTransitionType(pageTransitionTypes[next]);
      setDetail((value) => !value);
      setIntent(next);
      setChanges((value) => value + 1);
    });
  }

  useExamplePropertySnapshot("PageTransition", {
    animated: true,
    title: "Title",
  });
  return {
    properties,
    copy,
    detail,
    change,
    name: "record-" + id,
    state: {
      recordId: "item-1",
      view: detail ? "detail" : "list",
      intent,
      changes,
    },
  };
}
