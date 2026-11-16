"use client";
import type { FieldsetHTMLAttributes } from "react";
import type { ODataFilterConjunction, ODataFilterLabels } from "../../../types/odata-filter";
import { Select } from "../../atoms/Select";
import { Button } from "../../atoms/Button";
import { useODataFilterGroup } from "./useODataFilterGroup";
import styles from "./ODataFilterGroup.module.css";
export interface ODataFilterGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  value: ODataFilterConjunction;
  onValueChange(value: ODataFilterConjunction): void;
  labels: ODataFilterLabels;
  label: string;
  onAddCondition?(): void;
  onAddGroup?(): void;
  onRemove?(): void;
}

export function ODataFilterGroup(input: ODataFilterGroupProps) {
  const view = useODataFilterGroup(input);

  return (
    <fieldset
      {...view.props}
      disabled={view.disabled}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      <legend>{view.label}</legend>
      <div className={styles.field}>
        <label htmlFor={view.id}>{view.labels.operator}</label>
        <Select id={view.id} value={view.value} onChange={view.change} disabled={view.disabled}>
          <option value="and">{view.labels.and}</option>
          <option value="or">{view.labels.or}</option>
        </Select>
      </div>
      {view.children}
      <div className={styles.controls}>
        {view.onAddCondition && (
          <Button
            tone="neutral"
            appearance="ghost"
            onClick={view.addCondition}
            disabled={view.disabled}
          >
            {view.labels.addCondition}
          </Button>
        )}
        {view.onAddGroup && (
          <Button
            tone="neutral"
            appearance="ghost"
            onClick={view.addGroup}
            disabled={view.disabled}
          >
            {view.labels.addGroup}
          </Button>
        )}
        {view.onRemove && (
          <Button
            appearance="ghost"
            tone="neutral"
            onClick={view.remove}
            disabled={view.disabled}
            aria-label={`${view.labels.remove}: ${view.label}`}
          >
            {view.labels.remove}
          </Button>
        )}
      </div>
    </fieldset>
  );
}
