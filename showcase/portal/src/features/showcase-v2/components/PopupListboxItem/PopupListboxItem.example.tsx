"use client";
import { PopupListboxItem, Input, Label, Stack, Inline, Button, Text } from "@forge-ui/web";
import popupStyles from "../../../../../../../web/library/src/design-system/styles/popup-components.module.css";
import { ExampleState } from "../ExampleState/ExampleState";
import { usePopupListboxItemExample } from "./usePopupListboxItemExample";

export function PopupListboxItemExample() {
  const view = usePopupListboxItemExample();

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
          {view.popup.isOpen && (
            <ul
              {...view.popup.listboxAttributes}
              aria-label="ListboxLabel"
              className={popupStyles.popup}
            >
              {view.options.map((option, index) => (
                <PopupListboxItem
                  key={option.value}
                  popup={view.popup}
                  index={index}
                  animated={view.properties.animated ?? true}
                  title={(view.properties.title ?? "Title") + " " + option.value.split("-").at(-1)}
                  label={option.label}
                />
              ))}
            </ul>
          )}
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
