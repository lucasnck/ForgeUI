export type PageTransitionIntent = "forward" | "back" | "replace" | "reveal";
export type SharedElementName = string;
export const pageTransitionTypes = {
  forward: "praticar-nav-forward",
  back: "praticar-nav-back",
  replace: "praticar-content-replace",
  reveal: "praticar-content-reveal",
} as const satisfies Record<PageTransitionIntent, string>;
export const pageTransitionClasses = {
  forward: "praticar-page-forward",
  back: "praticar-page-back",
  replace: "praticar-page-replace",
  reveal: "praticar-page-reveal",
  shared: "praticar-shared-element",
} as const;
