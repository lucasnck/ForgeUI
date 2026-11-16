import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type { ComponentAspectRatio, LayoutElement } from "../../../types/layout";
import styles from "./AspectRatio.module.css";

export interface AspectRatioProps extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement> {
  as?: LayoutElement;
  ratio: ComponentAspectRatio;
}

export function AspectRatio({ as = "div", ratio, className, ...props }: AspectRatioProps) {
  const Element = as;

  return createElement(Element, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-ratio": ratio,
  });
}
