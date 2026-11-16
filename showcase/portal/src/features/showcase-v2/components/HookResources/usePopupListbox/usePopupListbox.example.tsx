"use client";
import { Button, Input, Label, Inline, Stack, Text, PopupListboxItem } from "@forge-ui/web";
import popupStyles from "../../../../../../../../web/library/src/design-system/styles/popup-components.module.css";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import { usePopupListboxResourceExample } from "./usePopupListboxResourceExample";

export function UsePopupListboxExample() {
  const {
    id,
    query,
    change,
    options,
    popup,
    accepted,
    copy,
    clear,
    disabled,
    setDisabled,
    readOnly,
    setReadOnly,
  } = usePopupListboxResourceExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={disabled} onChange={setDisabled} />
        <ToggleControl label="readOnly" checked={readOnly} onChange={setReadOnly} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={id}>Label</Label>
        <div className={popupStyles.anchor}>
          <Input
            id={id}
            value={query}
            onChange={change}
            onFocus={popup.onFocus}
            onBlur={popup.onBlur}
            onKeyDown={popup.onKeyDown}
            {...popup.comboboxAttributes}
            aria-autocomplete="list"
            placeholder="Placeholder"
            disabled={disabled}
            readOnly={readOnly}
          />
          {popup.isOpen && (
            <ul {...popup.listboxAttributes} aria-label="Label" className={popupStyles.popup}>
              {options.map((item, index) => (
                <PopupListboxItem key={item.value} popup={popup} index={index} label={item.label} />
              ))}
            </ul>
          )}
        </div>
      </Stack>
      <Inline gap="2">
        <Button variant="outline" onClick={clear}>
          {copy.clear}
        </Button>
        <Text>{copy.disabled}: Label 3</Text>
      </Inline>
      {!options.length && <Text>{copy.empty}</Text>}
      <ResourceState
        value={{
          query,
          accepted,
          isOpen: popup.isOpen,
          activeIndex: popup.activeIndex,
        }}
      />
    </Stack>
  );
}
