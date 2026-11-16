export const tokenGroups = [
  {
    title: "Colors and surfaces",
    kind: "color",
    property: "background-color",
    tokens: [
      "--color-surface-default",
      "--color-surface-subtle",
      "--color-surface-raised",
      "--color-text-default",
      "--color-text-muted",
      "--color-text-brand",
      "--color-action-brand-background",
      "--color-focus-ring",
    ],
  },
  {
    title: "Spacing",
    kind: "space",
    property: "width",
    tokens: ["--space-1", "--space-2", "--space-3", "--space-4", "--space-6", "--space-8"],
  },
  {
    title: "Typography",
    kind: "typography",
    property: "font-size",
    tokens: [
      "--font-size-sm",
      "--font-size-md",
      "--font-size-lg",
      "--font-size-xl",
      "--font-size-2xl",
    ],
  },
  {
    title: "Shadows",
    kind: "shadow",
    property: "box-shadow",
    tokens: ["--shadow-raised", "--shadow-floating"],
  },
] as const;
