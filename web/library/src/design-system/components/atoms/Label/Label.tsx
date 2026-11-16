import type { LabelHTMLAttributes, ReactElement } from "react";
import type {
  ComponentTextSizeProps,
  ComponentTextToneProps,
  ComponentFontWeightProps,
} from "../../../types/typography";

export interface LabelProps
  extends
    LabelHTMLAttributes<HTMLLabelElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {
  htmlFor: string;
  required?: boolean;
}
import styles from "./Label.module.css";

export function Label({
  children,
  className,
  htmlFor,
  required = false,
  size = "md",
  tone = "default",
  weight = "semibold",
  ...props
}: LabelProps): ReactElement {
  return (
    <label
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      htmlFor={htmlFor}
      data-text-size={size}
      data-text-tone={tone}
      data-text-weight={weight}
    >
      {children}
      {required && <span aria-hidden="true"> *</span>}
    </label>
  );
}
