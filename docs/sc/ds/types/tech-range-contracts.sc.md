---
title: "Range contracts"
scope: "Range contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Range contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/foundations/types.ts (D)
design-system/types/range.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { NativeProgressProps } from "@forge-ui/web";
type Contract = NativeProgressProps;
```

## Content

```ts
import type { ProgressHTMLAttributes, MeterHTMLAttributes } from "react";

export interface NativeProgressProps
  extends Omit<
    ProgressHTMLAttributes<HTMLProgressElement>,
    "value" | "max" | "children"
  > {}

export interface NativeMeterProps
  extends Omit<
    MeterHTMLAttributes<HTMLMeterElement>,
    "value" | "min" | "max" | "low" | "high" | "optimum" | "children"
  > {}

export interface ComponentProgressValueProps {
  value?: number;
  max?: number;
}

export interface ComponentMeterValueProps {
  value: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;
}

export interface ProgressRange {
  value: number | undefined;
  max: number;
}

export interface MeterRange {
  value: number;
  min: number;
  max: number;
  low: number;
  high: number;
  optimum: number;
}
```

## Tests

- V2 Consumer snippets for Progress, Meter, Slider retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile optional progress values and required meter values; reject missing meter values and string numbers.
- Compile normalized progress/meter results and reject incompatible bounds or thresholds.
- Reject native value channels excluded by the canonical progress/meter adaptations.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Progress, Meter, Slider: Valid range/value boundaries and native versus interactive channels. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.
