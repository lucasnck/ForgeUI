"use client";

import type { NativeCollectionItemProps } from "../../../types/compound-composition";
import type { StepStatus } from "../../../types/collection-contracts";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { Button } from "../../atoms/Button";
import { Badge } from "../../atoms/Badge";
import { useStepperItem } from "./useStepperItem";
import styles from "./StepperItem.module.css";

export interface StepperItemProps extends NativeCollectionItemProps, ComponentAnimatedProps {
  value: string;
  label: string;
  status?: StepStatus;
  statusLabel?: string;
  disabled?: boolean;
}

export function StepperItem(input: StepperItemProps) {
  const {
    props,
    className,
    children,
    buttonRef,
    disabled,
    animated,
    label,
    status,
    statusLabel,
    statusId,
    selected,
    id,
    panel,
    handleClick,
  } = useStepperItem(input);

  return (
    <li
      {...props}
      role={undefined}
      aria-current={undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
      onClick={handleClick}
    >
      <Button
        ref={buttonRef}
        id={id}
        aria-controls={panel}
        aria-describedby={statusId}
        disabled={disabled}
        type="button"
        aria-current={selected ? "step" : undefined}
        tone="neutral"
        appearance={selected ? "soft" : "ghost"}
        data-animated={animated}
        className={styles.action}
      >
        {label}
      </Button>
      {status !== "pending" && (
        <Badge id={statusId} tone={status === "complete" ? "success" : "danger"}>
          {statusLabel}
        </Badge>
      )}
      {children}
    </li>
  );
}
