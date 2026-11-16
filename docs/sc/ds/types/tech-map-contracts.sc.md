---
title: "Map contracts"
scope: "Provider-neutral geographic scenes and injected renderer lifecycle"
status: "DONE"
type: "type"
ds-level: "none"
---

# Map contracts

## Files

```text
design-system/types/map.ts (C)
design-system/types/map.contracts.test.ts (C)
design-system/types/index.ts (M)
design-system/index.ts (M)
```

## Contract

```ts
import type { MapScene, MapRenderer, MapCoordinate } from "@forge-ui/web";

const pickup: MapCoordinate = { latitude: -23.55, longitude: -46.63 };
const scene: MapScene = { markers: [{ id: "pickup", coordinate: pickup, label: "Pickup", kind: "origin" }], routes: [], camera: { kind: "fit" } };
```

## Content

```ts
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
```

## Tests

- Accept route previews, instructor approach and completed route scenes with the same contract; reject provider SDK objects and encoded strings passed as coordinates.
- Reject unknown marker/route/camera kinds, mutable writes to scenes and missing renderer lifecycle methods at typecheck time.

## Criteria

- [x] Coordinates are explicitly latitude/longitude in WGS84 decimal degrees; no ambiguous array order enters the public DS API.
- [x] Render providers and route-computation providers are independent. No Google, OSRM, HTTP, SignalR, ride, session or partner type enters DS contracts.
- [x] Renderer identity changes require disposal and remount. The caller supplies a stable renderer instance and validated scene values.
- [x] Follow identifies a marker; it does not imply route computation, instructor assignment or a new location request.
- [x] The same scene, fit/follow semantics and accessible labels apply to every renderer; vendor controls and attribution remain vendor-owned.
- [x] Prettier and ESLint run only on touched supported files using the shared configuration; read-only checks and applicable typechecks pass.
