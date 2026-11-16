export type ComponentTextSize =
  "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";

export type ComponentTextTone = "default" | "muted" | "brand" | "danger" | "success" | "inverse";

export type ComponentFontWeight = "regular" | "medium" | "semibold" | "bold";

export type ComponentHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type TextElement = "span" | "p" | "small" | "strong";

export interface ComponentTextSizeProps {
  size?: ComponentTextSize;
}

export interface ComponentTextToneProps {
  tone?: ComponentTextTone;
}

export interface ComponentFontWeightProps {
  weight?: ComponentFontWeight;
}

export interface ComponentHeadingLevelProps {
  level: ComponentHeadingLevel;
}
