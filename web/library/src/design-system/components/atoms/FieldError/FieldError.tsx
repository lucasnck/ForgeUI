import type { HTMLAttributes, ReactElement, RefAttributes } from "react";
import type {
  ComponentTextSizeProps,
  ComponentTextToneProps,
  ComponentFontWeightProps,
} from "../../../types/typography";

export interface FieldErrorProps
  extends
    HTMLAttributes<HTMLParagraphElement>,
    RefAttributes<HTMLParagraphElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {
  announce?: boolean;
}
import styles from "./FieldError.module.css";

export function FieldError({
  children,
  className,
  role,
  announce = true,
  size = "sm",
  tone = "danger",
  weight = "regular",
  ...props
}: FieldErrorProps): ReactElement {
  return (
    <p
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      role={role ?? (announce ? "alert" : undefined)}
      data-text-size={size}
      data-text-tone={tone}
      data-text-weight={weight}
    >
      {children}
    </p>
  );
}
