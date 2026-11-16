"use client";

import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import type { NativeCollectionItemProps } from "../../../types/compound-composition";
import type { ComponentAnimatedProps } from "../../../types/animation";
import type { ComponentOpenProps } from "../../../types/selection-navigation";
import { Link } from "../../atoms/Link";
import { Button } from "../../atoms/Button";
import { NavigationMenuSublist } from "../../atoms/NavigationMenuSublist";
import { NavigationItemContext } from "../../../internal/navigationmenu/NavigationItemContext";
import { useNavigationMenuItem } from "./useNavigationMenuItem";
import { useNavigationMenuGroup } from "./useNavigationMenuGroup";
import styles from "./NavigationMenuItem.module.css";

export interface NavigationMenuItemProps
  extends NativeCollectionItemProps, ComponentAnimatedProps, ComponentOpenProps {
  label: string;
  href?: string;
  current?: boolean;
}

function collectSublist(children: ReactNode): ReactElement | undefined {
  let sublist: ReactElement | undefined;
  Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;

    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === Fragment &&
      child.key !== null
    ) {
      const nested = collectSublist(child.props.children);

      if (nested) {
        if (sublist) throw new Error("NavigationMenuItem accepts exactly one Sublist.");
        sublist = nested;
      }

      return;
    }

    if (!isValidElement(child) || child.type !== NavigationMenuSublist || sublist)
      throw new Error("NavigationMenuItem group accepts exactly one NavigationMenuSublist.");
    sublist = child;
  });
  return sublist;
}

function NavigationMenuGroup(input: NavigationMenuItemProps) {
  const {
    props,
    context,
    open,
    triggerProps,
    triggerRef,
    bodyProps,
    bodyRef,
    phase,
    onTransitionEnd,
    handleClick,
  } = useNavigationMenuGroup(input);
  const { label, children, className, animated, ...nativeProps } = props;

  return (
    <NavigationItemContext value={context}>
      <li
        {...nativeProps}
        role={undefined}
        aria-current={undefined}
        className={[styles.root, className].filter(Boolean).join(" ")}
        onClick={handleClick}
      >
        <Button
          {...triggerProps}
          ref={triggerRef}
          type="button"
          tone="neutral"
          appearance="ghost"
          className={styles.trigger}
        >
          {label}
        </Button>
        <div
          {...bodyProps}
          ref={bodyRef}
          hidden={phase === "unmounted"}
          inert={!open || undefined}
          aria-hidden={!open || undefined}
          className={styles.panel}
          data-motion-state={phase}
          data-animated={animated}
          onTransitionEnd={onTransitionEnd}
        >
          <div className={styles.clip}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </li>
    </NavigationItemContext>
  );
}

export function NavigationMenuItem(input: NavigationMenuItemProps) {
  const {
    label,
    href,
    current,
    animated,
    open,
    defaultOpen,
    onOpenChange,
    children,
    className,
    props,
  } = useNavigationMenuItem(input);
  const sublist = collectSublist(children);

  if (sublist) {
    if (href !== undefined || current)
      throw new Error("NavigationMenuItem groups have no href or current page state.");
    return (
      <NavigationMenuGroup
        {...props}
        label={label}
        animated={animated}
        className={className}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {sublist}
      </NavigationMenuGroup>
    );
  }

  if (open !== undefined || defaultOpen !== undefined || onOpenChange !== undefined)
    throw new Error("NavigationMenuItem open state applies only to groups.");
  if (!href?.trim()) throw new Error("NavigationMenuItem leaves require a nonempty href.");
  return (
    <li
      {...props}
      role={undefined}
      aria-current={undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      <Link href={href} aria-current={current ? "page" : undefined}>
        {label}
      </Link>
    </li>
  );
}
