import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentContainerSize,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./Container.module.css";

export interface ContainerProps
  extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement>, ComponentSpaceProps {
  as?: LayoutElement;
  size?: ComponentContainerSize;
}

export function Container({ as = "div", size, gap, padding, className, ...props }: ContainerProps) {
  const Element = as;

  return createElement(Element, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-size": size,
    "data-gap": gap,
    "data-padding": padding,
  });
}
