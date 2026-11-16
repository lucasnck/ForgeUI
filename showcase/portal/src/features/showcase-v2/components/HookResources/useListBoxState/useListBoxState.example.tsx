"use client";
import { Button, Inline, Stack, Text } from "@forge-ui/web";
import { ExampleControls, TextControl, SelectControl, ToggleControl } from "../../ExampleControls";
import { FocusItem } from "../../ResourceExamples/FocusItem";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useListBoxStateResourceExample } from "./useListBoxStateResourceExample";

export function UseListBoxStateExample() {
  const {
    query,
    setQuery,
    mode,
    changeMode,
    acceptChanges,
    setAcceptChanges,
    options,
    state,
    requested,
    fallbackRef,
    copy,
    clear,
  } = useListBoxStateResourceExample();

  return (
    <Stack gap="2">
      <ExampleControls>
        <TextControl label="query" value={query} onChange={setQuery} />
        <SelectControl
          label="selectionMode"
          value={mode}
          onChange={changeMode}
          options={["single", "multiple"]}
        />
        <ToggleControl label="acceptChanges" checked={acceptChanges} onChange={setAcceptChanges} />
      </ExampleControls>
      <ul
        ref={fallbackRef}
        role="listbox"
        aria-label="Label"
        aria-multiselectable={mode === "multiple"}
        tabIndex={-1}
        className={styles.items}
      >
        {options.map((item) => (
          <FocusItem
            key={item.value}
            id={item.value}
            label={item.label}
            disabled={item.disabled}
            selected={state.isSelected(item.value)}
            role="option"
            focus={state.focus}
            onSelect={state.select}
            onKey={state.onOptionKeyDown}
          />
        ))}
      </ul>
      {!options.length && <Text>{copy.empty}</Text>}
      <Inline gap="2">
        <Button variant="outline" onClick={clear}>
          {copy.resetSelection}
        </Button>
      </Inline>
      <ResourceState
        value={{
          selected: state.selected,
          requested,
          activeId: state.focus.activeId,
        }}
      />
    </Stack>
  );
}
