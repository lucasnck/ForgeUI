import type { HTMLAttributes, ReactNode } from "react";
import type { ComponentFullWidthProps } from "../../../types/component-capabilities";
import type {
  ComponentAlignProps,
  ComponentSpaceProps,
  LayoutElement,
} from "../../../types/layout";
import styles from "./InputGroup.module.css";

export interface InputGroupProps
  extends
    HTMLAttributes<HTMLElement>,
    ComponentSpaceProps,
    ComponentAlignProps,
    ComponentFullWidthProps {
  as?: LayoutElement;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export function InputGroup({
  children,
  className,
  leading,
  trailing,
  gap = "2",
  align = "stretch",
  padding = "0",
  fullWidth = true,
  as = "div",
  ...props
}: InputGroupProps) {
  const Tag = as;

  return (
    <Tag
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-gap={gap}
      data-align={align}
      data-padding={padding}
      data-full-width={fullWidth || undefined}
    >
      {leading}
      {children}
      {trailing}
    </Tag>
  );
}
