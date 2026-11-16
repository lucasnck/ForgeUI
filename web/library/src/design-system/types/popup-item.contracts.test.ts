import type { NativePopupListboxItemProps } from "./popup";
const option: NativePopupListboxItemProps = {
  id: "option",
  onClick(event) {
    const element: HTMLLIElement = event.currentTarget;
    void element;
  },
};
void option;
// @ts-expect-error Popup listbox item content is owned by its required plain label.
type UnsupportedChildren = NativePopupListboxItemProps["children"];
void (null as unknown as UnsupportedChildren);
