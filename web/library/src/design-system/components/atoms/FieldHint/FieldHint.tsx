import type { HTMLAttributes, ReactElement, RefAttributes } from "react";
import type {
  ComponentTextSizeProps,
  ComponentTextToneProps,
  ComponentFontWeightProps,
} from "../../../types/typography";

export interface FieldHintProps
  extends
    HTMLAttributes<HTMLParagraphElement>,
    RefAttributes<HTMLParagraphElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {}
import styles from "./FieldHint.module.css";

export function FieldHint({
  children,
  className,
  size = "sm",
  tone = "muted",
  weight = "regular",
  ...props
}: FieldHintProps): ReactElement {
  return (
    <p
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-text-size={size}
      data-text-tone={tone}
      data-text-weight={weight}
    >
      {children}
    </p>
  );
}
