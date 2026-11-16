import { TagGroupItem } from "../TagGroupItem";
import type { TagProps } from "../Tag";
import type { ReactElement, ReactNode } from "react";
import type { NativeCollectionListProps } from "../../../types/compound-composition";
import type { ComponentFullWidthProps } from "../../../types/component-capabilities";

export interface TagGroupEntry extends TagProps {
  id: string;
}

export interface TagGroupProps extends NativeCollectionListProps, ComponentFullWidthProps {
  items?: readonly TagGroupEntry[];
  children?: ReactNode;
}
import styles from "./TagGroup.module.css";

export function TagGroup({
  className,
  items,
  children,
  fullWidth = true,
  ...props
}: TagGroupProps): ReactElement {
  if (items !== undefined && children !== undefined)
    throw new Error("TagGroup accepts either items or children, not both.");
  if (items === undefined && children === undefined)
    throw new Error("TagGroup requires items or list-item children.");
  if (items && new Set(items.map((item) => item.id)).size !== items.length)
    throw new Error("TagGroup items require unique stable IDs.");
  return (
    <ul
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-full-width={fullWidth || undefined}
    >
      {items
        ? items.map(({ id, ...tag }) => (
            <TagGroupItem key={id} className={styles.item} tag={{ ...tag, id }} />
          ))
        : children}
    </ul>
  );
}
