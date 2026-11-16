import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface TimeInputProps
  extends
    NativeSpecializedInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {}

export function TimeInput(props: TimeInputProps) {
  return <Input {...props} type="time" />;
}
