"use client";

import {
  useEffect,
  useEffectEvent,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { isMapScene } from "../../../helpers/map-geometry";
import type { MapViewProps } from "./MapView";
import { createMapRendererResource } from "./map-renderer-resource";

export function useMapView(input: MapViewProps) {
  const {
    label,
    description,
    scene,
    renderer,
    status,
    labels,
    onRendererError,
    children,
    className,
    ...props
  } = input;
  const id = useId();
  const canvasRef = useRef<HTMLDivElement>(null);
  const valid = isMapScene(scene);
  const empty = valid && scene.markers.length === 0 && scene.routes.length === 0;
  const enabled = status === "ready" && valid && !empty;
  const resource = useMemo(() => createMapRendererResource(renderer, enabled), [renderer, enabled]);
  const snapshot = useSyncExternalStore(
    resource.subscribe,
    resource.getSnapshot,
    resource.getServerSnapshot,
  );
  const reportError = useEffectEvent((error: unknown) => onRendererError?.(error));

  useLayoutEffect(() => {
    if (enabled) resource.update(scene);
  }, [resource, scene, enabled]);
  useLayoutEffect(() => {
    if (!enabled || !canvasRef.current) return;
    const container = canvasRef.current;
    const stage = container.ownerDocument.createElement("div");
    container.replaceChildren(stage);
    const stop = resource.start(stage);
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => resource.resize());
    observer?.observe(container);

    return () => {
      observer?.disconnect();
      stop();
      stage.remove();
    };
  }, [resource, enabled]);
  useEffect(() => {
    if (snapshot.status === "unavailable") reportError(snapshot.error);
  }, [snapshot]);

  const currentStatus = !valid
    ? "unavailable"
    : status !== "ready"
      ? status
      : empty
        ? "empty"
        : snapshot.status;

  if (
    !label.trim() ||
    !description.trim() ||
    Object.values(labels).some((value) => !value.trim())
  ) {
    throw new Error("MapView requires a label, description and localized state labels.");
  }

  return {
    props,
    className,
    label,
    description,
    children,
    labels,
    renderer,
    canvasRef,
    currentStatus,
    descriptionId: `${id}-description`,
  };
}
