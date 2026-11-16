export interface IconGeometry {
  readonly name: string;
  readonly viewBox: string;
  readonly drawing: "stroke" | "filled";
  readonly paths: readonly string[];
}

export type IconName = keyof typeof import("../helpers/icon-data.generated").iconData;
