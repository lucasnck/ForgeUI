import type { NativeSelectProps } from "../../../types/native-control-contracts";
import type {
  ComponentFullWidthProps,
  ComponentInvalidProps,
  VisualProps,
} from "../../../types/component-capabilities";
import styles from "./Select.module.css";

export interface SelectProps
  extends NativeSelectProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {}

export function Select({
  invalid,
  className,
  fullWidth = true,
  size = "md",
  tone = "neutral",
  appearance = "bordered",
  shape,
  "aria-invalid": ariaInvalid,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-invalid={invalid ?? ariaInvalid}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
    />
  );
}
