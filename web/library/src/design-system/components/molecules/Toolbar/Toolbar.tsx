"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
} from "../../../types/compound-composition";
import type { NavigationOrientation, NavigationDirection } from "../../../types/focus";
import { ToolbarContext } from "../../../internal/toolbar/ToolbarContext";
import { ToolbarItem } from "../../atoms/ToolbarItem";
import type { ToolbarItemProps } from "../../atoms/ToolbarItem";
import { useToolbar } from "./useToolbar";
import styles from "./Toolbar.module.css";

export interface ToolbarProps extends NativeCollectionRootProps, ComponentChildrenProps {
  label: string;
  orientation?: NavigationOrientation;
  direction?: NavigationDirection;
}

function collectItems(children: ReactNode): ReactElement<ToolbarItemProps>[] {
  const items: ReactElement<ToolbarItemProps>[] = [];
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;

    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment &&
      child.key !== null
    ) {
      items.push(...collectItems(child.props.children));
      return;
    }

    if (!isValidElement<ToolbarItemProps>(child) || child.type !== ToolbarItem) {
      throw new Error("Toolbar accepts only ToolbarItem controls and keyed fragments.");
    }

    items.push(child);
  });
  return items;
}

export function Toolbar(input: ToolbarProps) {
  const items = collectItems(input.children);
  const {
    label,
    children,
    orientation,
    direction,
    className,
    props,
    rootRef,
    focus,
    handleKeyDown,
  } = useToolbar(input, items.find((item) => !item.props.disabled)?.props.itemKey);
  if (items.length < 3)
    throw new Error(
      "Toolbar requires at least three ToolbarItem controls; use ButtonGroup for smaller groups.",
    );
  const keys = items.map((item) => item.props.itemKey);
  if (keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length)
    throw new Error("Toolbar itemKey values must be nonempty and unique.");
  return (
    <ToolbarContext value={focus}>
      <div
        {...props}
        ref={rootRef}
        role="toolbar"
        aria-label={label}
        aria-orientation={orientation}
        dir={direction}
        data-orientation={orientation}
        data-gap="2"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        {children}
      </div>
    </ToolbarContext>
  );
}
