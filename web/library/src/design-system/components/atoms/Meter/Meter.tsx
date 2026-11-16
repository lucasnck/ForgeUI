import { RangeTrack } from "../RangeTrack/RangeTrack";
import { VisuallyHidden } from "../VisuallyHidden";
import { normalizeMeterRange } from "../../../helpers/range";
import type { ReactElement } from "react";
import type { NativeMeterProps, ComponentMeterValueProps } from "../../../types/range";
import type { ComponentAccessibleNameProps } from "../../../types/interactive-controls";
import type {
  ComponentSizedProps,
  ComponentToneProps,
  ComponentFullWidthProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";

export interface MeterProps
  extends
    NativeMeterProps,
    ComponentMeterValueProps,
    ComponentAccessibleNameProps,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps {}
import styles from "./Meter.module.css";

export function Meter({
  className,
  label,
  value,
  min,
  max,
  low,
  high,
  optimum,
  size = "md",
  tone = "brand",
  fullWidth = true,
  animated = true,
  ...props
}: MeterProps): ReactElement {
  const range = normalizeMeterRange({ value, min, max, low, high, optimum });
  const extent = range.max - range.min;
  const ratio = Number.isFinite(extent)
    ? (range.value - range.min) / extent
    : (range.value / 2 - range.min / 2) / (range.max / 2 - range.min / 2);

  return (
    <span
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-full-width={fullWidth || undefined}
    >
      <VisuallyHidden>
        <meter {...props} {...range} aria-label={label} />
      </VisuallyHidden>
      <RangeTrack ratio={ratio} animated={animated} />
    </span>
  );
}
