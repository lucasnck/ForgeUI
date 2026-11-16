import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { BreadcrumbItem } from "../../atoms/BreadcrumbItem";
import type { BreadcrumbItemProps } from "../../atoms/BreadcrumbItem";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps extends NativeSectionRootProps, ComponentChildrenProps {
  label: string;
}

function collectItems(children: ReactNode): ReactElement<BreadcrumbItemProps>[] {
  const items: ReactElement<BreadcrumbItemProps>[] = [];
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

    if (!isValidElement<BreadcrumbItemProps>(child) || child.type !== BreadcrumbItem) {
      throw new Error("Breadcrumb accepts only BreadcrumbItem children and keyed fragments.");
    }

    items.push(child);
  });
  return items;
}

export function Breadcrumb({ children, className, label, ...props }: BreadcrumbProps) {
  if (!label.trim()) throw new Error("Breadcrumb requires a nonempty navigation label.");
  const items = collectItems(children);
  const current = items.filter((item) => item.props.current);

  if (current.length !== 1 || current[0] !== items.at(-1)) {
    throw new Error("Breadcrumb requires exactly one current item, placed last.");
  }

  return (
    <nav
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
}
