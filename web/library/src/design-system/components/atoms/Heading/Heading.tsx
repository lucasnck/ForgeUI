import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentFontWeightProps,
  ComponentHeadingLevelProps,
  ComponentTextSizeProps,
  ComponentTextToneProps,
} from "../../../types/typography";
import styles from "./Heading.module.css";

const HEADING_ELEMENTS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export interface HeadingProps
  extends
    HTMLAttributes<HTMLHeadingElement>,
    RefAttributes<HTMLHeadingElement>,
    ComponentHeadingLevelProps,
    ComponentTextSizeProps,
    ComponentFontWeightProps,
    ComponentTextToneProps {}

export function Heading({ level, size, tone, weight, className, ...props }: HeadingProps) {
  const Element = HEADING_ELEMENTS[level];

  return (
    <Element
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-heading-level={level}
      data-text-size={size}
      data-text-tone={tone}
      data-text-weight={weight}
    />
  );
}
