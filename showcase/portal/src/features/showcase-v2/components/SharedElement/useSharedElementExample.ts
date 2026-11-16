"use client";
import { useId, useState, startTransition, addTransitionType } from "react";
import type { SharedElementProps, PageTransitionIntent } from "@forge-ui/web";
import { pageTransitionTypes } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useSharedElementExample() {
  const id = useId();
  const copy = useResourceExampleCopy();
  const { properties } =
    useExampleProperties<Pick<SharedElementProps, "animated" | "title" | "name" | "children">>(
      "SharedElement",
    );
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

  useExamplePropertySnapshot("SharedElement", {
    animated: true,
    title: "Title",
    name: "record-" + id,
    children: "Children",
  });
  return {
    properties,
    copy,
    detail,
    change,
    name: properties.name ?? "record-" + id,
    state: {
      recordId: "item-1",
      view: detail ? "detail" : "list",
      intent,
      changes,
    },
  };
}
