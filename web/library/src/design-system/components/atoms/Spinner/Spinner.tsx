import type { HTMLAttributes, ReactElement } from "react";
import type {
  ComponentSizedProps,
  ComponentToneProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";

export interface SpinnerProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentAnimatedProps {
  decorative?: boolean;
  label?: string;
}
import styles from "./Spinner.module.css";

export function Spinner({
  className,
  decorative = true,
  label,
  size = "md",
  tone,
  animated = true,
  ...props
}: SpinnerProps): ReactElement {
  if (!decorative && !label?.trim()) {
    throw new Error("A nondecorative Spinner requires a label.");
  }

  return (
    <span
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-animated={animated}
      role={decorative ? undefined : "status"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      tabIndex={undefined}
    />
  );
}
