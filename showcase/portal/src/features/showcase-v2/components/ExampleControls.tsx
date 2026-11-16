"use client";
import { useId } from "react";
import type { ReactNode, ChangeEvent } from "react";
import { Checkbox, Input, Select, Option, Label, Stack, Inline } from "@forge-ui/web";
import { useRegisteredControl } from "./ExampleScope/useExampleScope";
import { ExampleEventState } from "./ExampleState/ExampleState";
interface ChildrenProps {
  children: ReactNode;
}
interface TextControlProps {
  label: string;
  value: string;
  onChange(value: string): void;
}
interface SelectControlProps extends TextControlProps {
  options: readonly string[];
}
interface ToggleControlProps {
  label: string;
  checked: boolean;
  onChange(value: boolean): void;
}

function useTextControl(props: TextControlProps, options?: readonly string[]) {
  const id = useId();

  function registeredChange(value: string | boolean) {
    props.onChange(String(value));
  }

  const hosted = useRegisteredControl(
    {
      label: props.label,
      value: props.value,
      kind: options ? "select" : "text",
      options,
    },
    registeredChange,
  );

  function change(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    props.onChange(event.target.value);
  }

  return { id, hosted, change };
}

function useToggleControl(props: ToggleControlProps) {
  const id = useId();

  function registeredChange(value: string | boolean) {
    props.onChange(Boolean(value));
  }

  const hosted = useRegisteredControl(
    { label: props.label, value: props.checked, kind: "boolean" },
    registeredChange,
  );

  function change(event: ChangeEvent<HTMLInputElement>) {
    props.onChange(event.target.checked);
  }

  return { id, hosted, change };
}

export function ExampleControls({ children }: ChildrenProps) {
  return <>{children}</>;
}

export function TextControl(props: TextControlProps) {
  const { id, hosted, change } = useTextControl(props);

  return hosted ? null : (
    <Stack gap="1">
      <Label htmlFor={id}>{props.label}</Label>
      <Input id={id} size="sm" value={props.value} onChange={change} />
    </Stack>
  );
}

export function SelectControl(props: SelectControlProps) {
  const { id, hosted, change } = useTextControl(props, props.options);

  return hosted ? null : (
    <Stack gap="1">
      <Label htmlFor={id}>{props.label}</Label>
      <Select id={id} size="sm" value={props.value} onChange={change}>
        {props.options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Stack>
  );
}

export function ToggleControl(props: ToggleControlProps) {
  const { id, hosted, change } = useToggleControl(props);

  return hosted ? null : (
    <Inline gap="1">
      <Checkbox id={id} checked={props.checked} onChange={change} />
      <Label htmlFor={id}>{props.label}</Label>
    </Inline>
  );
}

export function EventFeedback({ children }: ChildrenProps) {
  return <ExampleEventState>{children}</ExampleEventState>;
}
