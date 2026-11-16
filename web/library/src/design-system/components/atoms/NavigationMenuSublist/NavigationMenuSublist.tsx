"use client";

import type { ComponentPropsWithRef } from "react";
import { validateNavigationItems } from "../../../internal/navigationmenu/validateNavigationItems";
import { useNavigationMenuSublist } from "./useNavigationMenuSublist";
import styles from "./NavigationMenuSublist.module.css";

export interface NavigationMenuSublistProps extends ComponentPropsWithRef<"ul"> {}

export function NavigationMenuSublist(input: NavigationMenuSublistProps) {
  const { children, props, className, Item } = useNavigationMenuSublist(input);
  validateNavigationItems(children, Item);
  return (
    <ul {...props} role={undefined} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </ul>
  );
}
