import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface DateTimeInputProps
  extends
    NativeSpecializedInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {}

export function DateTimeInput(props: DateTimeInputProps) {
  return <Input {...props} type="datetime-local" />;
}
