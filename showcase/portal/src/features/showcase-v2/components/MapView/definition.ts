"use client";

import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import {
  MapViewApproachExample,
  MapViewCompletedExample,
  MapViewPreviewExample,
} from "./MapView.example";
import { approachCode, completedCode, previewCode } from "./usage-code";

const definition = {
  name: "MapView",
  slug: "map-view",
  level: "organisms",
  specification: "docs/sc/ds/components/organisms/MapView.sc.md",
  description:
    "Injected provider-neutral map rendering. These examples use a schematic SVG fixture, not a cartographic provider or live ride connection.",
  properties: [
    {
      name: "label",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Accessible map region label.",
      source: "MapViewProps",
    },
    {
      name: "description",
      type: "string",
      required: true,
      defaultValue: null,
      description: "Visible independent textual route description.",
      source: "MapViewProps",
    },
    {
      name: "scene",
      type: "MapScene",
      required: true,
      defaultValue: null,
      description:
        "Caller-owned typed WGS84 geometry and fit/follow/center camera. Fixture coordinates remain valid; they are not free text.",
      source: "MapViewProps",
    },
    {
      name: "renderer",
      type: "MapRenderer",
      required: true,
      defaultValue: null,
      description:
        "Stable injected renderer. This fixture renders a labelled schematic with no tiles or service calls.",
      source: "MapViewProps",
    },
    {
      name: "status",
      type: "MapViewStatus",
      required: true,
      defaultValue: null,
      description: "Caller-owned loading, ready, empty or unavailable state.",
      source: "MapViewProps",
    },
    {
      name: "labels",
      type: "Readonly<{ loading; empty; unavailable; schematic }>",
      required: true,
      defaultValue: null,
      description: "Localized fallback and schematic attribution text.",
      source: "MapViewProps",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      defaultValue: null,
      description: "Optional caller controls outside vendor canvas.",
      source: "NativeMapViewProps",
    },
    {
      name: "title",
      type: "string",
      required: false,
      defaultValue: null,
      description: "Native section title.",
      source: "NativeMapViewProps",
    },
  ],
  methods: [],
  events: [
    {
      name: "onRendererError",
      signature: "(error: unknown) => void",
      description:
        "Reports one renderer failure per lifecycle generation; status controls simulate caller unavailability independently.",
    },
  ],
  features: [
    {
      id: "source",
      name: "Canonical implementation",
      description: "src/design-system/components/organisms/MapView/MapView.tsx",
    },
    {
      id: "boundary",
      name: "Provider boundary",
      description:
        "No HTTP, geolocation, account data or SignalR in DS. Public renderer lifecycle owns mount/update/resize/destroy.",
    },
    {
      id: "geometry",
      name: "Geometry helpers",
      description:
        "decodeMapPolyline validates bounded precision-five geometry; isMapCoordinate/isMapScene validate canonical data before reaching a renderer.",
    },
  ],
  examples: [
    {
      id: "preview",
      title: "Origin and destination preview",
      description:
        "Planned schematic route; toggle unavailable and reset restore caller-owned state.",
      code: previewCode,
      Component: MapViewPreviewExample,
    },
    {
      id: "approach",
      title: "Instructor approach simulation",
      description:
        "Simulate next position moves an indexed vehicle marker and follows it. This is deterministic fixture data, not actual instructor tracking.",
      code: approachCode,
      Component: MapViewApproachExample,
    },
    {
      id: "completed",
      title: "Completed lesson geometry",
      description:
        "Static completed-route geometry and endpoints. No timestamped replay or invented route history.",
      code: completedCode,
      Component: MapViewCompletedExample,
    },
  ],
} satisfies ShowcaseV2Definition;

export default definition;
