"use client";
import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import type { ButtonProps } from "../../atoms/Button";
import { IconButton } from "../IconButton";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
  ComponentOpenProps,
  ComponentAnimationEffectProps,
} from "../../../types";
import { PopoverContext } from "../../../internal/popover/PopoverContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { PopoverHeader } from "../../atoms/PopoverHeader";
import { PopoverBody } from "../../atoms/PopoverBody";
import { PopoverFooter } from "../../atoms/PopoverFooter";
import { Button } from "../../atoms/Button";
import { usePopover } from "./usePopover";
import effects from "../../../styles/animations/surface-animations.module.css";
import styles from "./Popover.module.css";
export interface PopoverProps
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentOpenProps,
    ComponentAnimationEffectProps {
  triggerLabel: string;
  label: string;
  trigger?: ReactElement<ButtonProps>;
}

export function Popover(input: PopoverProps) {
  const {
    props,
    children,
    className,
    context,
    trigger,
    triggerLabel,
    label,
    animated,
    animationEffect,
    triggerRef,
    triggerProps,
    customTriggerProps,
    panelRef,
    panelProps,
    acceptedOpen,
    present,
    phase,
    onTransitionEnd,
    handleClick,
    handleBlurCapture,
  } = usePopover(input);
  if (
    trigger &&
    (!isValidElement(trigger) || (trigger.type !== Button && trigger.type !== IconButton))
  )
    throw new Error("Popover trigger must be a public Button or IconButton.");
  const parts = collectCompoundParts(children, {
    header: PopoverHeader,
    body: PopoverBody,
    footer: PopoverFooter,
  });

  return (
    <PopoverContext value={context}>
      <div
        {...props}
        className={[styles.root, className].filter(Boolean).join(" ")}
        onClick={handleClick}
        onBlurCapture={handleBlurCapture}
      >
        {trigger ? (
          cloneElement(trigger, customTriggerProps)
        ) : (
          <Button {...triggerProps} ref={triggerRef} type="button" aria-haspopup="dialog">
            {triggerLabel}
          </Button>
        )}
        {present && (
          <div
            {...panelProps}
            ref={panelRef}
            hidden={false}
            role="dialog"
            aria-label={label}
            tabIndex={-1}
            inert={!acceptedOpen || undefined}
            aria-hidden={!acceptedOpen || undefined}
            data-animated={animated}
            data-motion-state={phase}
            onTransitionEnd={onTransitionEnd}
            className={[styles.surface, effects[animationEffect]].join(" ")}
          >
            {parts.header}
            {parts.body}
            {parts.footer}
          </div>
        )}
      </div>
    </PopoverContext>
  );
}
