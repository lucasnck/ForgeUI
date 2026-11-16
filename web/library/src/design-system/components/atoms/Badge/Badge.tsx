import type { HTMLAttributes, ReactElement } from "react";
import type { VisualProps, ComponentFullWidthProps } from "../../../types/component-capabilities";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VisualProps, ComponentFullWidthProps {}
import styles from "./Badge.module.css";

export function Badge({
  children,
  className,
  size = "md",
  tone = "brand",
  appearance = "soft",
  shape,
  fullWidth = false,
  ...props
}: BadgeProps): ReactElement {
  return (
    <span
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
      data-full-width={fullWidth || undefined}
    >
      {children}
    </span>
  );
}
