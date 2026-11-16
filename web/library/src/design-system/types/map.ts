import type { ComponentPropsWithRef } from "react";

export interface NativeMapViewProps extends ComponentPropsWithRef<"section"> {}

export interface MapCoordinate {
  readonly latitude: number;
  readonly longitude: number;
}
export interface MapMarker {
  readonly id: string;
  readonly coordinate: MapCoordinate;
  readonly label: string;
  readonly kind: "origin" | "destination" | "vehicle" | "waypoint";
}
export interface MapRoute {
  readonly id: string;
  readonly coordinates: readonly MapCoordinate[];
  readonly kind: "planned" | "approach" | "completed";
}
export type MapCamera =
  | { readonly kind: "fit" }
  | { readonly kind: "follow"; readonly markerId: string }
  | { readonly kind: "center"; readonly coordinate: MapCoordinate; readonly zoom: number };
export interface MapScene {
  readonly markers: readonly MapMarker[];
  readonly routes: readonly MapRoute[];
  readonly camera: MapCamera;
}
export interface MapRendererHandle {
  update(scene: MapScene): void;
  resize(): void;
  destroy(): void;
}
export interface MapRenderer {
  readonly id: string;
  readonly presentation: "cartographic" | "schematic";
  mount(container: HTMLElement, scene: MapScene, signal: AbortSignal): Promise<MapRendererHandle>;
}
export type MapViewStatus = "loading" | "ready" | "empty" | "unavailable";
