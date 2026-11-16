import { MaskedInput } from "../MaskedInput";
import type { MaskedInputProps } from "../MaskedInput";

export interface TokenInputProps extends MaskedInputProps {}

export function TokenInput(props: TokenInputProps) {
  return <MaskedInput autoComplete="one-time-code" {...props} />;
}
