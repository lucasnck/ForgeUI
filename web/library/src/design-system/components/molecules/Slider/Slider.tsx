import { Input } from "../../atoms/Input";
import type { NativeRangeInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface SliderProps
  extends NativeRangeInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
  valueText?: string;
}

export function Slider({ valueText, ...props }: SliderProps) {
  return (
    <Input
      min={0}
      max={100}
      step={1}
      {...props}
      type="range"
      aria-valuetext={valueText ?? props["aria-valuetext"]}
    />
  );
}
