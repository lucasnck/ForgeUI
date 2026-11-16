import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";

export interface UrlInputProps
  extends
    NativeSpecializedInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {}

export function UrlInput(props: UrlInputProps) {
  return <Input inputMode="url" autoComplete="url" {...props} type="url" />;
}
