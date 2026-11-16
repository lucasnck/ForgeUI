"use client";
import { Input, Select, Option, Checkbox } from "@forge-ui/web";
import type {
  PropertyEditor as Editor,
  RegisteredControl,
  ExampleStore,
} from "../ExampleScope/example-store";
interface Props {
  name: string;
  editor?: Editor;
  registered?: RegisteredControl;
  value: unknown;
  store: ExampleStore;
  scenario?: boolean;
}

function usePropertyEditor({ name, editor, registered, store, scenario }: Props) {
  function commit(value: string | boolean | number | undefined) {
    if (scenario && registered) {
      store.changeControl(registered.id, value as string | boolean);
      return;
    }

    store.edit(name, value);
  }

  function text(event: React.ChangeEvent<HTMLInputElement>) {
    commit(
      editor?.kind === "number"
        ? event.target.value === ""
          ? undefined
          : Number(event.target.value)
        : event.target.value,
    );
  }

  function select(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    commit(
      editor?.kind === "select" && value === ""
        ? undefined
        : editor?.valueType === "number"
          ? Number(value)
          : value,
    );
  }

  function toggle(event: React.ChangeEvent<HTMLInputElement>) {
    commit(event.target.checked);
  }

  return { text, select, toggle };
}

export function PropertyEditor(props: Props) {
  const { text, select, toggle } = usePropertyEditor(props);
  const kind = props.editor?.kind ?? props.registered?.kind;
  if (!kind) return <>—</>;
  const value = props.value;
  const options = props.editor?.options ?? props.registered?.options ?? [];
  if (kind === "boolean")
    return <Checkbox aria-label={props.name} checked={Boolean(value)} onChange={toggle} />;
  if (kind === "select")
    return (
      <Select
        aria-label={props.name}
        size="sm"
        fullWidth
        value={value === undefined ? "" : String(value)}
        onChange={select}
      >
        <Option value="">—</Option>
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
  return (
    <Input
      aria-label={props.name}
      size="sm"
      fullWidth
      type={
        props.name === "value" && props.store.componentName === "ColorInput"
          ? "color"
          : props.name === "value" && props.store.componentName === "TimeInput"
            ? "time"
            : props.name === "value" && props.store.componentName === "DateTimeInput"
              ? "datetime-local"
              : kind === "number"
                ? "number"
                : "text"
      }
      value={typeof value === "number" || typeof value === "string" ? value : ""}
      onChange={text}
    />
  );
}
