"use client";

import type { ChangeEvent } from "react";
import type { FileInputProps } from "./FileInput";

export function useFileInput({ onChange, onFilesChange, ...props }: FileInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (!event.defaultPrevented) onFilesChange?.(Array.from(event.currentTarget.files ?? []));
  }

  return { props, handleChange };
}
