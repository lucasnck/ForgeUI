import type { ShowcaseV2Property } from "../../model/showcase-v2.types";
export interface RegisteredControl {
  id: string;
  label: string;
  kind: "text" | "select" | "boolean";
  value: string | boolean;
  options?: readonly string[];
}
export interface PropertyEditor {
  kind: "text" | "number" | "boolean" | "select";
  options?: readonly string[];
  defaultValue?: string | boolean | number;
  valueType?: "number";
  binding?: "registered";
  indexed?: boolean;
}
export interface PropertySchema {
  readonly [name: string]: PropertyEditor;
}
export type PropertyEditors<Props> = {
  [Key in keyof Props]?: Omit<PropertyEditor, "options" | "defaultValue"> & {
    options?: readonly `${Extract<NonNullable<Props[Key]>, string | number>}`[];
    defaultValue?: Extract<Props[Key], string | number | boolean>;
  };
};

export function createExampleStore(
  componentName: string,
  schema: PropertySchema,
  properties: readonly ShowcaseV2Property[],
) {
  const listeners = new Set<() => void>();
  const handlers = new Map<string, (value: string | boolean) => void>();
  let controls: readonly RegisteredControl[] = [];
  let overrides: Readonly<Record<string, unknown>> = {};
  let baselines: Readonly<Record<string, unknown>> = {};
  let snapshot = { controls, overrides, baselines };
  const serverSnapshot = snapshot;
  const serverOverrides = overrides;

  function emit() {
    snapshot = { controls, overrides, baselines };
    listeners.forEach((fn) => fn());
  }

  function setProperty(name: string, value: unknown) {
    if (!schema[name]) return;
    if (value === undefined && properties.find((p) => p.name === name)?.required) return;
    if (
      typeof value === "string" &&
      !value.trim() &&
      ["name", "title"].includes(name) &&
      properties.some((property) => property.name === name && property.required)
    )
      return;
    if (
      typeof value === "string" &&
      !["children", "title", "placeholder", "src"].includes(name) &&
      (["label", "removeLabel", "loadingLabel", "clearLabel", "href"].includes(name) ||
        (name === "name" &&
          properties.some((property) => property.name === name && property.required))) &&
      !value.trim()
    )
      return;
    overrides = { ...overrides, [name]: value };
    emit();
  }

  return {
    componentName,
    schema,
    properties,
    subscribe(fn: () => void) {
      listeners.add(fn);

      return () => {
        listeners.delete(fn);
      };
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    getOverrides: () => overrides,
    getServerOverrides: () => serverOverrides,
    register(control: RegisteredControl, onChange: (value: string | boolean) => void) {
      handlers.set(control.id, onChange);
      const previous = controls.find((c) => c.id === control.id);
      if (previous && JSON.stringify(previous) === JSON.stringify(control)) return;
      controls = [...controls.filter((c) => c.id !== control.id), control];
      emit();
    },
    unregister(id: string) {
      handlers.delete(id);

      if (controls.some((c) => c.id === id)) {
        controls = controls.filter((c) => c.id !== id);
        emit();
      }
    },
    changeControl(id: string, value: string | boolean) {
      handlers.get(id)?.(value);
    },
    setProperty,
    edit(name: string, value: unknown) {
      const control = controls.find((c) => c.label === name);
      if (control)
        handlers.get(control.id)?.(
          control.kind === "boolean" ? Boolean(value) : value === undefined ? "" : String(value),
        );
      if (schema[name]?.binding !== "registered") setProperty(name, value);
    },
    setBaselines(values: Readonly<Record<string, unknown>>) {
      const next = { ...baselines, ...values };
      if (Object.keys(next).every((key) => Object.is(next[key], baselines[key]))) return;
      baselines = next;
      emit();
    },
    clear() {
      handlers.clear();
      controls = [];
      overrides = {};
      baselines = {};
      emit();
    },
    sync(name: string, value: unknown) {
      if (Object.hasOwn(overrides, name)) setProperty(name, value);
    },
  };
}

export type ExampleStore = ReturnType<typeof createExampleStore>;
