"use client";
import type { HTMLAttributes } from "react";
import type {
  ODataFilterConditionData,
  ODataFilterField,
  ODataFilterLabels,
} from "../../../types/odata-filter";
import { Select } from "../../atoms/Select";
import { Button } from "../../atoms/Button";
import { ODataFilterValue } from "../ODataFilterValue";
import { useODataFilterCondition } from "./useODataFilterCondition";
import styles from "./ODataFilterCondition.module.css";
export interface ODataFilterConditionProps extends HTMLAttributes<HTMLDivElement> {
  fields: readonly ODataFilterField[];
  value: ODataFilterConditionData;
  onValueChange(value: ODataFilterConditionData): void;
  labels: ODataFilterLabels;
  simple?: boolean;
  disabled?: boolean;
  onRemove?(): void;
}

export function ODataFilterCondition(input: ODataFilterConditionProps) {
  const view = useODataFilterCondition(input);

  return (
    <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {!view.simple && (
        <div className={styles.controls}>
          <div className={styles.field}>
            <label htmlFor={view.id + "-field"}>{view.labels.field}</label>
            <Select
              id={view.id + "-field"}
              value={view.field.id}
              onChange={view.changeField}
              disabled={view.disabled}
              fullWidth
            >
              {view.fields.map((field) => (
                <option key={field.id} value={field.id} disabled={field.disabled}>
                  {field.label}
                </option>
              ))}
            </Select>
          </div>
          <div className={styles.field}>
            <label htmlFor={view.id + "-operator"}>{view.labels.operator}</label>
            <Select
              id={view.id + "-operator"}
              value={view.value.operator}
              onChange={view.changeOperator}
              disabled={view.disabled}
              fullWidth
            >
              {view.operators.map((operator) => (
                <option key={operator} value={operator}>
                  {view.labels.operatorLabels[operator]}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}
      <ODataFilterValue
        field={view.field}
        value={view.value.value}
        operator={view.value.operator}
        onValueChange={view.changeValue}
        labels={view.labels}
        label={view.field.label}
        disabled={view.disabled}
      />
      {!view.simple && view.onRemove && (
        <Button
          appearance="ghost"
          tone="neutral"
          onClick={view.remove}
          disabled={view.disabled}
          aria-label={`${view.labels.remove}: ${view.field.label}`}
        >
          {view.labels.remove}
        </Button>
      )}
    </div>
  );
}
