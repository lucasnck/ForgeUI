import { MaskedInput } from "../MaskedInput";
import type { MaskedInputProps } from "../MaskedInput";

export interface DateInputProps extends MaskedInputProps {}

export function DateInput(props: DateInputProps) {
  return <MaskedInput {...props} />;
}
