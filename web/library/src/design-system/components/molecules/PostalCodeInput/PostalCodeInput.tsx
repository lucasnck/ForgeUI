import { MaskedInput } from "../MaskedInput";
import type { MaskedInputProps } from "../MaskedInput";

export interface PostalCodeInputProps extends MaskedInputProps {}

export function PostalCodeInput(props: PostalCodeInputProps) {
  return <MaskedInput autoComplete="postal-code" {...props} />;
}
