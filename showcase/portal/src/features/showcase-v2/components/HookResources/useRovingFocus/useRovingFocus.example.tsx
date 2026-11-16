"use client";
import { useLayoutEffect, useRef } from "react";
import { Button, Inline, Stack } from "@forge-ui/web";
import type { RovingFocusContract } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import { useRovingFocusResourceExample } from "./useRovingFocusResourceExample";
interface ItemProps {
  focus: RovingFocusContract;
  id: string;
  disabled: boolean;
  activate(id: string): void;
}

function useFocusButton({ focus, id, disabled, activate }: ItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { registerItem } = focus;
  useLayoutEffect(
    () => registerItem({ id, ref, textValue: `Label ${id.slice(-1)}`, disabled }),
    [registerItem, id, disabled],
  );

  function onFocus() {
    focus.onItemFocus(id);
  }

  function click() {
    activate(id);
  }

  return { ref, onFocus, click };
}

function FocusButton(props: ItemProps) {
  const view = useFocusButton(props);
  const { ref: viewRef, onFocus: viewOnFocus, click: viewClick } = view;

  return (
    <Button
      ref={viewRef}
      onFocus={viewOnFocus}
      onClick={viewClick}
      tabIndex={props.focus.tabIndex(props.id)}
      disabled={props.disabled}
    >
      Label {props.id.slice(-1)}
    </Button>
  );
}

export function UseRovingFocusExample() {
  const view = useRovingFocusResourceExample();
  const {
    orientation: viewOrientation,
    changeOrientation: viewChangeOrientation,
    direction: viewDirection,
    changeDirection: viewChangeDirection,
    loop: viewLoop,
    setLoop: viewSetLoop,
    disableThird: viewDisableThird,
    setDisableThird: viewSetDisableThird,
    fallbackRef: viewFallbackRef,
    key: viewKey,
    ids: viewIds,
    focus: viewFocus,
    setActivated: viewSetActivated,
    remove: viewRemove,
    copy: viewCopy,
    activated: viewActivated,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="orientation"
          value={viewOrientation}
          onChange={viewChangeOrientation}
          options={["horizontal", "vertical"]}
        />
        <SelectControl
          label="direction"
          value={viewDirection}
          onChange={viewChangeDirection}
          options={["ltr", "rtl"]}
        />
        <ToggleControl label="loop" checked={viewLoop} onChange={viewSetLoop} />
        <ToggleControl
          label="disabled (Label 3)"
          checked={viewDisableThird}
          onChange={viewSetDisableThird}
        />
      </ExampleControls>
      <div
        ref={viewFallbackRef}
        role="toolbar"
        aria-label="Label"
        aria-orientation={viewOrientation}
        tabIndex={-1}
        dir={viewDirection}
        onKeyDown={viewKey}
      >
        <Inline gap="2">
          {viewIds.map((id) => (
            <FocusButton
              key={id}
              focus={viewFocus}
              id={id}
              disabled={viewDisableThird && id === "item-3"}
              activate={viewSetActivated}
            />
          ))}
        </Inline>
      </div>
      <div>
        <Button variant="outline" onClick={viewRemove} disabled={!viewFocus.activeId}>
          {viewCopy.remove}
        </Button>
      </div>
      <ResourceState
        value={{
          activeId: viewFocus.activeId,
          activated: viewActivated,
          ids: viewIds,
        }}
      />
    </Stack>
  );
}
