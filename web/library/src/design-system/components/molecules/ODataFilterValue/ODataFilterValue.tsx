"use client";
import type {
  ODataFilterField,
  ODataFilterValueData,
  ODataFilterLabels,
  ODataFilterOperator,
} from "../../../types/odata-filter";
import { MASK_DATE_YMD } from "../../../helpers/mask";
import { Input } from "../../atoms/Input";
import { Select } from "../../atoms/Select";
import { NumberInput } from "../NumberInput";
import { DateInput } from "../DateInput";
import { TimeInput } from "../TimeInput";
import { DateTimeInput } from "../DateTimeInput";
import { SearchInput } from "../SearchInput";
import { RadioGroup } from "../RadioGroup";
import { RadioGroupItem } from "../RadioGroupItem";
import { CheckboxGroup } from "../CheckboxGroup";
import { CheckboxGroupItem } from "../CheckboxGroupItem";
import { ChoiceGroupBody } from "../../atoms/ChoiceGroupBody";
import { Combobox } from "../Combobox";
import { ComboboxBody } from "../ComboboxBody";
import { useODataFilterValue } from "./useODataFilterValue";
import styles from "./ODataFilterValue.module.css";
import type { ComponentInvalidProps } from "../../../types/component-capabilities";
export interface ODataFilterValueProps extends ComponentInvalidProps {
  field: ODataFilterField;
  value: ODataFilterValueData;
  onValueChange(value: ODataFilterValueData): void;
  label: string;
  labels: ODataFilterLabels;
  operator?: ODataFilterOperator;
  disabled?: boolean;
}

export function ODataFilterValue(props: ODataFilterValueProps) {
  const view = useODataFilterValue(props);
  const { field, value, label, labels, operator, invalid } = props;
  const control = {
    disabled: view.disabled,
    invalid,
    placeholder: field.placeholder,
    fullWidth: true,
  };
  if (field.kind === "boolean")
    return (
      <RadioGroup
        name={view.id}
        legend={label}
        value={value === null ? "all" : String(value)}
        onValueChange={view.onBooleanChange}
        disabled={view.disabled}
      >
        <ChoiceGroupBody>
          {[
            ["all", labels.all],
            ["true", labels.yes],
            ["false", labels.no],
          ].map(([key, text]) => (
            <RadioGroupItem key={key} value={key} label={text} />
          ))}
        </ChoiceGroupBody>
      </RadioGroup>
    );
  if (field.kind === "multiChoice")
    return (
      <CheckboxGroup
        name={view.id}
        legend={label}
        value={Array.isArray(value) ? (value as readonly string[]) : []}
        onValueChange={view.onMultipleChange}
        disabled={view.disabled}
      >
        <ChoiceGroupBody>
          {field.options.map((option) => (
            <CheckboxGroupItem key={option.value} {...option} />
          ))}
        </ChoiceGroupBody>
      </CheckboxGroup>
    );
  if (field.kind === "choice" && field.editor === "radio")
    return (
      <RadioGroup
        name={view.id}
        legend={label}
        value={typeof value === "string" ? value : ""}
        onValueChange={view.onChoiceChange}
        disabled={view.disabled}
      >
        <ChoiceGroupBody>
          <RadioGroupItem value="" label={labels.all} />
          {field.options.map((option) => (
            <RadioGroupItem key={option.value} {...option} />
          ))}
        </ChoiceGroupBody>
      </RadioGroup>
    );
  if (field.kind === "choice" && field.editor === "combobox")
    return (
      <div className={styles.field}>
        <label htmlFor={view.id}>{label}</label>
        <Combobox
          {...control}
          id={view.id}
          aria-label={label}
          listboxLabel={label}
          options={field.options.filter(
            (option) =>
              !view.query ||
              option.label.toLocaleLowerCase().includes(view.query.toLocaleLowerCase()),
          )}
          query={
            view.query ??
            (typeof value === "string"
              ? (field.options.find((option) => option.value === value)?.label ?? "")
              : "")
          }
          onQueryChange={view.setQuery}
          selectedValue={typeof value === "string" ? value : null}
          onSelectionChange={view.onSelectionChange}
        >
          <ComboboxBody />
        </Combobox>
      </div>
    );
  if (field.kind === "choice")
    return (
      <div className={styles.field}>
        <label htmlFor={view.id}>{label}</label>
        <Select
          {...control}
          id={view.id}
          value={typeof value === "string" ? value : ""}
          onChange={view.onChange}
        >
          <option value="">{labels.all}</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    );

  if (field.kind === "date") {
    if (operator === "between")
      return (
        <div className={styles.controls}>
          <div className={styles.field}>
            <label htmlFor={view.id + "-min"}>
              {label} — {labels.minimum}
            </label>
            <DateInput
              {...control}
              id={view.id + "-min"}
              mask={MASK_DATE_YMD}
              placeholder="YYYY-MM-DD"
              value={Array.isArray(value) ? String(value[0] ?? "").replaceAll("-", "") : ""}
              onValueChange={view.onDateMinimumChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={view.id + "-max"}>
              {label} — {labels.maximum}
            </label>
            <DateInput
              {...control}
              id={view.id + "-max"}
              mask={MASK_DATE_YMD}
              placeholder="YYYY-MM-DD"
              value={Array.isArray(value) ? String(value[1] ?? "").replaceAll("-", "") : ""}
              onValueChange={view.onDateMaximumChange}
            />
          </div>
        </div>
      );
    return (
      <div className={styles.field}>
        <label htmlFor={view.id}>{label}</label>
        <DateInput
          {...control}
          id={view.id}
          mask={MASK_DATE_YMD}
          placeholder="YYYY-MM-DD"
          value={typeof value === "string" ? value.replaceAll("-", "") : ""}
          onValueChange={view.onDateChange}
        />
      </div>
    );
  }

  const Control =
    field.kind === "number"
      ? NumberInput
      : field.kind === "time"
        ? TimeInput
        : field.kind === "datetime"
          ? DateTimeInput
          : field.kind === "text" && field.editor === "search"
            ? SearchInput
            : Input;
  const exactProps =
    field.kind === "guid" || field.kind === "decimal"
      ? {
          inputMode: field.kind === "decimal" ? ("decimal" as const) : ("text" as const),
          autoCapitalize: "none",
          spellCheck: false,
        }
      : {};
  if (operator === "between")
    return (
      <div className={styles.controls}>
        <div className={styles.field}>
          <label htmlFor={view.id + "-min"}>
            {label} — {labels.minimum}
          </label>
          <Control
            {...control}
            {...exactProps}
            id={view.id + "-min"}
            value={Array.isArray(value) ? (value[0] ?? "") : ""}
            onChange={view.onMinimumChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={view.id + "-max"}>
            {label} — {labels.maximum}
          </label>
          <Control
            {...control}
            {...exactProps}
            id={view.id + "-max"}
            value={Array.isArray(value) ? (value[1] ?? "") : ""}
            onChange={view.onMaximumChange}
          />
        </div>
      </div>
    );
  return (
    <div className={styles.field}>
      <label htmlFor={view.id}>{label}</label>
      <Control
        {...control}
        {...exactProps}
        id={view.id}
        value={typeof value === "string" || typeof value === "number" ? value : ""}
        onChange={view.onChange}
      />
    </div>
  );
}
