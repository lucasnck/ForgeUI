"use client";
import { useId, useState, startTransition, addTransitionType } from "react";
import { pageTransitionTypes } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useSharedElementRecipesExample() {
  const name = useId().replace(/[^a-zA-Z0-9_-]/g, "") + "-record-1";
  const [detail, setDetail] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [type, setType] = useState("forward");
  const [fallback, setFallback] = useState(false);

  function next() {
    const update = () => setDetail((value) => !value);
    if (fallback || !animated) update();
    else
      startTransition(() => {
        addTransitionType(
          type === "back"
            ? pageTransitionTypes.back
            : type === "replace"
              ? pageTransitionTypes.replace
              : type === "reveal"
                ? pageTransitionTypes.reveal
                : pageTransitionTypes.forward,
        );
        update();
      });
  }

  return {
    name,
    detail,
    animated,
    setAnimated,
    type,
    setType,
    fallback,
    setFallback,
    next,
    copy: useResourceExampleCopy(),
  };
}
