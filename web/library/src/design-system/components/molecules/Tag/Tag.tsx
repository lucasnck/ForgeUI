import { IconButton } from "../IconButton";
import type { HTMLAttributes, ReactElement } from "react";
import type { VisualProps, ComponentFullWidthProps } from "../../../types/component-capabilities";

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>, VisualProps, ComponentFullWidthProps {
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
}
import styles from "./Tag.module.css";

export function Tag({
  children,
  className,
  onRemove,
  removeLabel,
  disabled = false,
  size = "md",
  tone = "neutral",
  appearance = "soft",
  shape,
  fullWidth = false,
  ...props
}: TagProps): ReactElement {
  if (onRemove && !removeLabel?.trim()) {
    throw new Error("A removable Tag requires removeLabel.");
  }

  return (
    <span
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
      data-full-width={fullWidth || undefined}
    >
      <span className={styles.content}>{children}</span>
      {onRemove && (
        <IconButton
          icon="close"
          label={removeLabel!}
          size="xs"
          appearance="ghost"
          disabled={disabled}
          onClick={onRemove}
        />
      )}
    </span>
  );
}
