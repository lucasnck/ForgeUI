import type { MapCoordinate, MapRenderer, MapScene } from "./map";

const coordinate: MapCoordinate = { latitude: 0, longitude: 0 };
const scene: MapScene = {
  markers: [],
  routes: [],
  camera: { kind: "center", coordinate, zoom: 4 },
};
const renderer: MapRenderer = {
  id: "fixture",
  presentation: "schematic",
  mount: async () => ({ update() {}, resize() {}, destroy() {} }),
};
void scene;
void renderer;
// @ts-expect-error Provider-native array ordering is not a canonical coordinate.
const tuple: MapCoordinate = [0, 0];
void tuple;
// @ts-expect-error Coordinates remain immutable to consumers.
coordinate.latitude = 2;
// @ts-expect-error A route computation provider is not a visual renderer.
const routingProvider: MapRenderer = { id: "routing", getRoute() {} };
void routingProvider;
// @ts-expect-error Only supported camera modes are accepted.
const unknownCamera: MapScene = { ...scene, camera: { kind: "tracking" } };
void unknownCamera;
