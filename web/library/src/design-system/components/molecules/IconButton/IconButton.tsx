import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icon";
import type { IconName } from "../../../types/icon-geometry";
import type { ReactElement } from "react";
import type {
  NativeIconButtonProps,
  ComponentAccessibleNameProps,
} from "../../../types/interactive-controls";
import type {
  VisualProps,
  ComponentLoadingProps,
  ComponentVariantProps,
} from "../../../types/component-capabilities";

export interface IconButtonProps
  extends
    NativeIconButtonProps,
    ComponentAccessibleNameProps,
    VisualProps,
    ComponentLoadingProps,
    ComponentVariantProps {
  icon: IconName;
}
import styles from "./IconButton.module.css";

export function IconButton({
  className,
  icon,
  label,
  loading = false,
  loadingLabel,
  size = "md",
  tone = "brand",
  variant = "solid",
  ...props
}: IconButtonProps): ReactElement {
  if (!label.trim()) {
    throw new Error("IconButton requires a label.");
  }

  return (
    <Button
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      size={size}
      tone={tone}
      variant={variant}
      loading={loading}
      aria-label={loading && loadingLabel?.trim() ? loadingLabel : label}
    >
      {!loading && <Icon name={icon} size="inherit" />}
    </Button>
  );
}
