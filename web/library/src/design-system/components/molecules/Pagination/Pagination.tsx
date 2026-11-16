"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PaginationContext } from "../../../internal/pagination/PaginationContext";
import { PaginationEllipsis } from "../../atoms/PaginationEllipsis";
import { PaginationItem } from "../../atoms/PaginationItem";
import type { PaginationItemProps } from "../../atoms/PaginationItem";
import { usePagination } from "./usePagination";
import styles from "./Pagination.module.css";

export interface PaginationProps extends NativeSectionRootProps, ComponentChildrenProps {
  label: string;
  page: number;
  pageCount: number;
  onPageChange(page: number): void;
  disabled?: boolean;
}

function collectItems(
  children: ReactNode,
  prefix = "",
): { item: ReactElement<PaginationItemProps>; key: string }[] {
  const items: { item: ReactElement<PaginationItemProps>; key: string }[] = [];
  Children.forEach(children, (child, index) => {
    if (child === null || child === undefined || typeof child === "boolean") return;
    if (!isValidElement<PaginationItemProps>(child)) throw new Error("Invalid Pagination child.");
    const key = prefix + "/" + (child.key ?? index);

    if (child.type === Fragment && child.key !== null) {
      items.push(...collectItems(child.props.children, key));
      return;
    }

    if (child.type !== PaginationItem && child.type !== PaginationEllipsis)
      throw new Error(
        "Pagination accepts only PaginationItem or PaginationEllipsis children and keyed fragments.",
      );
    items.push({ item: child, key });
  });
  return items;
}

export function Pagination(props: PaginationProps) {
  const view = usePagination(props);
  const items = collectItems(view.children);

  for (const { item } of items) {
    if (item.type === PaginationEllipsis) continue;

    if (
      !Number.isInteger(item.props.page) ||
      item.props.page < 1 ||
      item.props.page > view.pageCount
    ) {
      throw new Error("PaginationItem target must be an integer in the root page range.");
    }
  }

  return (
    <PaginationContext
      value={{
        page: view.page,
        pageCount: view.pageCount,
        disabled: view.disabled,
        requestPage: view.requestPage,
      }}
    >
      <nav
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        aria-label={view.label}
      >
        <ol className={styles.list}>
          {items.map(({ item, key }) => (
            <li key={key}>{item}</li>
          ))}
        </ol>
      </nav>
    </PaginationContext>
  );
}
