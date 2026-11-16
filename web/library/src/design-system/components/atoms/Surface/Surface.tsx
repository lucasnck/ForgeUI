import { createElement, type HTMLAttributes, type RefAttributes } from "react";
import type {
  ComponentAlignProps,
  ComponentElevation,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import type { ComponentShapeProps } from "../../../types/component-capabilities";
import styles from "./Surface.module.css";

export interface SurfaceProps
  extends
    HTMLAttributes<HTMLElement>,
    RefAttributes<HTMLElement>,
    ComponentSpaceProps,
    ComponentAlignProps,
    ComponentShapeProps {
  as?: LayoutElement;
  elevation?: ComponentElevation;
}

export function Surface({
  as = "div",
  elevation = "raised",
  gap,
  padding,
  align,
  shape,
  className,
  ...props
}: SurfaceProps) {
  return createElement(as, {
    ...props,
    className: [styles.root, className].filter(Boolean).join(" "),
    "data-elevation": elevation === "flat" ? undefined : elevation,
    "data-gap": gap,
    "data-padding": padding,
    "data-align": align,
    "data-shape": shape,
  });
}
