import type { ReactElement } from "react";
import type { ComponentAnimatedProps } from "../../../types/animation";
import styles from "../../../styles/range-components.module.css";

interface RangeTrackProps extends ComponentAnimatedProps {
  ratio?: number;
}

/** Private visual renderer; Progress and Meter retain their native semantics. */
export function RangeTrack({ ratio, animated = true }: RangeTrackProps): ReactElement {
  return (
    <svg
      className={styles.visual}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        className={styles.fill}
        x={0}
        y={0}
        width={
          ratio === undefined ? 30 : Number.isNaN(ratio) ? 0 : Math.min(1, Math.max(0, ratio)) * 100
        }
        height={1}
        data-indeterminate={ratio === undefined || undefined}
        data-animated={animated}
      />
    </svg>
  );
}
