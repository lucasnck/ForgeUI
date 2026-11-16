---
title: "Compound parts helper"
scope: "Validate direct compound regions by constructor identity"
status: "DONE"
type: "helper"
ds-level: "none"
---

# Compound parts helper

## Files

```text
design-system/helpers/compound.ts (C)
../scripts/fixtures/showcase-v2-contracts.ts (M)
../scripts/check-showcase-v2.cjs (M)
```

## Dependencies

- [Compound composition types](../types/tech-compound-composition.sc.md)

## Contract

```tsx
import { collectCompoundParts } from "@/design-system/helpers/compound";
const parts = collectCompoundParts(children, { header: Header, body: Body, footer: Footer });
```

## Content

```ts
import { Children, Fragment, isValidElement } from "react";
import type { ReactNode } from "react";
import type { CompoundConstructors, CompoundParts, CompoundRegion } from "../types/compound-composition";
export function collectCompoundParts(children: ReactNode, constructors: CompoundConstructors, required: readonly CompoundRegion[] = ["header", "body"]): CompoundParts {
  const parts: CompoundParts = {};
  const regions: readonly CompoundRegion[] = ["header", "body", "footer"];
  function visit(nodes: ReactNode): void {
    Children.forEach(nodes, child => {
      if (child === null || child === undefined || typeof child === "boolean")
        return;
      if (!isValidElement<{
        children?: ReactNode;
      }>(child))
        throw new Error("Invalid compound child");
      if (child.type === Fragment && child.key !== null) {
        visit(child.props.children);
        return;
      }
      const region = regions.find(name => child.type === constructors[name]);
      if (!region)
        throw new Error("Unknown compound region");
      if (parts[region])
        throw new Error("Duplicate compound region: " + region);
      parts[region] = child;
    });
  }
  visit(children);
  for (const region of required) {
    if (!parts[region])
      throw new Error("Missing compound region: " + region);
  }
  return parts;
}
```

## Tests

- V2 Compound guard contracts: verify valid/boundary input/output and minimal consumer code against the actual helper signature.

- Constructor identity resolves header, body and optional footer in any order.
- Keyed fragments preserve direct region discovery.
- Unknown elements, unkeyed fragments, duplicate regions and absent required regions are rejected.
- Region contents are not traversed as sibling regions.

## Criteria

- [x] Returned elements preserve keys and props.
- [x] Only direct children and keyed fragments are inspected.
- [x] Renderers invoke this private helper; view hooks do not import rendered parts.
- [x] The helper is not added to the public DS catalog.

- [x] V2 **Compound guard contracts** is covered through the public Card consumer examples and typed caller fixtures: Use the actual Card valid Header/Body/Footer and Body-only snippets plus negative typed/SSR fixtures for duplicate/unknown/required parts. Helpers are exercised by the owner; V2 never imports private context or bypasses collection guards.
- [x] V2 imports only the actual helper export or documented public helper subpath, keeps typed data valid and documents output ownership. No standalone helper route/kind, private dependency or duplicated implementation is introduced; this pending item is consumer acceptance, not loss of existing API availability.
