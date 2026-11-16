"use client";
import type { NativeCollectionButtonProps, VisualProps } from "../../../types";
import { Button } from "../Button";
import { useTab } from "./useTab";
import styles from "./Tab.module.css";
export interface TabProps extends NativeCollectionButtonProps, VisualProps {
  value: string;
  attached?: boolean;
}

export function Tab(input: TabProps) {
  const {
    props,
    children,
    className,
    disabled,
    tabRef,
    id,
    panelId,
    selected,
    tabIndex,
    animated,
    attached,
    handleFocus,
    handleClick,
  } = useTab(input);

  return (
    <Button
      {...props}
      shape={input.shape ?? "rounded"}
      tone={input.tone ?? "brand"}
      appearance={input.appearance ?? "ghost"}
      ref={tabRef}
      id={id}
      type="button"
      role="tab"
      disabled={disabled}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={tabIndex}
      data-selected={selected || undefined}
      data-animated={animated}
      className={[styles.root, attached && styles.attached, className].filter(Boolean).join(" ")}
      onFocus={handleFocus}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
