import type { ComponentAnimatedProps } from "../../../types/animation";
import type { NativeTextareaProps } from "../../../types/native-control-contracts";
import type {
  ComponentFullWidthProps,
  ComponentInvalidProps,
  VisualProps,
} from "../../../types/component-capabilities";
import styles from "./Textarea.module.css";

export interface TextareaProps
  extends
    NativeTextareaProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps,
    ComponentAnimatedProps {}

export function Textarea({
  invalid,
  animated = true,
  className,
  fullWidth = true,
  size = "md",
  tone = "neutral",
  appearance = "bordered",
  shape,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-invalid={invalid ?? ariaInvalid}
      data-animated={animated ? undefined : "false"}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
    />
  );
}
