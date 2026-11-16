import { InputGroup } from "../InputGroup";
import { InputAddon } from "../InputAddon";
import { NumberInput } from "../NumberInput";
import type { NumberInputProps } from "../NumberInput";

export interface PercentageInputProps extends NumberInputProps {}

export function PercentageInput({ fullWidth = true, ...props }: PercentageInputProps) {
  return (
    <InputGroup fullWidth={fullWidth} trailing={<InputAddon aria-hidden="true">%</InputAddon>}>
      <NumberInput min={0} max={100} step={1} {...props} fullWidth={fullWidth} />
    </InputGroup>
  );
}
