"use client";
import { useImperativeHandle } from "react";
import { useMenuContext } from "../../../internal/menu/MenuContext";
import type { MenuBodyProps } from "./MenuBody";

export function useMenuBody(input: MenuBodyProps) {
  const { className, ref, onKeyDown, ...props } = input;
  const menu = useMenuContext();
  useImperativeHandle(ref, () => menu.bodyRef.current!, [menu.bodyRef]);

  const handleKeyDown: NonNullable<MenuBodyProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    menu.focus.onKeyDown(event);
  };

  return {
    props,
    className,
    bodyRef: menu.bodyRef,
    label: menu.label,
    fallback: menu.fallback,
    handleKeyDown,
  };
}
