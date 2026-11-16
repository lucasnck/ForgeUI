---
title: "MapView"
scope: "Accessible map scene presentation through an injected renderer with common lifecycle and state semantics"
status: "PENDING"
type: "component"
ds-level: "organisms"
---

# MapView

## Files

```text
design-system/components/organisms/MapView/MapView.tsx (C)
design-system/components/organisms/MapView/MapView.module.css (C)
design-system/components/organisms/MapView/useMapView.ts (C)
design-system/components/organisms/MapView/map-renderer-resource.ts (C)
design-system/components/organisms/MapView/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/MapView.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/MapView/definition.ts (C)
features/showcase-v2/components/MapView/MapView.example.tsx (C)
features/showcase-v2/components/MapView/useMapViewExample.ts (C)
features/showcase-v2/components/MapView/fixtures.ts (C)
features/showcase-v2/components/MapView/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/index.ts (M)
../scripts/check-map-view.cjs (C)
../scripts/check-showcase-v2.cjs (M)
../.gitignore (M)
```

## Dependencies

- [Map contracts](../../types/tech-map-contracts.sc.md)
- [Map geometry](../../helpers/tech-map-geometry.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)

## Contract

```tsx
import { MapView } from "@forge-ui/web";

<MapView label={labels.map} description={routeDescription} scene={scene} renderer={renderer} status="ready" labels={labels.mapStates} />;
```

## Styles

```css
.root { position: relative; min-inline-size: var(--zero); overflow: hidden; }
.canvas { min-block-size: calc(var(--space-16) + var(--space-16) + var(--space-16) + var(--space-16) + var(--space-16)); inline-size: var(--size-full); visibility: hidden; }
.canvas[data-ready="true"] { visibility: visible; }
.canvas > div { min-block-size: inherit; }
.message { padding: var(--space-4); color: var(--color-text-default); }
```

## Content

```tsx
import type { MapRenderer, MapScene, MapViewStatus, NativeMapViewProps } from "../../../types/map";

export interface MapViewProps extends NativeMapViewProps {
  label: string;
  description: string;
  scene: MapScene;
  renderer: MapRenderer;
  status: MapViewStatus;
  labels: Readonly<{ loading: string; empty: string; unavailable: string; schematic: string }>;
  onRendererError?: (error: unknown) => void;
}
```

## Tests

- A fake renderer verifies mount/update/resize/destroy behavior without external SDKs or tile/network access.
- Switching renderers while mount is pending aborts the previous generation and destroys its late handle exactly once.
- Unmount, StrictMode effect replay and resize-observer cleanup leave no listeners or leaked instances.
- A vendor destroy exception cannot prevent fail-closed status or the owning effect from removing its stage.
- Loading/error/empty scene transitions hide previous canvas content immediately; later failures cannot overwrite a newer ready renderer.
- Scene update preserves native map interaction; fit does not continually reset a user-panned camera on unrelated rerenders.
- Render planned origin/destination, approach with moving vehicle and completed geometry through the same provider contract.

## Criteria

- [x] A colocated useMapView owns renderer lifecycle, async generation guard, errors, refs and ResizeObserver; the component calls it at the top of render.
- [x] MapView only presents caller-owned scene/status. It never fetches routes, subscribes to a hub, requests geolocation, handles credentials, chooses a ride or persists location data.
- [x] Runtime validation rejects non-finite/out-of-range points, duplicate/blank marker and route IDs, blank labels, route lengths outside 2..100000, missing followed markers and invalid zoom. Invalid scenes never reach a vendor SDK. Input arrays are not mutated.
- [x] Each mount receives an AbortSignal. Effect cleanup aborts first; any handle resolving after cleanup is destroyed rather than installed. Destroy is invoked once per accepted or late handle.
- [x] Scene and renderer generations mask previous rendered data immediately when renderer identity changes or status leaves ready; stale map DOM must not remain visible during errors/loading or a context switch.
- [ ] Ready updates call update on the current handle, preserving stable marker/route identity. Fit uses all rendered geometry; follow centers the requested marker only as its position changes. No smoothing invents intermediate telemetry or hides stale state.
- [x] Loading, empty and unavailable use localized visible messages. Renderer rejection becomes unavailable and calls onRendererError once for that generation without a retry loop.
- [x] A labelled section and always-visible text description expose origin/destination, route purpose and caller-supplied distance/time information independently of the map. Vendor canvas content is not the sole accessible representation.
- [x] Marker labels render as text; no untrusted HTML is injected. Caller children may compose separate accessible controls outside the canvas.
- [x] A schematic renderer is explicitly labelled with labels.schematic. It is not represented as a road map or as proof of navigability, ETA, dispatch or route correctness.
- [ ] A cartographic adapter retains required attribution, zoom/keyboard controls and interaction semantics. It does not steal focus on mount/update or trap keyboard navigation.
- [x] Renderer SDK initialization occurs only in client effects; SSR/static export evaluates without window, document, vendor globals or network calls.
- [x] No SDK/dependency/paid provider is silently selected. Concrete cartographic adapters require an explicit installed SDK/configuration contract outside the DS; the injected port is implementable independently.
- [ ] A targeted browser check covers resize, marker/route visibility, renderer replacement, focus and readable fallback. Fake-renderer unit/SSR tests do not certify cartographic visual behavior.
- [x] Shared Prettier configuration formats only touched supported files; scoped ESLint, read-only checks, typecheck and targeted lifecycle tests pass independently of the browser check.
- [x] V1 and V2 expose named preview, approach and completed scenarios using public MapView with Stack/Inline/Button/Text. The injected SVG fixture is explicitly schematic, avoids all network/GPS calls, uses stable indexed marker labels, and never claims a cartographic provider.
- [ ] Preview toggles unavailable/reset; approach advances a deterministic vehicle/follow scene; completed displays immutable finished geometry. Reset restores fixtures and error feedback. Property editors bind label, description, title and status; typed scene/renderer/labels remain read-only.
- [ ] Minimal copyable snippets use the public DS import and direct MapView consumption with caller-owned scene/renderer/labels. Browser review verifies copied code fidelity, actions, fallback readability and no focus theft; source/SSR cannot check this box.
