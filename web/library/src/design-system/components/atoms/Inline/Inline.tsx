import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentAlignProps,
  ComponentJustifyProps,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./Inline.module.css";

export interface InlineProps
  extends
    HTMLAttributes<HTMLElement>,
    RefAttributes<HTMLElement>,
    ComponentSpaceProps,
    ComponentAlignProps,
    ComponentJustifyProps {
  as?: LayoutElement;
  wrap?: boolean;
}

export function Inline({
  as = "div",
  gap,
  padding,
  align,
  justify,
  wrap = true,
  className,
  ...props
}: InlineProps) {
  const Element = as;

  return createElement(Element, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-gap": gap,
    "data-padding": padding,
    "data-align": align,
    "data-justify": justify,
    "data-wrap": wrap ? undefined : "false",
  });
}
