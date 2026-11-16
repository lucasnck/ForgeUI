import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface TelephoneInputProps
  extends
    NativeSpecializedInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {}

export function TelephoneInput(props: TelephoneInputProps) {
  return <Input inputMode="tel" autoComplete="tel" {...props} type="tel" />;
}
