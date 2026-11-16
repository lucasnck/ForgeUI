import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ComponentSpaceProps } from "../../../types/layout";
import type { ComponentFullWidthProps } from "../../../types/component-capabilities";
import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps
  extends ComponentPropsWithRef<"div">, ComponentSpaceProps, ComponentFullWidthProps {
  label: string;
  children: ReactNode;
}

export function ButtonGroup({
  children,
  className,
  label,
  gap = "2",
  padding,
  fullWidth = false,
  ...props
}: ButtonGroupProps) {
  if (!label.trim()) throw new Error("ButtonGroup requires a nonempty label.");
  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      data-gap={gap}
      data-padding={padding}
      data-full-width={fullWidth || undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
