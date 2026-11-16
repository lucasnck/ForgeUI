---
title: "Disclosure and accordion hooks"
scope: "Own single disclosure state and reusable group exclusivity without rendering components. useAccordion is a semantic adapter of useDisclosureGroup, not a second state engine."
status: "DONE"
type: "hook"
ds-level: "none"
---

# Disclosure and accordion hooks

## Files

```text
features/showcase-v2/components/HookResources/disclosure.shared.tsx (C)
features/showcase-v2/components/HookResources/useDisclosureFixture.ts (C)
design-system/hooks/collapse/useCollapse.ts (C)
design-system/hooks/collapse/index.ts (C)
design-system/hooks/disclosure-group/useDisclosureGroup.ts (C)
design-system/hooks/disclosure-group/useAccordion.ts (C)
design-system/hooks/disclosure-group/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/HookResources/useCollapse/definition.ts (C)
features/showcase-v2/components/HookResources/useCollapse/useCollapse.example.tsx (C)
features/showcase-v2/components/HookResources/useCollapse/useCollapseResourceExample.ts (C)
features/showcase-v2/components/HookResources/useCollapse/usage-code.ts (C)
features/showcase-v2/components/HookResources/useDisclosureGroup/definition.ts (C)
features/showcase-v2/components/HookResources/useDisclosureGroup/useDisclosureGroup.example.tsx (C)
features/showcase-v2/components/HookResources/useDisclosureGroup/useDisclosureGroupResourceExample.ts (C)
features/showcase-v2/components/HookResources/useDisclosureGroup/usage-code.ts (C)
features/showcase-v2/components/HookResources/useAccordion/definition.ts (C)
features/showcase-v2/components/HookResources/useAccordion/useAccordion.example.tsx (C)
features/showcase-v2/components/HookResources/useAccordion/useAccordionResourceExample.ts (C)
features/showcase-v2/components/HookResources/useAccordion/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Disclosure contracts](../types/tech-disclosure-contracts.sc.md)

## Contract

```ts
import { useCollapse, useAccordion } from "@forge-ui/web";
const collapse = useCollapse({ open, onOpenChange });
const accordion = useAccordion({ multiple: false, defaultValue: ["details"], onValueChange });
```

## Content

```ts
"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import type { CollapseContract, CollapseOptions } from "../../types/disclosure";

export function useCollapse({
  open: suppliedOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  id,
}: CollapseOptions = {}): CollapseContract {
  const generatedId = useId();
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = suppliedOpen ?? localOpen;
  const latest = useRef(open);
  const previousOpen = useRef(open);
  const focusedWithin = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const triggerId = id ?? `collapse-${generatedId}`;
  const bodyId = `${triggerId}-body`;

  function repairFocus(): void {
    const body = bodyRef.current;
    if (focusedWithin.current || body?.contains(body.ownerDocument.activeElement)) {
      triggerRef.current?.focus();
      focusedWithin.current = false;
    }
  }

  function requestOpen(next: boolean): void {
    if (disabled || next === latest.current) return;
    if (suppliedOpen === undefined) {
      if (!next) repairFocus();
      latest.current = next;
      setLocalOpen(next);
    }
    onOpenChange?.(next);
  }

  useLayoutEffect(() => {
    if (previousOpen.current && !open) repairFocus();
    previousOpen.current = open;
    latest.current = open;
  }, [open]);

  return {
    disabled,
    open,
    triggerRef,
    bodyRef,
    triggerProps: {
      id: triggerId,
      disabled,
      "aria-expanded": open,
      "aria-controls": bodyId,
    },
    bodyProps: {
      id: bodyId,
      hidden: !open,
      "aria-labelledby": triggerId,
      onFocusCapture: () => { focusedWithin.current = true; },
      onBlurCapture: (event) => {
        if (open) {
          focusedWithin.current = !!bodyRef.current?.contains(event.relatedTarget);
        }
      },
    },
    requestOpen,
    toggle: () => requestOpen(!latest.current),
  };
}
```

```ts
"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type {
  DisclosureGroupContract,
  DisclosureGroupOptions,
} from "../../types/disclosure";

