"use client";

import type { MapRenderer, MapScene, MapViewStatus, NativeMapViewProps } from "../../../types/map";
import { useMapView } from "./useMapView";
import styles from "./MapView.module.css";

export interface MapViewProps extends NativeMapViewProps {
  label: string;
  description: string;
  scene: MapScene;
  renderer: MapRenderer;
  status: MapViewStatus;
  labels: Readonly<{ loading: string; empty: string; unavailable: string; schematic: string }>;
  onRendererError?: (error: unknown) => void;
}

export function MapView(input: MapViewProps) {
  const {
    props,
    className,
    label,
    description,
    children,
    labels,
    renderer,
    canvasRef,
    currentStatus,
    descriptionId,
  } = useMapView(input);

  return (
    <section
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-label={label}
      aria-describedby={[props["aria-describedby"], descriptionId].filter(Boolean).join(" ")}
      aria-busy={currentStatus === "loading"}
    >
      <p id={descriptionId} className={styles.message}>
        {description}
      </p>
      {renderer.presentation === "schematic" && (
        <p className={styles.message}>{labels.schematic}</p>
      )}
      <div
        ref={canvasRef}
        className={styles.canvas}
        data-ready={currentStatus === "ready"}
        aria-hidden={currentStatus !== "ready"}
        inert={currentStatus !== "ready"}
      />
      {currentStatus !== "ready" && (
        <p className={styles.message} role="status">
          {labels[currentStatus]}
        </p>
      )}
      {children}
    </section>
  );
}
