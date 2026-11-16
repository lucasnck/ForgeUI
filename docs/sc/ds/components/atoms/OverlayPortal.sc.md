---
title: "OverlayPortal"
scope: "Client-mounted portal with deterministic empty server output"
type: "component"
ds-level: "atoms"
status: "DONE"
---

# OverlayPortal

## Files

```text
design-system/components/atoms/OverlayPortal/OverlayPortal.tsx (C)
design-system/components/atoms/OverlayPortal/useOverlayPortal.ts (C)
design-system/components/atoms/OverlayPortal/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/OverlayPortal/definition.ts (C)
features/showcase-v2/components/OverlayPortal/OverlayPortal.example.tsx (C)
features/showcase-v2/components/OverlayPortal/useOverlayPortalExample.ts (C)
features/showcase-v2/components/OverlayPortal/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Compound contracts](../../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { OverlayPortal } from "@forge-ui/web";
<OverlayPortal>{panel}</OverlayPortal>;
```

## Hooks

```ts
"use client";

import { useState, useSyncExternalStore } from "react";

function createPortalStore() {
  let container: HTMLElement | null = null;
  return {
    getSnapshot: () => container,
    getServerSnapshot: () => null,
    subscribe(notify: () => void) {
      container = document.body;
      notify();
      return () => {};
    },
  };
}

export function useOverlayPortal() {
  const [store] = useState(createPortalStore);
  const container = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  return { container };
}
```

## Content

```tsx
"use client";

import { createPortal } from "react-dom";
import type { ComponentChildrenProps } from "../../../types";
import { useOverlayPortal } from "./useOverlayPortal";

export interface OverlayPortalProps extends ComponentChildrenProps {}

export function OverlayPortal(props: OverlayPortalProps) {
  const { container } = useOverlayPortal();
  return container ? createPortal(props.children, container) : null;
}
```

## Tests

- V2 Mounted portal: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies empty real React server HTML without browser globals. Scoped lint passes. Real browser mounting renders exactly one branch directly under body; registered branch clicks preserve its overlay, and outside clicks close once while preserving native focus.

- Server output and the first hydrated snapshot are both null.
- A committed client mount obtains its body container without reading document during render.
- Unmount/replay creates no duplicate container or portal wrapper.

## Criteria

- [x] Browser globals are read only after client mount.
- [x] Portal rendering adds no listbox/menu/dialog semantics or duplicate layer owner.
- [x] A consumer registers its portaled branch through useOverlay when its interaction belongs to another layer.
- [x] The target public export is absent from available catalogs until source delivery.

- [x] V2 **Mounted portal**: A caller-owned Show/Close Button mounts passive named Surface content through OverlayPortal after hydration; verify visible dismissal, placement and cleanup without browser access during SSR.
- [x] The OverlayPortal V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useOverlayPortalExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
