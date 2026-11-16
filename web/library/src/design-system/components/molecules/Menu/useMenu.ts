"use client";
import { useContext, useRef } from "react";
import { DropdownMenuContext } from "../../../internal/dropdownmenu/DropdownMenuContext";
import { useRovingFocus } from "../../../hooks/focus/useRovingFocus";
import type { MenuIdentity } from "../../../internal/menu/MenuContext";
import type { MenuProps } from "./Menu";

export function useMenu(input: MenuProps, identities: readonly MenuIdentity[]) {
  const {
    onAction,
    onDismiss,
    label,
    children,
    animated = true,
    className,
    onKeyDown,
    ...props
  } = input;
  if (!label.trim()) throw new Error("Menu requires a nonempty label.");
  const dropdown = useContext(DropdownMenuContext);

  function dismiss() {
    onDismiss?.();
    dropdown?.dismiss();
  }

  const first = identities.find((item) => !item.disabled)?.value;
  const bodyRef = useRef<HTMLUListElement>(null);
  const focus = useRovingFocus({
    orientation: "vertical",
    loop: true,
    typeahead: true,
    initialId: first,
    fallbackRef: bodyRef,
  });

  function activate(value: string) {
    if (!focus.isEnabled(value)) return;
    onAction(value);
    dismiss();
  }

  const handleKeyDown: NonNullable<MenuProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);

    if (
      !event.defaultPrevented &&
      event.key === "Escape" &&
      !event.nativeEvent.isComposing &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      (onDismiss || dropdown)
    ) {
      event.preventDefault();
      dismiss();
    }
  };

  return {
    props,
    children,
    className,
    handleKeyDown,
    context: {
      label,
      focus,
      activate,
      dismiss: onDismiss || dropdown ? dismiss : undefined,
      bodyRef,
      fallback: first === undefined,
      animated,
    },
  };
}
