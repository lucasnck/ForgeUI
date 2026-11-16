import type { NativeCheckboxProps } from "../../../types/native-control-contracts";
import type {
  ComponentSizedProps,
  ComponentToneProps,
  ComponentShapeProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends
    NativeCheckboxProps,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentShapeProps,
    ComponentFullWidthProps,
    ComponentInvalidProps,
    ComponentAnimatedProps {}

export function Checkbox({
  size = "md",
  tone = "brand",
  shape,
  fullWidth = false,
  invalid,
  animated = true,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={styles.root}
      data-size={size}
      data-tone={tone}
      data-shape={shape}
      data-full-width={fullWidth || undefined}
    >
      <input
        {...props}
        type="checkbox"
        className={[styles.control, className].filter(Boolean).join(" ")}
        aria-invalid={invalid ?? ariaInvalid}
        data-animated={animated}
      />
    </label>
  );
}
