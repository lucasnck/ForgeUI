import type { MapCoordinate, MapRenderer, MapScene } from "@forge-ui/web";

export const mapLabels = {
  loading: "Loading",
  empty: "Empty",
  unavailable: "Unavailable",
  schematic: "Schematic fixture — no street map, route service or live instructor connection.",
};
const origin = { latitude: -23.55, longitude: -46.63 };
const destination = { latitude: -23.54, longitude: -46.61 };
const points = [origin, { latitude: -23.545, longitude: -46.625 }, destination];

export function createMapScene(kind: "preview" | "approach" | "completed", step = 0): MapScene {
  return {
    markers: [
      { id: "origin", coordinate: origin, label: "Label 1", kind: "origin" },
      { id: "destination", coordinate: destination, label: "Label 2", kind: "destination" },
      ...(kind === "approach"
        ? [
            {
              id: "vehicle",
              coordinate: points[step % points.length],
              label: "Label 3",
              kind: "vehicle" as const,
            },
          ]
        : []),
    ],
    routes: [{ id: "route", kind: kind === "preview" ? "planned" : kind, coordinates: points }],
    camera: kind === "approach" ? { kind: "follow", markerId: "vehicle" } : { kind: "fit" },
  };
}

export const schematicMapRenderer: MapRenderer = {
  id: "showcase-schematic",
  presentation: "schematic",
  mount(container, scene, signal) {
    const namespace = "http://www.w3.org/2000/svg";
    const svg = container.ownerDocument.createElementNS(namespace, "svg");
    svg.setAttribute("viewBox", "0 0 400 240");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "240");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Schematic fixture");
    container.append(svg);
    let destroyed = false;

    const draw = (next: MapScene) => {
      if (destroyed || signal.aborted) return;
      svg.replaceChildren();
      const coordinates = [
        ...next.markers.map((marker) => marker.coordinate),
        ...next.routes.flatMap((route) => [...route.coordinates]),
      ];
      if (!coordinates.length) return;
      const longitudes = coordinates.map((point) => point.longitude);
      const latitudes = coordinates.map((point) => point.latitude);
      const minLon = Math.min(...longitudes);
      const maxLon = Math.max(...longitudes);
      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const camera = next.camera;
      const center =
        camera.kind === "follow"
          ? next.markers.find((marker) => marker.id === camera.markerId)?.coordinate
          : camera.kind === "center"
            ? camera.coordinate
            : null;
      const project = (coordinate: MapCoordinate) => ({
        x:
          200 +
          ((coordinate.longitude - (center?.longitude ?? (minLon + maxLon) / 2)) /
            Math.max(maxLon - minLon, 0.001)) *
            300,
        y:
          120 -
          ((coordinate.latitude - (center?.latitude ?? (minLat + maxLat) / 2)) /
            Math.max(maxLat - minLat, 0.001)) *
            140,
      });

      for (const route of next.routes) {
        const line = container.ownerDocument.createElementNS(namespace, "polyline");
        line.setAttribute(
          "points",
          route.coordinates
            .map((coordinate) => {
              const point = project(coordinate);

              return `${point.x},${point.y}`;
            })
            .join(" "),
        );
        line.setAttribute("fill", "none");
        line.setAttribute("stroke", "currentColor");
        line.setAttribute("stroke-width", "3");
        line.setAttribute("stroke-dasharray", route.kind === "approach" ? "5 5" : "none");
        svg.append(line);
      }

      for (const marker of next.markers) {
        const point = project(marker.coordinate);
        const circle = container.ownerDocument.createElementNS(namespace, "circle");
        circle.setAttribute("cx", String(point.x));
        circle.setAttribute("cy", String(point.y));
        circle.setAttribute("r", marker.kind === "vehicle" ? "8" : "5");
        circle.setAttribute("fill", "currentColor");
        const text = container.ownerDocument.createElementNS(namespace, "text");
        text.setAttribute("x", String(point.x));
        text.setAttribute("y", String(point.y - (marker.kind === "vehicle" ? 30 : 14)));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "currentColor");
        text.textContent = marker.label;
        svg.append(circle, text);
      }
    };

    draw(scene);
    return Promise.resolve({
      update: draw,
      resize() {},
      destroy() {
        if (!destroyed) {
          destroyed = true;
          svg.remove();
        }
      },
    });
  },
};
