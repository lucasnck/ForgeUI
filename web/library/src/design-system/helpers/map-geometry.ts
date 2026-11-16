import type { MapCoordinate, MapScene } from "../types/map";

export function isMapCoordinate(value: unknown): value is MapCoordinate {
  if (typeof value !== "object" || value === null) return false;
  const point = value as Record<string, unknown>;

  return (
    typeof point.latitude === "number" &&
    Number.isFinite(point.latitude) &&
    point.latitude >= -90 &&
    point.latitude <= 90 &&
    typeof point.longitude === "number" &&
    Number.isFinite(point.longitude) &&
    point.longitude >= -180 &&
    point.longitude <= 180
  );
}

export function decodeMapPolyline(encoded: string, precision: 5 = 5): readonly MapCoordinate[] {
  if (typeof encoded !== "string" || precision !== 5 || encoded.length > 1_000_000)
    throw new Error("Invalid map geometry.");
  const points: MapCoordinate[] = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  const read = () => {
    let value = 0;
    let factor = 1;

    for (let count = 0; count < 6; count += 1) {
      if (index >= encoded.length) throw new Error("Invalid map geometry.");
      const chunk = encoded.charCodeAt(index++) - 63;
      if (chunk < 0 || chunk > 63) throw new Error("Invalid map geometry.");
      value += (chunk & 31) * factor;
      if (chunk < 32) return value % 2 ? -(Math.floor(value / 2) + 1) : value / 2;
      factor *= 32;
    }

    throw new Error("Invalid map geometry.");
  };

  while (index < encoded.length) {
    latitude += read();
    longitude += read();
    const point = { latitude: latitude / 100_000, longitude: longitude / 100_000 };
    if (!isMapCoordinate(point) || points.length >= 100_000)
      throw new Error("Invalid map geometry.");
    points.push(point);
  }

  return points;
}

export function isMapScene(value: unknown): value is MapScene {
  if (typeof value !== "object" || value === null) return false;
  const scene = value as MapScene;
  if (
    !Array.isArray(scene.markers) ||
    !Array.isArray(scene.routes) ||
    scene.markers.length > 10_000 ||
    scene.routes.length > 1000
  )
    return false;
  const markerIds = new Set<string>();
  const routeIds = new Set<string>();
  const validId = (id: unknown): id is string => typeof id === "string" && id.trim().length > 0;

  for (const marker of scene.markers) {
    if (
      !marker ||
      !validId(marker.id) ||
      markerIds.has(marker.id) ||
      !validId(marker.label) ||
      !["origin", "destination", "vehicle", "waypoint"].includes(marker.kind) ||
      !isMapCoordinate(marker.coordinate)
    )
      return false;
    markerIds.add(marker.id);
  }

  let count = 0;

  for (const route of scene.routes) {
    if (
      !route ||
      !validId(route.id) ||
      routeIds.has(route.id) ||
      !["planned", "approach", "completed"].includes(route.kind) ||
      !Array.isArray(route.coordinates) ||
      route.coordinates.length < 2 ||
      route.coordinates.length > 100_000
    )
      return false;

    for (const coordinate of route.coordinates) {
      if (!isMapCoordinate(coordinate)) return false;
    }

    count += route.coordinates.length;
    if (count > 100_000) return false;
    routeIds.add(route.id);
  }

  const camera = scene.camera;
  if (!camera || typeof camera !== "object") return false;
  if (camera.kind === "fit") return true;
  if (camera.kind === "follow") return markerIds.has(camera.markerId);
  return (
    camera.kind === "center" &&
    isMapCoordinate(camera.coordinate) &&
    Number.isFinite(camera.zoom) &&
    camera.zoom >= 0 &&
    camera.zoom <= 24
  );
}
