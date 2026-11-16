import { MaskedInput } from "../MaskedInput";
import type { MaskedInputProps } from "../MaskedInput";

export interface TaxIdInputProps extends MaskedInputProps {}

export function TaxIdInput(props: TaxIdInputProps) {
  return <MaskedInput {...props} />;
}
