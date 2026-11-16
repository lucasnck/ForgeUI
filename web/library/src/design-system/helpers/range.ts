import type { ComponentMeterValueProps, MeterRange, ProgressRange } from "../types/range";

export function normalizeProgressRange(value?: number, max?: number): ProgressRange {
  const maximum = max !== undefined && Number.isFinite(max) && max > 0 ? max : 100;
  const normalizedValue =
    value === undefined || !Number.isFinite(value)
      ? undefined
      : Math.min(maximum, Math.max(0, value));

  return { value: normalizedValue, max: maximum };
}

export function normalizeMeterRange(input: ComponentMeterValueProps): MeterRange {
  let minimum = input.min !== undefined && Number.isFinite(input.min) ? input.min : 0;
  let maximum =
    input.max !== undefined && Number.isFinite(input.max) && input.max > minimum
      ? input.max
      : minimum + 100;

  if (!Number.isFinite(maximum) || maximum <= minimum) {
    minimum = 0;
    maximum = 100;
  }

  const clamp = (value: number) => Math.min(maximum, Math.max(minimum, value));
  const low = clamp(input.low !== undefined && Number.isFinite(input.low) ? input.low : minimum);
  const high = Math.max(
    low,
    clamp(input.high !== undefined && Number.isFinite(input.high) ? input.high : maximum),
  );

  return {
    value: clamp(Number.isFinite(input.value) ? input.value : minimum),
    min: minimum,
    max: maximum,
    low,
    high,
    optimum: clamp(
      input.optimum !== undefined && Number.isFinite(input.optimum)
        ? input.optimum
        : minimum / 2 + maximum / 2,
    ),
  };
}
