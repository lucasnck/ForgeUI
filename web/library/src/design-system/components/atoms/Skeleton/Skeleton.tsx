import type { HTMLAttributes, ReactElement } from "react";
import type {
  ComponentSizedProps,
  ComponentShapeProps,
  ComponentFullWidthProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";
import type { ComponentSkeletonKindProps } from "../../../types/loading";

export interface SkeletonProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    ComponentSizedProps,
    ComponentShapeProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps,
    ComponentSkeletonKindProps {}
import styles from "./Skeleton.module.css";

export function Skeleton({
  className,
  size = "md",
  kind = "rectangle",
  shape,
  fullWidth = true,
  animated = true,
  ...props
}: SkeletonProps): ReactElement {
  return (
    <span
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-hidden="true"
      role={undefined}
      aria-live={undefined}
      tabIndex={undefined}
      data-size={size}
      data-kind={kind}
      data-shape={shape}
      data-full-width={(kind !== "circle" && fullWidth) || undefined}
      data-animated={animated}
    >
      {null}
    </span>
  );
}
