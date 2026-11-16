import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentFontWeightProps,
  ComponentTextSizeProps,
  ComponentTextToneProps,
  TextElement,
} from "../../../types/typography";
import styles from "./Text.module.css";

export interface TextProps
  extends
    HTMLAttributes<HTMLElement>,
    RefAttributes<HTMLElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {
  as?: TextElement;
}

export function Text({ as = "span", size, tone, weight, className, ...props }: TextProps) {
  const Element = as;

  return createElement(Element, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-text-size": size,
    "data-text-tone": tone,
    "data-text-weight": weight,
  });
}
