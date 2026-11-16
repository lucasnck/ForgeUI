---
title: "Technical Catalog Entry Template"
scope: "Minimal consumption examples for available non-component resources"
---

# Technical Catalog Entry Template

Group [core-catalog.sc.md](core-catalog.sc.md) by Hooks, Helpers, Styles and Types. Each entry contains its name, a link to its owning spec and Contract with minimal consumption code. Global catalog documents have no resource status.

````markdown
## Hooks

### usePresence

[Specification](ds/hooks/tech-presence.sc.md)

#### Contract

```tsx
import { usePresence } from "@/design-system";

const { present, phase, onTransitionEnd } = usePresence({
  open,
  elementRef,
  enabled: animated,
});
```
````

Styles may show a CSS composition or a minimal import and element. Types show import type and one type usage. Do not repeat implementation, status, file lists, tests or criteria. Do not register proposed effects or target exports as available before source delivery. Preserve existing available exports when their rewritten spec is PENDING. Providers belong to the component catalog; their reusable hooks and helpers belong here.
