"use client";

import type { ComponentPropsWithRef } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
} from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { collectStepperChildren } from "../../../internal/stepper/collectStepperChildren";
import { StepperContext } from "../../../internal/stepper/StepperContext";
import { StepperHeader } from "../../atoms/StepperHeader";
import { StepperBody } from "../../atoms/StepperBody";
import { StepperFooter } from "../../atoms/StepperFooter";
import { StepperPanel } from "../../atoms/StepperPanel";
import { StepperItem } from "../../molecules/StepperItem";
import type { StepperItemProps } from "../../molecules/StepperItem";
import type { StepperPanelProps } from "../../atoms/StepperPanel";
import { useStepper } from "./useStepper";
import styles from "./Stepper.module.css";

export interface StepperProps extends NativeCollectionRootProps, ComponentChildrenProps {
  label: string;
  value: string;
  onStepChange(value: string): void;
}

export function Stepper(input: StepperProps) {
  const { context, props, children, className } = useStepper(input);
  if (!input.label.trim()) throw new Error("Stepper requires a nonempty navigation name.");
  const parts = collectCompoundParts(children, {
    header: StepperHeader,
    body: StepperBody,
    footer: StepperFooter,
  });
  const header = parts.header!.props as ComponentPropsWithRef<"nav">;
  const body = parts.body!.props as ComponentPropsWithRef<"div">;
  const items = collectStepperChildren<StepperItemProps>(
    header.children,
    StepperItem,
    "StepperHeader",
  );
  const panels = collectStepperChildren<StepperPanelProps>(
    body.children,
    StepperPanel,
    "StepperBody",
  );
  const keys = items.map((item) => item.props.value);
  const panelKeys = panels.map((panel) => panel.props.value);
  if (!keys.length || keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length)
    throw new Error("Stepper item values must be nonempty and unique.");
  if (
    panelKeys.some((key) => !key.trim()) ||
    new Set(panelKeys).size !== panelKeys.length ||
    keys.length !== panelKeys.length ||
    keys.some((key) => !panelKeys.includes(key))
  )
    throw new Error("Each StepperItem must have exactly one matching StepperPanel.");
  if (!keys.includes(input.value)) throw new Error("Unknown controlled Stepper value.");
  return (
    <StepperContext value={context}>
      <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">
        {parts.header}
        {parts.body}
        {parts.footer}
      </div>
    </StepperContext>
  );
}
