import type { InputProps } from "../../components/atoms/Input";
import type { ChoiceOption } from "../../types/selection-navigation";
import type { ComponentPopupProps, PopupListboxContract } from "../../types/popup";

export interface QueryInputContextValue extends ComponentPopupProps {
  inputId: string;
  footerId: string;
  inputProps: InputProps;
  enabledOptions: readonly ChoiceOption[];
  popup: PopupListboxContract;
}
