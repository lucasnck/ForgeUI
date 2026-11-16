"use client";
import { Children, Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode, ReactElement } from "react";
import type {
  NativeCollectionRootProps,
  ComponentChildrenProps,
  ComponentOpenProps,
  ComponentAnimationEffectProps,
} from "../../../types";
import { DropdownMenuContext } from "../../../internal/dropdownmenu/DropdownMenuContext";
import { Menu } from "../Menu";
import type { ButtonProps } from "../../atoms/Button";
import { IconButton } from "../IconButton";
import { Button } from "../../atoms/Button";
import { useDropdownMenu } from "./useDropdownMenu";
import effects from "../../../styles/animations/surface-animations.module.css";
import styles from "./DropdownMenu.module.css";
export interface DropdownMenuProps
  extends
    NativeCollectionRootProps,
    ComponentChildrenProps,
    ComponentOpenProps,
    ComponentAnimationEffectProps {
  label: string;
  disabled?: boolean;
  trigger?: ReactElement<ButtonProps>;
}

function validateMenu(children: ReactNode, menus: ReactNode[] = []) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<{ children?: ReactNode }>(child))
      throw new Error("DropdownMenu requires a direct Menu child.");

    if (child.type === Fragment && child.key !== null) {
      validateMenu(child.props.children, menus);
      return;
    }

    if (child.type !== Menu) throw new Error("DropdownMenu requires a direct Menu child.");
    menus.push(child);
  });
  return menus;
}

function validateTriggerContent(children: ReactNode) {
  Children.forEach(children, (child) => {
    if (!isValidElement<{ children?: ReactNode; href?: string }>(child)) return;
    if (
      child.type === Button ||
      child.type === IconButton ||
      (typeof child.type === "string" &&
        (["button", "input", "select", "textarea"].includes(child.type) ||
          (child.type === "a" && child.props.href !== undefined)))
    )
      throw new Error("DropdownMenu trigger cannot contain interactive controls.");
    if (child.type === Fragment || typeof child.type === "string")
      validateTriggerContent(child.props.children);
  });
}

export function DropdownMenu(input: DropdownMenuProps) {
  const {
    props,
    children,
    className,
    label,
    animated,
    animationEffect,
    triggerRef,
    triggerProps,
    panelRef,
    panelProps,
    acceptedOpen,
    present,
    phase,
    onTransitionEnd,
    handleClick,
    handleKeyDown,
    handleBlurCapture,
    context,
    trigger,
    customTriggerProps,
  } = useDropdownMenu(input);
  if (
    trigger &&
    (!isValidElement(trigger) || (trigger.type !== Button && trigger.type !== IconButton))
  )
    throw new Error("DropdownMenu trigger must be a public Button or IconButton.");
  if (trigger) validateTriggerContent(trigger.props.children);
  if (validateMenu(children).length !== 1)
    throw new Error("DropdownMenu requires exactly one Menu.");
  return (
    <DropdownMenuContext value={context}>
      <div
        {...props}
        className={[styles.root, className].filter(Boolean).join(" ")}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onBlurCapture={handleBlurCapture}
      >
        {trigger ? (
          cloneElement(trigger, customTriggerProps)
        ) : (
          <Button {...triggerProps} ref={triggerRef} type="button" aria-haspopup="menu">
            {label}
          </Button>
        )}
        {present && (
          <div
            {...panelProps}
            ref={panelRef}
            tabIndex={-1}
            inert={!acceptedOpen || undefined}
            aria-hidden={!acceptedOpen || undefined}
            data-animated={animated}
            data-motion-state={phase}
            onTransitionEnd={onTransitionEnd}
            className={[styles.surface, effects[animationEffect]].join(" ")}
          >
            {children}
          </div>
        )}
      </div>
    </DropdownMenuContext>
  );
}
