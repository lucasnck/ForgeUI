---
title: "RangeTrack"
scope: "Private SVG track renderer for normalized range indicators"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# RangeTrack

## Files

```text
design-system/components/atoms/RangeTrack/RangeTrack.tsx (M)
```

## Dependencies

- [Range recipes](../../styles/tech-range-recipes.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)

## Contract

```tsx
import { RangeTrack } from "@/design-system/components/atoms/RangeTrack/RangeTrack";
<RangeTrack ratio={ratio} animated={animated}/>;
```

## Animations

```text
rangeFill
indeterminateSegment
```

## Content

```tsx
import type { ReactElement } from "react";
import type {
  ComponentAnimatedProps,
} from "../../../types/animation";
import styles from "../../../styles/range-components.module.css";

interface RangeTrackProps extends ComponentAnimatedProps {
  ratio?: number;
}

/** Private visual renderer; Progress and Meter retain their native semantics. */
export function RangeTrack({
  ratio,
  animated = true,
}: RangeTrackProps): ReactElement {
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
        width={ratio === undefined ? 30 : Number.isNaN(ratio) ? 0 : Math.min(1, Math.max(0, ratio)) * 100}
        height={1}
        data-indeterminate={ratio === undefined || undefined}
        data-animated={animated}
      />
    </svg>
  );
}
```

## Tests

- Missing ratio renders the fixed indeterminate segment without fabricating task progress.
- Supplied ratios clamp to 0..1 and become SVG geometry rather than runtime CSS width.
- Rendering contributes no second accessible progressbar or meter role.

## Criteria

- [x] RangeTrack remains private and absent from the public root barrel and available component catalog.
- [x] Progress and Meter retain the authoritative native values and accessible names.
- [x] Native state is immediate; numeric geometry never becomes inline CSS.
- [x] Indeterminate geometry is meaningful and static under reduced motion.

- [x] V2 coverage exercises private RangeTrack only through public Slider/ProgressBar/Meter consumers where used by source. Do not create a public RangeTrack import, definition, route or navigation entry.