export function useDisclosureGroup(
  options: DisclosureGroupOptions = {},
): DisclosureGroupContract {
  const [localValue, setLocalValue] = useState<readonly string[]>(
    options.defaultValue ?? [],
  );
  const registry = useRef(new Map<string, { disabled: boolean }>());
  const supplied = [...new Set(options.value ?? localValue)];
  const value = options.multiple ? supplied : supplied.slice(0, 1);
  const latest = useRef(value);

  useLayoutEffect(() => {
    latest.current = value;
  }, [value]);

  const registerItem = useCallback((key: string, disabled = false) => {
    if (!key.trim() || registry.current.has(key)) {
      throw new Error("Disclosure item keys must be nonempty and unique: " + key);
    }
    const entry = { disabled };
    registry.current.set(key, entry);
    return () => {
      if (registry.current.get(key) === entry) registry.current.delete(key);
    };
  }, []);

  function setExpanded(key: string, nextOpen: boolean): void {
    const entry = registry.current.get(key);
    if (options.disabled || !entry || entry.disabled) return;
    const current = latest.current;
    if (
      current.includes(key) === nextOpen ||
      (!nextOpen && options.collapsible === false)
    ) return;
    const next = nextOpen
      ? options.multiple ? [...current, key] : [key]
      : current.filter((item) => item !== key);
    if (options.value === undefined) {
      latest.current = next;
      setLocalValue(next);
    }
    options.onValueChange?.(next);
  }

  return {
    disabled: options.disabled ?? false,
    value,
    registerItem,
    isExpanded: (key) => value.includes(key),
    setExpanded,
    toggle: (key) => setExpanded(key, !latest.current.includes(key)),
  };
}
```

```ts
"use client";

import type { AccordionContract, AccordionOptions } from "../../types/disclosure";
import { useDisclosureGroup } from "./useDisclosureGroup";

export function useAccordion(options: AccordionOptions = {}): AccordionContract {
  return useDisclosureGroup(options);
}
```

## Tests

- V2 Controlled and local disclosure: verify its observable state, actual public contract, reset and complete copied code.
- V2 Exclusive and multiple keys: verify its observable state, actual public contract, reset and complete copied code.
- V2 Semantic accordion adapter: verify its observable state, actual public contract, reset and complete copied code.

- A disabled request does nothing while an authoritative controlled update still renders its supplied state.
- Closing with focus in Body/Footer repairs the owning trigger immediately.
- Single mode opens B by replacing A; multiple mode preserves other unique keys.
- collapsible=false rejects removing the open key but permits replacing it.
- Unknown controlled keys remain caller state and registration emits no corrective callback.
- Duplicate scoped registrations fail and each disposer removes only its own entry.
- useAccordion delegates directly without allocating another state store.

## Criteria

- [x] Given single mode with A open, opening B yields exactly [B] through one callback.
- [x] Given multiple mode, opening B preserves A and never duplicates a selected key.
- [x] Given controlled value rejected by its owner, rendered open panels remain unchanged.
- [x] Given collapsed Body/Footer descendants, focus returns to the owning Header and hidden descendants leave keyboard navigation.
- [x] Given useAccordion and another consumer of useDisclosureGroup, both use the same exclusivity mechanism.
- [x] Given SSR, nested groups and Strict Mode remount, ids and registry cleanup remain isolated and no browser global is accessed early.
- [x] The useCollapse open / defaultOpen / disabled contract uses undefined / false / false.
- [x] The useDisclosureGroup value / defaultValue contract uses undefined / [].
- [x] The multiple / collapsible / disabled contract uses false / true / false.
- [x] The Item registration contract uses Stable keyed identity; disposer on unmount; duplicate active keys rejected.
- [x] The SSR contract uses Initial supplied ids determine expanded state even before registration effects.
- [x] Closing with focus in the hidden body restores trigger focus; footer descendants are inside that boundary.
- [x] With collapsible=false, requesting removal of the open key does nothing; replacing it remains possible.
- [x] Selection is unique and single mode renders at most the first supplied key.
- [x] Unknown controlled/default keys are retained as caller state but do not render panels; registration never emits corrective callbacks.
- [x] An unmounted registry item cleans up without silently rewriting controlled state.
- [x] Registration callbacks are stable; item changes are keyed, do not rely on displayName and do not run at module scope.
- [x] Prop changes do not mirror into local state with effects.
- [x] Open B in single mode → [A] → [B] if accepted → A closes, B opens; callback once.
- [x] Open B in multiple mode → [A] → [A,B] if accepted → Both stay open; callback once.
- [x] Close A, collapsible=true → [A] → [] if accepted → Callback once.
- [x] Close A, collapsible=false → [A] → [A] → No callback.
- [x] Disabled/unknown request → Any → Unchanged → No callback.
- [x] Controlled prop update → Old prop → New prop → No callback.
- [x] Unmount item → Registered → Disposed → No business/state correction.
- [x] Components own semantic markup and token-backed motion; hooks add no styles.

- [x] V2 **Controlled and local disclosure**: Bind trigger/body ids and returned handlers to a real Button and panel. Compare defaultOpen with controlled acceptance/rejection, disabled requests and focus repair; show accepted open and onOpenChange.
- [x] V2 **Exclusive and multiple keys**: Register three stable indexed disclosures through the public contract; switch actual supported exclusivity/multiple behavior, skip disabled items and show accepted value changes without a second state engine.
- [x] V2 **Semantic accordion adapter**: Compose indexed public Accordion-like heading/trigger/body markup using the real adapter and shared group options; demonstrate exclusivity and native Button keyboard activation while documenting delegation to useDisclosureGroup and caller-owned focus traversal.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
