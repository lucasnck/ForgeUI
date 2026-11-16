import { normalizeProgressRange } from "../../../helpers/range";
import { Progress } from "../../atoms/Progress";
import { Text } from "../../atoms/Text";
import type { HTMLAttributes, ReactElement } from "react";
import type { ComponentProgressValueProps } from "../../../types/range";
import type { ComponentAccessibleNameProps } from "../../../types/interactive-controls";
import type {
  ComponentSizedProps,
  ComponentToneProps,
  ComponentFullWidthProps,
} from "../../../types/component-capabilities";
import type { ComponentAnimatedProps } from "../../../types/animation";

export interface ProgressBarProps
  extends
    HTMLAttributes<HTMLDivElement>,
    ComponentProgressValueProps,
    ComponentAccessibleNameProps,
    ComponentSizedProps,
    ComponentToneProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps {
  valueText?: string;
}
import styles from "./ProgressBar.module.css";

export function ProgressBar({
  className,
  label,
  value,
  max,
  valueText,
  size = "md",
  tone = "brand",
  fullWidth = true,
  animated = true,
  ...props
}: ProgressBarProps): ReactElement {
  const range = normalizeProgressRange(value, max);
  const displayValue =
    valueText ??
    (range.value === undefined ? undefined : `${Math.round((range.value / range.max) * 100)}%`);

  return (
    <div
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-full-width={fullWidth || undefined}
    >
      <div className={styles.caption}>
        <Text>{label}</Text>
        {displayValue && <Text aria-hidden="true">{displayValue}</Text>}
      </div>
      <Progress
        label={label}
        value={range.value}
        max={range.max}
        size={size}
        tone={tone}
        fullWidth
        animated={animated}
        aria-valuetext={displayValue}
      />
    </div>
  );
}
