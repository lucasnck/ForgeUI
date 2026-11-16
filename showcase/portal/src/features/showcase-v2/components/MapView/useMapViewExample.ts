"use client";

import { useMemo, useState } from "react";
import type { MapViewProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { createMapScene } from "./fixtures";

export function useMapViewExample(kind: "preview" | "approach" | "completed") {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState(0);
  const { properties } =
    useExampleProperties<Pick<MapViewProps, "label" | "description" | "status" | "title">>(
      "MapView",
    );
  const scene = useMemo(() => createMapScene(kind, step), [kind, step]);
  useExamplePropertySnapshot("MapView", {
    label: "Label",
    description: "Description",
    status: "ready",
    title: "Title",
  });

  function advance() {
    setStep((value) => value + 1);
  }

  function toggleFailure() {
    setFailed((value) => !value);
  }

  function reportError() {
    setErrors((value) => value + 1);
  }

  function reset() {
    setStep(0);
    setFailed(false);
    setErrors(0);
  }

  return {
    properties: {
      ...properties,
      label: properties.label?.trim() ? properties.label : "Label",
      description: properties.description?.trim() ? properties.description : "Description",
    },
    scene,
    step,
    failed,
    errors,
    advance,
    toggleFailure,
    reportError,
    reset,
  };
}
