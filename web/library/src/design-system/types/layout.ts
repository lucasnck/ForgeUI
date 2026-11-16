export type ComponentSpace =
  "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20";

export type ComponentAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type ComponentJustify = "start" | "center" | "end" | "between";

export type ComponentBreakpoint = "base" | "mobile" | "wide";

export type ComponentGridColumns = "1" | "2" | "3" | "4";

export type ComponentContainerSize = "narrow" | "wide";

export type ComponentElevation = "flat" | "raised" | "floating";

export type ComponentAspectRatio = "square" | "video" | "photo" | "portrait";

export type LayoutElement =
  | "span"
  | "div"
  | "section"
  | "article"
  | "aside"
  | "nav"
  | "header"
  | "footer"
  | "ul"
  | "ol"
  | "li"
  | "form";

export interface ComponentResponsive<Value extends string> {
  base: Value;
  mobile?: Value;
  wide?: Value;
}

export interface ComponentSpaceProps {
  gap?: ComponentSpace;
  padding?: ComponentSpace;
}

export interface ComponentAlignProps {
  align?: ComponentAlign;
}

export interface ComponentJustifyProps {
  justify?: ComponentJustify;
}
