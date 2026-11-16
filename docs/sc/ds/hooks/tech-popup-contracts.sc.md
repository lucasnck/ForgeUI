---
title: "Popup Listbox Contracts"
scope: "Shared text-input popup disclosure, active option, keyboard acceptance and ARIA attributes"
status: "DONE"
type: "hook"
ds-level: "none"
---

# Popup Listbox Contracts


## Files

```text
../scripts/check-hooks.cjs (C)
../scripts/hook-harness.cjs (C)
design-system/foundations/usePopupListbox.ts (D)
design-system/hooks/popup/usePopupListbox.ts (C)
design-system/hooks/popup/index.ts (C)
design-system/index.ts (M)
design-system/components/molecules/EmailInput/EmailInput.tsx (M)
../scripts/check-popup.cjs (M)
features/showcase-v2/components/HookResources/usePopupListbox/definition.ts (C)
features/showcase-v2/components/HookResources/usePopupListbox/usePopupListbox.example.tsx (C)
features/showcase-v2/components/HookResources/usePopupListbox/usePopupListboxResourceExample.ts (C)
features/showcase-v2/components/HookResources/usePopupListbox/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Popup contracts](../types/tech-popup-types.sc.md)

## Contract

```ts
import { usePopupListbox } from "@forge-ui/web";
const popup = usePopupListbox({ id, count: options.length, queryKey, onAcceptOption });
```

## Content

```ts
"use client";

import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  PopupListboxContract,
  PopupListboxOptions,
} from "../../types/popup";
export type { PopupListboxContract } from "../../types/popup";

export function usePopupListbox({
  id,
  count,
  queryKey,
  onAcceptOption,
}: PopupListboxOptions): PopupListboxContract {
  const generatedId = useId();
  const baseId = id ?? `popup-${generatedId}`;
  const listboxId = `${baseId}-listbox`;
  const [focused, setFocused] = useState(false);
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);
  const [rawActiveIndex, setRawActiveIndex] = useState(-1);
  const [previousQueryKey, setPreviousQueryKey] = useState(queryKey);

  // A new option set must never inherit selection or dismissal from its query.
  // Adjust during render so consumers cannot commit a stale active descendant.
  if (previousQueryKey !== queryKey) {
    setPreviousQueryKey(queryKey);
    setDismissedKey(null);
    setRawActiveIndex(-1);
  }

  const isOpen =
    focused && queryKey !== null && count > 0 && queryKey !== dismissedKey;
  const activeIndex =
    isOpen && rawActiveIndex >= 0 ? Math.min(rawActiveIndex, count - 1) : -1;

  function optionId(index: number) {
    return `${listboxId}-option-${index}`;
  }

  function acceptOption(index: number) {
    if (!Number.isInteger(index) || index < 0 || index >= count) return;
    setDismissedKey(null);
    setRawActiveIndex(-1);
    onAcceptOption(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      count <= 0 ||
      queryKey === null
    ) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setDismissedKey(null);
      setRawActiveIndex(isOpen ? (activeIndex + 1) % count : 0);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setDismissedKey(null);
      setRawActiveIndex(
        isOpen && activeIndex > 0 ? activeIndex - 1 : count - 1,
      );
      return;
    }
    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      acceptOption(activeIndex);
      return;
    }
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setDismissedKey(queryKey);
      setRawActiveIndex(-1);
    }
  }

  return {
    isOpen,
    activeIndex,
    listboxId,
    optionId,
    comboboxAttributes: {
      role: "combobox",
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? listboxId : undefined,
      "aria-activedescendant":
        activeIndex >= 0 ? optionId(activeIndex) : undefined,
    },
    listboxAttributes: { id: listboxId, role: "listbox" },
    optionAttributes: (index) => ({
      id: optionId(index),
      role: "option",
      "aria-selected": index === activeIndex,
      "data-active": index === activeIndex || undefined,
    }),
    onFocus: () => {
      setFocused(true);
    },
    onBlur: () => {
      setFocused(false);
      setDismissedKey(null);
      setRawActiveIndex(-1);
    },
    onKeyDown,
    acceptOption,
  };
}
```

## Tests

- V2 Active descendant and acceptance: verify its observable state, actual public contract, reset and complete copied code.

- Server and client derive stable unique ARIA identifiers.
- Query changes reset dismissal and active option, including empty and shorter lists.
- Escape closes without accepting; Enter accepts the current active option once.
- Invalid option indices, prevented events and composing input do not invoke acceptance.
- Native blur closes the popup and clears dismissal and active option.

## Criteria

- [x] Focus, non-null queryKey, positive count and absence of matching dismissal determine open state.
- [x] Changing queryKey clears dismissal and active option; null query or count=0 closes.
- [x] Each instance uses stable unique useId-derived listbox and option identifiers.
- [x] No active option is exposed until arrow navigation; active indices clamp to the current count.
- [x] ArrowDown opens at the first option and wraps forward; ArrowUp opens at the last option and wraps backward.
- [x] Enter accepts the active option once; Enter without an active option preserves native form submission.
- [x] Escape dismisses the current query without changing input focus or value.
- [x] Composing and defaultPrevented keyboard events are not intercepted.
- [x] Non-integer and out-of-range pointer acceptance indices are ignored.
- [x] Acceptance invokes the latest callback and resets active option and dismissal.
- [x] Blur closes and clears the active option; the consumer forwards its native event.
- [x] Combobox, listbox and option attributes match the canonical type contracts.
- [x] aria-activedescendant is absent when no option is active; the consumer owns aria-autocomplete and the localized listbox name.
- [x] The hook has no provider prerequisite and does not access window or document during render.
- [x] Filtering, value resolution, option content and outside-pointer behavior remain with their specified consumers.
- [x] The shared hook introduces no copied input value or independent timer.

- [x] V2 **Active descendant and acceptance**: Bind returned trigger/listbox/item attributes to a connected input and five indexed fixture records, including one disabled record excluded by the consumer before deriving eligible options/count (the hook has no disabled-index API). Navigate/accept by keyboard and pointer, filter to empty, show active id/query acceptance and restore focus without private contexts.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
