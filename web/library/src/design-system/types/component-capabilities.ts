export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ComponentTone =
  "neutral" | "brand" | "success" | "warning" | "danger" | "info" | "inverse" | "sand" | "violet" | "forest" | "sky";

export type ComponentAppearance = "solid" | "soft" | "outlined" | "bordered" | "ghost" | "none";

export type ComponentShape = "square" | "rounded" | "pill";

export type ComponentVariant = "solid" | "soft" | "ghost" | "outline";

export interface SelectorOption<Value extends string> {
  value: Value;
  label: string;
}

export interface SelectorProps<Value extends string> extends ComponentSizedProps {
  value: Value;
  options: readonly SelectorOption<Value>[];
  onValueChange: (value: Value) => void;
  label: string;
  id?: string;
  disabled?: boolean;
}

export interface ComponentSizedProps {
  size?: ComponentSize;
}

export interface ComponentToneProps {
  tone?: ComponentTone;
}

export interface ComponentAppearanceProps {
  appearance?: ComponentAppearance;
}

export interface ComponentShapeProps {
  shape?: ComponentShape;
}

export interface ComponentVariantProps {
  variant?: ComponentVariant;
}

export interface ComponentLoadingProps {
  loading?: boolean;
  loadingLabel?: string;
}

export interface ComponentFullWidthProps {
  fullWidth?: boolean;
}

export interface ComponentInvalidProps {
  invalid?: boolean;
}

export interface VisualProps
  extends ComponentSizedProps, ComponentToneProps, ComponentAppearanceProps, ComponentShapeProps {}
