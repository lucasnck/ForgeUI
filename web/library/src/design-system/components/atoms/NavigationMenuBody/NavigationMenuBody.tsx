"use client";

import type { ComponentPropsWithRef } from "react";
import { validateNavigationItems } from "../../../internal/navigationmenu/validateNavigationItems";
import { NavigationMenuItem } from "../../molecules/NavigationMenuItem";
import { useNavigationMenuBody } from "./useNavigationMenuBody";
import styles from "./NavigationMenuBody.module.css";

export interface NavigationMenuBodyProps extends ComponentPropsWithRef<"ul"> {}

export function NavigationMenuBody(input: NavigationMenuBodyProps) {
  const { props, children, className } = useNavigationMenuBody(input);
  validateNavigationItems(children, NavigationMenuItem);
  return (
    <ul {...props} role={undefined} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </ul>
  );
}
