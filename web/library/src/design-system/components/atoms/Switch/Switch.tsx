import type { ReactElement } from "react";
import type { NativeSwitchProps } from "../../../types/interactive-controls";
import type {
  ComponentSizedProps,
  ComponentToneProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface SwitchProps
  extends
    NativeSwitchProps,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {}
import styles from "./Switch.module.css";

export function Switch({
  className,
  fullWidth = false,
  invalid,
  size = "md",
  tone = "brand",
  "aria-invalid": ariaInvalid,
  ...props
}: SwitchProps): ReactElement {
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
        type="checkbox"
        role="switch"
        aria-invalid={invalid ?? ariaInvalid}
      />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </span>
  );
}
