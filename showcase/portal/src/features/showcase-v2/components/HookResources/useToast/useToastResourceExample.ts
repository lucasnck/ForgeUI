"use client";
import { useRef, useState } from "react";
import { useToast } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useToastResourceExample() {
  const queue = useToast();
  const sequence = useRef(0);
  const [lastId, setLastId] = useState("");
  const copy = useResourceExampleCopy();

  function add() {
    const index = ++sequence.current;
    const id = `item-${index}`;
    queue.add({
      id,
      title: `Title ${index}`,
      message: `Message ${index}`,
      duration: "persistent",
      dismissLabel: copy.dismiss,
    });
    setLastId(id);
  }

  function dismiss() {
    if (lastId) queue.dismiss(lastId);
  }

  return { queue, lastId, add, dismiss, copy };
}
