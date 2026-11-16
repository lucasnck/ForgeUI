import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface NumberInputProps
  extends
    NativeSpecializedInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {}

export function NumberInput(props: NumberInputProps) {
  return <Input {...props} type="number" />;
}
