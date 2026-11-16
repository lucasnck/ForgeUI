import { Input } from "../../atoms/Input";
import type { InputProps } from "../../atoms/Input";

export interface InputBaseProps extends InputProps {}

export function InputBase(props: InputBaseProps) {
  return <Input {...props} />;
}
