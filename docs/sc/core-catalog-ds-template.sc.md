---
title: "Component Catalog Entry Template"
scope: "Minimal consumption examples grouped by component level"
---

# Component Catalog Entry Template

Group [core-catalog-ds.sc.md](core-catalog-ds.sc.md) by Atoms, Molecules, Organisms, Templates, Pages and Application Components. Omit empty categories. Application Components includes component resources with ds-level: none, including infrastructure providers and project identity components; they do not become public DS exports or Showcase entries.

````markdown
## Atoms

### Button

[Specification](ds/components/atoms/Button.sc.md)

#### Contract

```tsx
import { Button } from "@/design-system";

<Button type="submit" loading={submitting}>{submitLabel}</Button>;
```
````

Each entry contains only the name, owning spec link and Contract code. Show necessary imports and one valid use with required props; no example component, local state or provider orchestration. Do not repeat status, Props declarations, files, behavior, styles, tests or criteria. Verify actual exports; a PENDING spec migration does not remove an implemented export. Pages use their feature/application imports and do not gain a DS export merely from their level.
