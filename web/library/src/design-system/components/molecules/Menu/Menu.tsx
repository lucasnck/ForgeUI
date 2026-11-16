"use client";
import { Children, Fragment, isValidElement } from "react";
import type { ReactNode, ReactElement } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
  ComponentAnimatedProps,
} from "../../../types";
import type { MenuIdentity } from "../../../internal/menu/MenuContext";
import { MenuContext } from "../../../internal/menu/MenuContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { MenuHeader } from "../../atoms/MenuHeader";
import { MenuBody } from "../../atoms/MenuBody";
import { MenuFooter } from "../../atoms/MenuFooter";
import { MenuItem } from "../../atoms/MenuItem";
import { useMenu } from "./useMenu";
import styles from "./Menu.module.css";
export interface MenuProps
  extends NativeCollectionRootProps, ComponentChildrenProps, ComponentAnimatedProps {
  label: string;
  onAction(value: string): void;
  onDismiss?(): void;
}

function collectItems(children: ReactNode, items: MenuIdentity[] = []) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<MenuIdentity & { children?: ReactNode }>(child))
      throw new Error("Invalid Menu child.");

    if (child.type === Fragment && child.key !== null) {
      collectItems(child.props.children, items);
      return;
    }

    if (
      child.type !== MenuItem ||
      !child.props.value.trim() ||
      items.some((item) => item.value === child.props.value)
    )
      throw new Error("Menu requires direct items with nonempty unique identities.");
    items.push({ value: child.props.value, disabled: child.props.disabled });
  });
  return items;
}

export function Menu(input: MenuProps) {
  const parts = collectCompoundParts(
    input.children,
    { header: MenuHeader, body: MenuBody, footer: MenuFooter },
    ["body"],
  );
  const items = collectItems((parts.body as ReactElement<{ children: ReactNode }>).props.children);
  const { props, className, handleKeyDown, context } = useMenu(input, items);

  return (
    <MenuContext value={context}>
      <div
        {...props}
        className={[styles.root, className].filter(Boolean).join(" ")}
        onKeyDown={handleKeyDown}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </div>
    </MenuContext>
  );
}
