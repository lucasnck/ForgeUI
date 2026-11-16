---
title: "ProgressBar"
scope: "Compose Progress with a visible task label and value text"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# ProgressBar

## Files

```text
features/showcase-v2/components/ProgressBar/NormalizedRangeExample.tsx (C)
design-system/components/molecules/ProgressBar/ProgressBar.tsx (M)
design-system/components/molecules/ProgressBar/ProgressBar.module.css (M)
design-system/components/molecules/ProgressBar/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/ProgressBar.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/ProgressBar/definition.ts (C)
features/showcase-v2/components/ProgressBar/ProgressBar.example.tsx (C)
features/showcase-v2/components/ProgressBar/useProgressBarExample.ts (C)
features/showcase-v2/components/ProgressBar/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/ProgressBar/fixtures.ts (C)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Progress](../atoms/Progress.sc.md)
- [Range indicators](../../helpers/tech-range-indicators.sc.md)
- [Interactive primitives](../../styles/tech-interactive-primitives.sc.md)
- [Text](../atoms/Text.sc.md)
- [Native control recipes](../../styles/tech-native-control-recipes.sc.md)
- [Range contracts](../../types/tech-range-contracts.sc.md)
- [Interactive native controls](../../types/tech-interactive-controls.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)

## Contract

```tsx
import { ProgressBar } from "@forge-ui/web";
<ProgressBar label="Upload" value={40} max={100} valueText="40 percent"/>;
```

## Styles

```css
.root {
  composes: fullWidth from "../../../styles/full-width-components.module.css";
}
```

## Content

```tsx
import { normalizeProgressRange } from "../../../helpers/range";
import { Progress } from "../../atoms/Progress";
import { Text } from "../../atoms/Text";
import type { HTMLAttributes, ReactElement } from "react";
import type { ComponentProgressValueProps, ComponentAccessibleNameProps, ComponentSizedProps, ComponentToneProps, ComponentFullWidthProps, ComponentAnimatedProps, } from "../../../types";
import styles from "./ProgressBar.module.css";
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement>, ComponentProgressValueProps, ComponentAccessibleNameProps, ComponentSizedProps, ComponentToneProps, ComponentFullWidthProps, ComponentAnimatedProps {
  valueText?: string;
}
export function ProgressBar({ className, label, value, max, valueText, size = "md", tone = "brand", fullWidth = true, animated = true, ...props }: ProgressBarProps): ReactElement {
  const range = normalizeProgressRange(value, max);
  const displayValue = valueText ??
    (range.value === undefined
      ? undefined
      : `${Math.round((range.value / range.max) * 100)}%`);
  return (<div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-full-width={fullWidth || undefined}>
   <div className={styles.caption}>
  <Text>{label}</Text>
  {displayValue && <Text aria-hidden="true">{displayValue}</Text>}
   </div>
   <Progress label={label} value={range.value} max={range.max} size={size} tone={tone} fullWidth animated={animated} aria-valuetext={displayValue}/>
  </div>);
}
```

## Tests

- V2 Measured range: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Five sizes, seven tones, widths, zero/midpoint/completed, indeterminate, localized valueText and long labels are demonstrated.
- [x] Exactly one native progress has the task name and normalized values; caption/aria-valuetext agree.
- [x] Indeterminate never claims a made-up percentage or duplicate live announcement.
- [x] Exactly one Molecule registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] The Defaults contract uses label required; size md, tone brand, fullWidth true.
- [x] The Constraint 1 contract uses Canonical value/max normalization.
- [x] The Constraint 2 contract uses valueText optional localized override; otherwise rounded normalized percentage for determinate values.
- [x] The Constraint 3 contract uses Indeterminate has no fabricated percentage; omitted valueText produces no value caption.
- [x] The Constraint 4 contract uses Root has no range role or automatic live region.
- [x] Defaults are those in Signature.
- [x] Root display grid, gap var(--space-1), inline-size var(--length-20), max-inline-size var(--size-full).
- [x] The private RangeTrack animates the SVG rect width with --motion-normal and --ease-standard; native value and accessible value text update immediately.
- [x] No entrance animation is required.

- [x] V2 **Measured range**: Compose a named measurement/range and caller controls using valid min/max/value relationships and supported step/thresholds. Show actual value feedback immediately; only interactive Slider receives editing actions, and progress never fabricates elapsed work.
- [x] The ProgressBar V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useProgressBarExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **Normalized range boundaries** in the ProgressBar example uses the actual [helper contract](../../helpers/tech-range-indicators.sc.md): Use actual normalizeProgressRange/normalizeMeterRange fixtures for valid/out-of-range inputs and supported missing values; compare public Progress/Meter semantics and reject invented elapsed progress or fabricated input correction callbacks. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

- [x] Supporting helper consumption uses public canonical formatter/validator, geometry or range APIs with deterministic valid fixtures and copyable public usage.
- [ ] Review the added supporting helper examples in a real browser, including narrow layout and displayed output/snippet agreement; SSR and type checks do not certify this visual acceptance.
