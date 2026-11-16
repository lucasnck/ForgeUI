import type { ReactElement } from "react";
import type { ComponentAnimatedProps } from "../../../types/animation";
import type { NativeRadioProps } from "../../../types/interactive-controls";
import type {
  ComponentSizedProps,
  ComponentToneProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface RadioProps
  extends
    NativeRadioProps,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps,
    ComponentInvalidProps {}
import styles from "./Radio.module.css";

export function Radio({
  className,
  fullWidth = false,
  invalid,
  animated = true,
  size = "md",
  tone = "brand",
  "aria-invalid": ariaInvalid,
  ...props
}: RadioProps): ReactElement {
  return (
    <span
      className={styles.root}
      data-size={size}
      data-tone={tone}
      data-full-width={fullWidth || undefined}
    >
      <input
        {...props}
        className={[styles.control, className].filter(Boolean).join(" ")}
        type="radio"
        aria-invalid={invalid ?? ariaInvalid}
        data-animated={animated}
      />
    </span>
  );
}
