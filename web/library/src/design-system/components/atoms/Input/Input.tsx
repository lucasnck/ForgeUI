import type { ComponentAnimatedProps } from "../../../types/animation";
import type { NativeInputProps } from "../../../types/native-control-contracts";
import type {
  ComponentFullWidthProps,
  ComponentInvalidProps,
  VisualProps,
} from "../../../types/component-capabilities";
import styles from "./Input.module.css";

export interface InputProps
  extends
    NativeInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps,
    ComponentInvalidProps {}

export function Input({
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
}: InputProps) {
  return (
    <input
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-invalid={invalid ?? ariaInvalid}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
      data-animated={animated ? undefined : "false"}
    />
  );
}
