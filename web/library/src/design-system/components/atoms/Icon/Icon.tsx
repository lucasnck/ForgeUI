import type { ReactElement, SVGProps } from "react";
import type { ComponentIconSize } from "../../../types/icon";
import type { IconName } from "../../../types/icon-geometry";
import { iconData } from "../../../helpers/icon-data.generated";
import styles from "./Icon.module.css";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: ComponentIconSize;
  label?: string;
}

export function Icon({ name, size, label, className, ...props }: IconProps): ReactElement {
  const geometry = iconData[name];
  const presentation =
    geometry.drawing === "stroke"
      ? {
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
        }
      : { fill: "currentColor" };

  return (
    <svg
      {...props}
      {...presentation}
      viewBox={geometry.viewBox}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-icon-size={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {geometry.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
