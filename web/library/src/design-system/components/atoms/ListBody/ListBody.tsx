"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { ListItem } from "../ListItem";
import { useListBody } from "./useListBody";
import styles from "./ListBody.module.css";

export interface ListBodyProps extends ComponentPropsWithRef<"ul"> {}

function validateItems(children: ReactNode): void {
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;

    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      validateItems(child.props.children);
      return;
    }

    if (!isValidElement(child) || child.type !== ListItem) {
      throw new Error("ListBody accepts only ListItem children.");
    }
  });
}

export function ListBody(props: ListBodyProps) {
  const view = useListBody(props);
  validateItems(view.children);
  return (
    <ul
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      aria-labelledby={view.context.titleId}
      aria-label={view.context.titleId ? undefined : view.context.label}
    >
      {view.children}
    </ul>
  );
}
