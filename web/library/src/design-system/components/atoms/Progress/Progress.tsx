import { RangeTrack } from "../RangeTrack/RangeTrack";
import { VisuallyHidden } from "../VisuallyHidden";
import { normalizeProgressRange } from "../../../helpers/range";
import type { ReactElement } from "react";
import type { NativeProgressProps, ComponentProgressValueProps } from "../../../types/range";
import type { ComponentAccessibleNameProps } from "../../../types/interactive-controls";
import type {
  ComponentSizedProps,
  ComponentToneProps,
  ComponentFullWidthProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";

export interface ProgressProps
  extends
    NativeProgressProps,
    ComponentProgressValueProps,
    ComponentAccessibleNameProps,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps {}
import styles from "./Progress.module.css";

export function Progress({
  className,
  label,
  value,
  max,
  size = "md",
  tone = "brand",
  fullWidth = true,
  animated = true,
  ...props
}: ProgressProps): ReactElement {
  if (!label.trim()) throw new Error("Progress requires a nonempty accessible label.");
  const range = normalizeProgressRange(value, max);
  const ratio = range.value === undefined ? undefined : range.value / range.max;

  return (
    <span
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-full-width={fullWidth || undefined}
    >
      <VisuallyHidden>
        <progress {...props} value={range.value} max={range.max} aria-label={label} />
      </VisuallyHidden>
      <RangeTrack ratio={ratio} animated={animated} />
    </span>
  );
}
