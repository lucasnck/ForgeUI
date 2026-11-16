import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentAlignProps,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./Stack.module.css";

export interface StackProps
  extends
    HTMLAttributes<HTMLElement>,
    RefAttributes<HTMLElement>,
    ComponentSpaceProps,
    ComponentAlignProps {
  as?: LayoutElement;
}

export function Stack({ as = "div", gap, padding, align, className, ...props }: StackProps) {
  const Element = as;

  return createElement(Element, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-gap": gap,
    "data-padding": padding,
    "data-align": align,
  });
}
