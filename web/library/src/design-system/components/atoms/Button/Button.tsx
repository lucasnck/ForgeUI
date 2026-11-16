import type { ComponentPropsWithRef } from "react";
import type {
  ComponentFullWidthProps,
  ComponentLoadingProps,
  ComponentVariantProps,
  VisualProps,
} from "../../../types/component-capabilities";
import styles from "./Button.module.css";
import { Spinner } from "../Spinner";

export interface ButtonProps
  extends
    ComponentPropsWithRef<"button">,
    VisualProps,
    ComponentFullWidthProps,
    ComponentLoadingProps,
    ComponentVariantProps {}

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  loading = false,
  loadingLabel,
  size = "md",
  appearance,
  shape,
  tone = "brand",
  type = "button",
  variant = "solid",
  ...props
}: ButtonProps) {
  const content = loading && loadingLabel ? loadingLabel : children;

  return (
    <button
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-appearance={appearance ?? (variant === "outline" ? "outlined" : variant)}
      data-shape={shape}
      data-full-width={fullWidth || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      type={type}
    >
      {loading && <Spinner size="xs" />}
      {content !== undefined && content !== null && content !== false && <span>{content}</span>}
    </button>
  );
}
