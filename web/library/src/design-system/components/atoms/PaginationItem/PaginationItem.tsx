"use client";

import type { NativeCollectionButtonProps } from "../../../types/compound-composition";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { Button } from "../Button";
import { usePaginationItem } from "./usePaginationItem";
import styles from "./PaginationItem.module.css";

export interface PaginationItemProps extends NativeCollectionButtonProps, ComponentAnimatedProps {
  page: number;
  label: string;
}

export function PaginationItem(props: PaginationItemProps) {
  const view = usePaginationItem(props);

  return (
    <Button
      {...view.props}
      type="button"
      aria-label={view.label}
      aria-current={view.selected ? "page" : undefined}
      disabled={view.unavailable}
      onClick={view.handleClick}
      tone="neutral"
      appearance={view.selected ? "soft" : "ghost"}
      data-animated={view.animated}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      {view.children ?? props.page}
    </Button>
  );
}
