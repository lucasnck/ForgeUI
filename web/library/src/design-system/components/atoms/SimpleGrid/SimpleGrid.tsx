import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentGridColumns,
  ComponentResponsive,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./SimpleGrid.module.css";

export interface SimpleGridProps
  extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement>, ComponentSpaceProps {
  as?: LayoutElement;
  columns: ComponentResponsive<ComponentGridColumns>;
}

export function SimpleGrid({
  as = "div",
  columns,
  gap,
  padding,
  className,
  ...props
}: SimpleGridProps) {
  const Element = as;

  return createElement(Element, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-columns": columns.base,
    "data-columns-mobile": columns.mobile,
    "data-columns-wide": columns.wide,
    "data-gap": gap,
    "data-padding": padding,
  });
}
