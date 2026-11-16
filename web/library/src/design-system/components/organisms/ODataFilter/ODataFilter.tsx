"use client";
import type { HTMLAttributes } from "react";
import type {
  ODataFilterExpression,
  ODataFilterField,
  ODataFilterLabels,
  ODataFilterMode,
  ODataFilterActionsLayout,
} from "../../../types/odata-filter";
import { ODataFilterCondition } from "../../molecules/ODataFilterCondition";
import { ODataFilterGroup } from "../../molecules/ODataFilterGroup";
import { Button } from "../../atoms/Button";
import { useODataFilter, useODataFilterNode } from "./useODataFilter";
import styles from "./ODataFilter.module.css";
export interface ODataFilterProps extends HTMLAttributes<HTMLDivElement> {
  mode: ODataFilterMode;
  fields: readonly ODataFilterField[];
  value: ODataFilterExpression;
  onValueChange(value: ODataFilterExpression): void;
  onApply(value: ODataFilterExpression, filter: string): void;
  onCancel?(): void;
  labels: ODataFilterLabels;
  disabled?: boolean;
  actionsLayout?: ODataFilterActionsLayout;
}
export interface ODataFilterNodeProps {
  node: ODataFilterExpression;
  fields: readonly ODataFilterField[];
  labels: ODataFilterLabels;
  disabled?: boolean;
  path: string;
  onChange(value: ODataFilterExpression): void;
  onRemove?(): void;
}

function ODataFilterNode(input: ODataFilterNodeProps) {
  const view = useODataFilterNode(input);
  if (view.node.kind === "condition")
    return (
      <ODataFilterCondition
        fields={view.fields}
        value={view.node}
        onValueChange={view.onChange}
        onRemove={view.onRemove}
        labels={view.labels}
        disabled={view.disabled}
      />
    );
  return (
    <ODataFilterGroup
      label={`${view.labels.group} ${view.path}`}
      value={view.node.operator}
      onValueChange={view.conjunction}
      onAddCondition={view.addCondition}
      onAddGroup={view.addGroup}
      onRemove={view.onRemove}
      labels={view.labels}
      disabled={view.disabled}
    >
      {view.node.children.map((node, index) => (
        <ODataFilterNode
          key={node.id}
          node={node}
          fields={view.fields}
          labels={view.labels}
          disabled={view.disabled}
          path={`${view.path}.${index + 1}`}
          onChange={view.changeChild(node.id)}
          onRemove={view.removeChild(node.id)}
        />
      ))}
    </ODataFilterGroup>
  );
}

export function ODataFilter(input: ODataFilterProps) {
  const view = useODataFilter(input);

  return (
    <div {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.unsupported ? (
        <p role="status">{view.labels.unsupported}</p>
      ) : view.mode === "simple" ? (
        <div className={styles.root}>
          {view.simpleConditions.map((condition) => (
            <ODataFilterCondition
              key={condition.fieldId}
              simple
              fields={view.fields}
              value={condition}
              onValueChange={view.changeSimple}
              labels={view.labels}
              disabled={view.disabled}
            />
          ))}
        </div>
      ) : (
        <ODataFilterNode
          node={view.value}
          fields={view.fields}
          labels={view.labels}
          disabled={view.disabled}
          path="1"
          onChange={view.change}
        />
      )}
      <p role="alert" hidden={!view.error}>
        {view.error}
      </p>
      <div className={styles.actions} data-layout={view.actionsLayout}>
        <Button
          fullWidth={view.actionsLayout === "stack"}
          tone="neutral"
          appearance="bordered"
          onClick={view.apply}
          disabled={view.disabled || view.unsupported}
        >
          {view.labels.apply}
        </Button>
        <Button
          fullWidth={view.actionsLayout === "stack"}
          tone="neutral"
          appearance="ghost"
          onClick={view.clear}
          disabled={view.disabled}
        >
          {view.labels.clear}
        </Button>
        {view.onCancel && (
          <Button
            fullWidth={view.actionsLayout === "stack"}
            appearance="ghost"
            tone="neutral"
            onClick={view.cancel}
            disabled={view.disabled}
          >
            {view.labels.cancel}
          </Button>
        )}
      </div>
    </div>
  );
}
