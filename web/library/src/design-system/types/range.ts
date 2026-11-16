import type { ProgressHTMLAttributes, MeterHTMLAttributes } from "react";

export interface NativeProgressProps extends Omit<
  ProgressHTMLAttributes<HTMLProgressElement>,
  "value" | "max" | "children"
> {}

export interface NativeMeterProps extends Omit<
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
