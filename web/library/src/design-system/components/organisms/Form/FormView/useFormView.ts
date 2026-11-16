"use client";
import { useCallback, useEffect, useId, useRef } from "react";

export function useFormView(idPrefix?: string) {
  const generated = useId();
  const root = useRef<HTMLElement | null>(null);
  const setRoot = useCallback((node: HTMLElement | null) => {
    root.current = node;
  }, []);
  useEffect(() => {
    const node = root.current;
    const form = node?.closest("form");
    if (!node || !form) return;

    function guardDraft(event: Event) {
      const editor = Array.from(
        node!.querySelectorAll<HTMLInputElement>("input[data-form-draft]"),
      ).find((input) => !input.disabled && input.validity.customError);
      if (!editor) return;
      event.preventDefault();
      event.stopPropagation();
      editor.reportValidity();
      editor.focus();
    }

    form.addEventListener("submit", guardDraft, true);
    return () => form.removeEventListener("submit", guardDraft, true);
  });

  return { idPrefix: idPrefix ?? generated, rootRef: setRoot };
}
