"use client";
import { PopupListbox, Input, Label, Stack, Inline, Button, Text } from "@forge-ui/web";
import popupStyles from "../../../../../../../web/library/src/design-system/styles/popup-components.module.css";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePopupListboxExample } from "./usePopupListboxExample";

export function PopupListboxExample() {
  const view = usePopupListboxExample();

  return (
    <Stack gap="4">
      <Stack gap="1">
        <Label htmlFor={view.id}>Label</Label>
        <div className={popupStyles.anchor}>
          <Input
            id={view.id}
            value={view.query}
            onChange={view.change}
            onFocus={view.popup.onFocus}
            onBlur={view.popup.onBlur}
            onKeyDown={view.popup.onKeyDown}
            {...view.popup.comboboxAttributes}
            aria-autocomplete="list"
            placeholder="Placeholder"
          />
          <PopupListbox
            {...view.properties}
            popup={view.popup}
            items={view.options}
            getOptionLabel={(option) => option.label}
            getOptionKey={(option) => option.value}
          />
        </div>
      </Stack>
      <Inline gap="2" align="center" justify="end">
        <Button type="button" appearance="outlined" onClick={view.clear}>
          {view.copy.clear}
        </Button>
      </Inline>
      {!view.options.length && <Text role="status">{view.copy.empty}</Text>}
      <ExampleState value={view.state} />
    </Stack>
  );
}
