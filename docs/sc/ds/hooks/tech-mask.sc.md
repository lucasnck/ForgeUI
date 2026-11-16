---
title: "useMaskedInput"
scope: "Controlled masked input events, composition and caret coordination"
status: "DONE"
type: "hook"
ds-level: "none"
---

# useMaskedInput




## Files

```text
../scripts/check-hooks.cjs (C)
../scripts/hook-harness.cjs (C)
design-system/hooks/mask/useMaskedInput.ts (C)
design-system/hooks/mask/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/HookResources/useMaskedInput/definition.ts (C)
features/showcase-v2/components/HookResources/useMaskedInput/useMaskedInput.example.tsx (C)
features/showcase-v2/components/HookResources/useMaskedInput/useMaskedInputResourceExample.ts (C)
features/showcase-v2/components/HookResources/useMaskedInput/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-resources.ts (M)
features/showcase-v2/model/showcase-v2-resource-loaders.ts (M)
```

## Dependencies

- [Mask helpers](../helpers/tech-mask-helpers.sc.md)
- [Mask contracts](../types/tech-mask-contracts.sc.md)

## Contract

```tsx
import { useMaskedInput, MASK_TOKEN_6 } from "@forge-ui/web";
const { inputRef, displayValue, onChange, onKeyDown } = useMaskedInput({ mask: MASK_TOKEN_6, value, onValueChange });
```

## Content

```ts
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { MaskedInputContract, MaskedInputOptions } from "../../types/mask";
import {
  applyMask,
  caretForIndex,
  isMaskComplete,
  unmask,
} from "../../helpers/mask";

export function useMaskedInput({
  mask,
  value,
  onValueChange,
}: MaskedInputOptions): MaskedInputContract {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<{ value: string; index: number } | null>(null);
  const [composition, setComposition] = useState<{
    sourceValue: string;
    mask: string;
    display: string;
  } | null>(null);
  const formattedValue = applyMask(value, mask);
  const composing = composition?.sourceValue === value && composition.mask === mask;
  const displayValue = composing ? composition.display : formattedValue;

  function rawIndex(display: string, caret: number): number {
    const length = unmask(display, mask).length;
    let index = 0;
    for (let position = 1; position <= length; position++) {
      if (caretForIndex(display, mask, position) > caret) break;
      index = position;
    }
    return index;
  }

  function commit(next: string, index: number): void {
    pendingCaret.current = { value: next, index };
    onValueChange(next);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const input = event.currentTarget;
    if ((event.nativeEvent as InputEvent).isComposing) {
      // Keep the native composition visible without committing a new raw value.
      setComposition({ sourceValue: value, mask, display: input.value });
      return;
    }
    setComposition(null);
    commit(
      unmask(input.value, mask),
      rawIndex(input.value, input.selectionStart ?? input.value.length),
    );
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing || composing ||
      event.ctrlKey || event.metaKey || event.altKey ||
      (event.key !== "Backspace" && event.key !== "Delete")
    ) return;
    const input = event.currentTarget;
    const raw = unmask(formattedValue, mask);
    const start = rawIndex(formattedValue, input.selectionStart ?? 0);
    const end = rawIndex(formattedValue, input.selectionEnd ?? 0);
    const from = start === end && event.key === "Backspace"
      ? Math.max(0, start - 1) : start;
    const to = start === end && event.key === "Delete"
      ? Math.min(raw.length, end + 1) : end;
    event.preventDefault();
    if (from !== to) commit(raw.slice(0, from) + raw.slice(to), from);
  }

  useLayoutEffect(() => {
    const input = inputRef.current;
    const pending = pendingCaret.current;
    if (!input || !pending) return;
    if (value === pending.value) {
      const position = caretForIndex(displayValue, mask, pending.index);
      input.setSelectionRange(position, position);
    }
    pendingCaret.current = null;
  });

  return {
    inputRef,
    displayValue,
    complete: isMaskComplete(value, mask),
    inputMode: /[AS]/.test(mask) ? "text" : "numeric",
    maxLength: mask.length,
    onChange,
    onKeyDown,
  };
}
```

## Tests

- V2 Display and canonical mask value: verify its observable state, actual public contract, reset and complete copied code.

- Formatted paste and insertion at a selected range normalize the committed raw value.
- Backspace and Delete cross literals without removing unrelated characters.
- IME input remains untouched until its final non-composing input event.
- A controlled owner rejecting a change does not receive a stale caret offset.
- Caret restoration runs after the committed value renders.

## Criteria

- [x] The controlled raw value remains authoritative and callbacks run immediately.
- [x] Input events normalize pasted and typed values using the shared helpers.
- [x] Composition is not intercepted.
- [x] Selection replacement and deletion preserve raw character order.
- [x] Numeric masks request numeric input; letter masks request text input.
- [x] Render does not access browser APIs.
- [x] No calendar, business validation, blur trimming or domain mask is introduced.

- [x] V2 **Display and canonical mask value**: Bind returned inputRef/displayValue/change/key handlers to a connected native input with the real MASK_TOKEN_6 preset. Type/delete/paste/clear and show canonical value separately from presentation; include disabled/readOnly/IME behavior owned by the hook.
- [x] Each selected V2 resource has exactly two primary sections: dynamic example and Contract. Hooks document actual Parameters/Returns; styles document real classes/attributes/token dependencies. Do not render Usage/resources or Related examples.
- [x] The preview uses actual public behavior/recipes, stable indexed fixture strings where repeated, colocated view logic and reset cleanup. Copy shows minimal public consumption (hook call inside caller context or real CSS/CSS-module application), with no wrapper/state implementation or duplicated resource engine. Register only after type, behavior and relevant visual acceptance is delivered.
