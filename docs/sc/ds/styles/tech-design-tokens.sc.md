---
title: "Design Tokens and Visual Foundations"
scope: "Semantic tokens, shared capability interfaces and component CSS recipes"
status: "PENDING"
type: "style"
ds-level: "none"
---

# Design Tokens and Visual Foundations



## Files

```text
design-system/styles/tokens.css (M)
design-system/styles/globals.css (M)
design-system/styles/appearance-components.module.css (M)
design-system/styles/interactive-components.module.css (M)
design-system/styles/sized-components.module.css (M)
design-system/styles/toned-components.module.css (M)
design-system/styles/field-control.module.css (M)
features/showcase-v2/components/TokenResource/definition.ts (C)
features/showcase-v2/components/TokenResource/TokenResource.example.tsx (C)
features/showcase-v2/components/TokenResource/useTokenResourceExample.ts (C)
features/showcase-v2/components/TokenResource/token-samples.ts (C)
features/showcase-v2/components/TokenResource/TokenResource.module.css (C)
../scripts/check-theme.cjs (M)
```

## Dependencies

- [Theming](../../tech-theming.sc.md)
- [Brand identity](../../tech-brand-identity.sc.md)
- [Motion recipes](animations/tech-motion-recipes.sc.md)
- [Component capabilities](../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import styles from "@forge-ui/web/styles/appearance-components.module.css";
<div className={styles.appearance}/>;
```


## Styles

Praticar's normal light and dark themes use darker neutral surfaces and recessed border hierarchy. The light override is scoped to `:root:not([data-theme])` and `:root[data-theme="light"]`; dark remains under its existing selector. Contrast and liquid-glass retain their own palettes, and the four brand identity constants stay unchanged. Effective surface overrides are:

| Theme | Page | Default | Subtle / Raised | Default border | Subtle border |
| --- | --- | --- | --- | --- | --- |
| Light | `#d2d8e1` | `#e7ebf1` | `#d9dfe8` / `#f0f3f7` | `#758294` | `#b3bdca` |
| Dark | `#080e16` | `#141d28` | `#1b2734` / `#1b2734` | `#060c14` | `#0d1620` |

Normal dark borders are intentionally darker than their adjacent surfaces. Text/action contrast and the separate keyboard focus ring retain their numerical check coverage; targeted browser acceptance remains required; contrast and glass retain their control-boundary contrast requirements. The generic field recipe continues supplying the same default bordered Input/Select surface. Sidebar composition uses `--layout-span-full`, `--layout-sidebar-navigation-column` and `--layout-sidebar-content-column` for grid-line placement without numeric literals outside this token owner.

```css
:root {
  --opacity-full: 1;
  --switch-track-opacity: var(--opacity-pulse);
  --switch-state-layer-spread: var(--length-1);
  --switch-track-width-xs: var(--length-5);
  --switch-track-height-xs: var(--length-2);
  --switch-thumb-size-xs: var(--length-3);
  --switch-track-width-sm: var(--length-5);
  --switch-track-height-sm: var(--length-2);
  --switch-thumb-size-sm: var(--length-3);
  --switch-track-width-md: var(--length-6);
  --switch-track-height-md: var(--length-2);
  --switch-thumb-size-md: var(--length-3);
  --switch-track-width-lg: var(--length-7);
  --switch-track-height-lg: var(--length-3);
  --switch-thumb-size-lg: var(--length-4);
  --switch-track-width-xl: var(--length-8);
  --switch-track-height-xl: var(--length-3);
  --switch-thumb-size-xl: var(--length-4);
  color-scheme: light;
  --color-brand-primary: #2d66ee;
  --color-brand-deep: #212d6b;
  --color-brand-night: #161e47;
  --color-brand-gray: #d9d9d9;
  --font-family-brand: "DM Sans", "Segoe UI", Arial, sans-serif;
  --color-surface-page: var(--color-brand-gray);
  --color-surface-default: #ffffff;
  --color-surface-subtle: #efeee8;
  --color-surface-raised: #ffffff;
  --color-surface-inverse: #182a29;
  --color-text-default: var(--color-brand-night);
  --color-text-muted: #53635e;
  --color-text-inverse: #ffffff;
  --color-text-brand: var(--color-brand-deep);
  --color-border-default: #84928b;
  --color-border-subtle: #dce2dc;
  --color-focus-ring: var(--color-brand-primary);
  --color-action-brand-background: var(--color-brand-primary);
  --color-action-brand-foreground: var(--color-action-foreground);
  --color-action-neutral-background: #394b43;
  --color-action-danger-background: #a12c35;
  --color-action-success-background: #236144;
  --color-action-warning-background: #795300;
  --color-action-info-background: #285c82;
  --color-action-sky-background: #246c9f;
  --color-action-forest-background: #287a63;
  --color-action-violet-background: #7656b8;
  --color-action-sand-background: #d6c3a5;
  --color-action-sand-foreground: var(--color-brand-night);
  --color-text-sand: #705531;
  --color-text-violet: #624397;
  --color-text-forest: #1e624e;
  --color-text-sky: #205a82;
  --color-action-foreground: #ffffff;
  --color-text-danger: #a12c35;
  --color-text-success: #236144;
  --color-surface-accent: #e8efe5;
  --color-surface-sand: #f3ede4;
  --surface-background: var(--color-surface-default);
  --surface-backdrop-filter: none;
  --page-background: var(--color-surface-page);
  --font-family-sans: var(--font-family-brand);
  --font-family-display: var(--font-family-brand);
  --font-size-xs: calc(var(--base-unit) * 1.5);
  --font-size-sm: calc(var(--base-unit) * 1.75);
  --font-size-md: calc(var(--base-unit) * 2);
  --font-size-lg: calc(var(--base-unit) * 2.25);
  --font-size-xl: calc(var(--base-unit) * 2.5);
  --font-size-2xl: calc(var(--base-unit) * 3);
  --font-size-3xl: calc(var(--base-unit) * 4);
  --font-size-4xl: calc(var(--base-unit) * 5);
  --font-size-5xl: calc(var(--base-unit) * 6);
  --line-height-normal: 1.5;
  --space-0: var(--zero);
  --space-1: var(--length-1);
  --space-2: var(--length-2);
  --space-3: var(--length-3);
  --space-4: var(--length-4);
  --space-5: var(--length-5);
  --space-6: var(--length-6);
  --space-8: var(--length-8);
  --space-10: var(--length-10);
  --space-12: var(--length-12);
  --space-16: var(--length-16);
  --space-20: var(--length-20);
  --radius-none: var(--zero);
  --radius-xs: var(--length-1);
  --radius-sm: var(--length-1);
  --radius-md: var(--length-2);
  --radius-lg: var(--length-2);
  --radius-xl: var(--length-3);
  --radius-full: 9999px;
  --shadow-raised: 0 4px 24px rgb(24 42 41 / 4%);
  --shadow-floating: 0 16px 48px rgb(24 42 41 / 10%);
  --motion-fast: 140ms;
  --motion-normal: 220ms;
  --motion-opacity-hidden: 0;
  --motion-opacity-visible: var(--opacity-full);
  --motion-scale-enter: 0.98;
  --motion-scale-rest: 1;
  --motion-grid-collapsed: 0fr;
  --motion-grid-expanded: 1fr;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --base-unit: 0.5rem;
  --zero: 0;
  --size-full: 100%;
  --size-half: 50%;
  --size-viewport: 100dvh;
  --size-viewport-inline: 100dvw;
  --size-visually-hidden: 1px;
  --color-transparent: transparent;
  --color-current: currentColor;
  --color-system-button-text: ButtonText;
  --color-system-field-text: FieldText;
  --color-system-highlight: Highlight;
  --color-system-canvas-text: CanvasText;
  --border-width-thin: 1px;
  --border-width-thick: 2px;
  --border-width-focus: 3px;
  --border-style-default: solid;
  --opacity-disabled: 0.65;
  --opacity-decorative: 0.16;
  --opacity-pulse: 0.4;
  --filter-hover: brightness(0.92);
  --motion-spin-duration: 800ms;
  --motion-pulse-duration: 1000ms;
  --ease-linear: linear;
  --ease-pulse: ease-in-out;
  --rotation-full: 360deg;
  --rotation-decorative: -9deg;
  --translation-center: -50%;
  --z-index-popup: 10;
  --z-index-skip-link: 20;
  --shape-radius: var(--radius-md);
  --icon-stroke-width: 2;
  --icon-stroke-width-thin: 1.5;
  --icon-align-offset: -0.125em;
  --icon-size-inherit: 1em;
  --font-family-mono: monospace;
  --radius-circle: 50%;
  --layout-column: minmax(var(--zero), 1fr);
  --layout-sidebar-columns: calc(var(--base-unit) * 30) minmax(var(--zero), 1fr);
  --layout-hero-columns: 1.55fr 1fr;
  --layout-component-columns: 1.15fr 1fr;
  --layout-form-columns: 1.35fr 1fr;
  --layout-metrics-columns: repeat(3, 1fr) 1.8fr;
  --layout-three-columns: repeat(3, minmax(var(--zero), 1fr));
  --layout-four-columns: repeat(4, minmax(var(--zero), 1fr));
  --layout-two-columns: repeat(2, minmax(var(--zero), 1fr));
  --layout-span-all: 1 / -1;
  --layout-container-narrow: var(--length-96);
  --layout-container-wide: var(--length-138);
  --layout-container-padding: var(--space-4);
  --layout-container-padding-wide: var(--space-6);
  --aspect-square: 1 / 1;
  --aspect-video: 16 / 9;
  --aspect-photo: 4 / 3;
  --aspect-portrait: 3 / 4;
  --font-size-hero-fluid: clamp(
    var(--font-size-4xl),
    4vw,
    var(--font-size-6xl)
  );
  --font-size-value-fluid: clamp(
    var(--font-size-xs),
    1.4vw,
    var(--font-size-lg)
  );
  --length-1: calc(var(--base-unit) * 1);
  --length-2: calc(var(--base-unit) * 2);
  --length-3: calc(var(--base-unit) * 3);
  --length-4: calc(var(--base-unit) * 4);
  --length-5: calc(var(--base-unit) * 5);
  --length-6: calc(var(--base-unit) * 6);
  --length-8: calc(var(--base-unit) * 8);
  --length-10: calc(var(--base-unit) * 10);
  --length-12: calc(var(--base-unit) * 12);
  --length-16: calc(var(--base-unit) * 16);
  --length-20: calc(var(--base-unit) * 20);
  --font-size-6xl: calc(var(--base-unit) * 7);
  --font-size-7xl: calc(var(--base-unit) * 8);
  --line-height-tight: 1;
  --line-height-display: 1.1;
  --line-height-heading: 1.2;
  --line-height-compact: 1.3;
  --line-height-text: 1.6;
  --line-height-relaxed: 1.8;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --letter-spacing-tight: -0.0625rem;
  --letter-spacing-display: -0.125rem;
  --letter-spacing-wide: 0.1rem;
  --letter-spacing-normal: 0;
  --underline-offset: 0.2em;
  --component-height-xs: var(--length-4);
  --component-padding-block-xs: var(--zero);
  --component-padding-inline-xs: var(--length-2);
  --component-height-sm: var(--length-5);
  --component-padding-block-sm: var(--length-1);
  --component-padding-inline-sm: var(--length-2);
  --component-height-md: var(--length-6);
  --component-padding-block-md: var(--length-1);
  --component-padding-inline-md: var(--length-3);
  --length-7: calc(var(--base-unit) * 7);
  --component-height-lg: var(--length-7);
  --component-padding-block-lg: var(--length-1);
  --component-padding-inline-lg: var(--length-3);
  --component-height-xl: var(--length-8);
  --component-padding-block-xl: var(--length-2);
  --component-padding-inline-xl: var(--length-3);
  --length-96: calc(var(--base-unit) * 96);
  --breakpoint-mobile: var(--length-96);
  --length-138: calc(var(--base-unit) * 138);
  --breakpoint-wide: var(--length-138);
  --length-18: calc(var(--base-unit) * 18);
  --length-170: calc(var(--base-unit) * 170);
  --length-40: calc(var(--base-unit) * 40);
  --length-93: calc(var(--base-unit) * 93);
  --length-148: calc(var(--base-unit) * 148);
  --length-39: calc(var(--base-unit) * 39);
  --length-13: calc(var(--base-unit) * 13);
  --length-71: calc(var(--base-unit) * 71);
  --length-58: calc(var(--base-unit) * 58);
  --length-29: calc(var(--base-unit) * 29);
  --length-32: calc(var(--base-unit) * 32);
  --length-28: calc(var(--base-unit) * 28);
  --length-8-negative: calc(var(--base-unit) * -8);
  --length-6-negative: calc(var(--base-unit) * -6);
  --length-21: calc(var(--base-unit) * 21);
  --length-22: calc(var(--base-unit) * 22);
  --size-fraction-60: 60%;
  --length-88: calc(var(--base-unit) * 88);
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --color-surface-page: #0d121a;
  --color-surface-default: #19232f;
  --color-surface-subtle: #202c3a;
  --color-surface-raised: #202c3a;
  --color-surface-inverse: #f3f6f7;
  --color-text-default: #f3f6f7;
  --color-text-muted: #b3c2cf;
  --color-text-inverse: #11241f;
  --color-text-brand: var(--color-text-default);
  --color-border-default: #0b141e;
  --color-border-subtle: #121c28;
  --color-focus-ring: var(--color-text-default);
  --color-action-brand-background: var(--color-brand-primary);
  --color-action-brand-foreground: var(--color-text-default);
  --color-action-neutral-background: #c2d1db;
  --color-action-danger-background: #ffb1b7;
  --color-action-success-background: #a7dcc0;
  --color-action-warning-background: #f5d494;
  --color-action-info-background: #a9cfff;
  --color-action-sky-background: #81bde6;
  --color-action-forest-background: #83c8b0;
  --color-action-violet-background: #b9a3e9;
  --color-action-sand-background: #a58d70;
  --color-action-sand-foreground: var(--color-action-foreground);
  --color-text-sand: #d6c3a5;
  --color-text-violet: var(--color-action-violet-background);
  --color-text-forest: var(--color-action-forest-background);
  --color-text-sky: var(--color-action-sky-background);
  --color-action-foreground: #11241f;
  --color-text-danger: #ffb1b7;
  --color-text-success: #a7dcc0;
  --color-surface-accent: #193132;
  --color-surface-sand: #342f29;
  --shadow-raised: 0 4px 24px rgb(0 0 0 / 12%);
  --shadow-floating: 0 16px 48px rgb(0 0 0 / 25%);
}
:root[data-theme="contrast"] {
  color-scheme: dark;
  --color-surface-page: #000000;
  --color-surface-default: #000000;
  --color-surface-subtle: #141414;
  --color-surface-raised: #000000;
  --color-surface-inverse: #ffffff;
  --color-text-default: #ffffff;
  --color-text-muted: #eeeeee;
  --color-text-inverse: #000000;
  --color-text-brand: #ffec54;
  --color-border-default: #ffffff;
  --color-border-subtle: #bdbdbd;
  --color-focus-ring: #ffec54;
  --color-action-brand-background: #ffec54;
  --color-action-neutral-background: #eeeeee;
  --color-action-danger-background: #ffb8c0;
  --color-action-success-background: #b8ffcd;
  --color-action-warning-background: #ffec54;
  --color-action-info-background: #b5d8ff;
  --color-action-sky-background: #eeeeee;
  --color-action-forest-background: #eeeeee;
  --color-action-violet-background: #eeeeee;
  --color-action-sand-background: #eeeeee;
  --color-text-sand: var(--color-action-sand-background);
  --color-text-violet: var(--color-action-violet-background);
  --color-text-forest: var(--color-action-forest-background);
  --color-text-sky: var(--color-action-sky-background);
  --color-action-foreground: #000000;
  --color-text-danger: #ffb8c0;
  --color-text-success: #b8ffcd;
  --color-surface-accent: #141414;
  --color-surface-sand: #141414;
  --shadow-raised: 0 0 0 1px #ffffff;
  --shadow-floating: 0 0 0 2px #ffffff;
}
:root[data-theme="liquid-glass"] {
  --color-surface-page: var(--color-brand-gray);
  --color-surface-default: #f9fcfa;
  --color-surface-subtle: #e9f0ec;
  --color-surface-raised: #ffffff;
  --color-text-default: var(--color-brand-night);
  --color-text-muted: #435a50;
  --color-border-default: #72887b;
  --color-border-subtle: #c5d7cc;
  --page-background: radial-gradient(ellipse at 12% 10%, #d8eadd, transparent 55%),
    radial-gradient(ellipse at 90% 60%, #d4e1ee, transparent 55%), var(--color-brand-gray);
  --shadow-raised: 0 8px 32px rgb(30 63 44 / 6%);
  --shadow-floating: 0 24px 56px rgb(30 63 44 / 12%);
}
@supports (backdrop-filter: blur(16px)) {
  :root[data-theme="liquid-glass"] {
    --surface-background: rgb(249 252 250 / 88%);
    --surface-backdrop-filter: blur(16px);
  }
}
@media (prefers-reduced-transparency: reduce) {
  :root[data-theme="liquid-glass"] {
    --surface-background: var(--color-surface-default);
    --surface-backdrop-filter: none;
  }
}
@media (forced-colors: active) {
  :root,
  :root[data-theme] {
    --color-surface-page: Canvas;
    --color-surface-default: Canvas;
    --color-surface-subtle: Canvas;
    --color-surface-raised: Canvas;
    --color-surface-inverse: Canvas;
    --color-surface-sand: Canvas;
    --color-text-default: CanvasText;
    --color-text-muted: CanvasText;
    --color-text-brand: LinkText;
    --color-text-inverse: CanvasText;
    --color-border-default: ButtonText;
    --color-border-subtle: ButtonText;
    --color-focus-ring: Highlight;
    --color-action-brand-background: ButtonFace;
    --color-action-brand-foreground: ButtonText;
    --color-action-neutral-background: ButtonFace;
    --color-action-danger-background: ButtonFace;
    --color-action-success-background: ButtonFace;
    --color-action-warning-background: ButtonFace;
    --color-action-info-background: ButtonFace;
    --color-action-sky-background: ButtonFace;
    --color-action-forest-background: ButtonFace;
    --color-action-violet-background: ButtonFace;
    --color-action-sand-background: ButtonFace;
    --color-action-sand-foreground: ButtonText;
    --color-text-sand: ButtonText;
    --color-text-violet: ButtonText;
    --color-text-forest: ButtonText;
    --color-text-sky: ButtonText;
    --color-action-foreground: ButtonText;
    --surface-background: Canvas;
    --surface-backdrop-filter: none;
    --page-background: Canvas;
    --shadow-raised: none;
    --shadow-floating: none;
  }
}
[data-shape="square"] {
  --shape-radius: var(--zero);
}
[data-shape="rounded"] {
  --shape-radius: var(--radius-md);
}
[data-shape="pill"] {
  --shape-radius: var(--radius-full);
}
```

```css
@import "./tokens.css";
* {
  box-sizing: border-box;
}
html {
  min-width: var(--length-40);
  background: var(--color-surface-page);
}
body {
  margin: var(--zero);
  background: var(--page-background);
  color: var(--color-text-default);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
}
button,
input,
select,
textarea {
  font: inherit;
}
button,
a,
input,
select,
textarea {
  -webkit-tap-highlight-color: var(--color-transparent);
}
button {
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
}
a {
  color: var(--color-text-brand);
  text-underline-offset: var(--underline-offset);
}
img,
svg {
  max-width: var(--size-full);
}
:focus-visible {
  outline: var(--border-width-focus) var(--border-style-default)
    var(--color-focus-ring);
  outline-offset: var(--length-1);
}
::selection {
  background: var(--color-action-brand-background);
  color: var(--color-action-foreground);
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

```css
.appearance {
  background: var(--control-appearance-background, var(--control-background));
  color: var(--control-appearance-foreground, var(--control-foreground));
  border: var(--border-width-thin) var(--border-style-default)
    var(
      --control-system-border,
      var(
        --control-state-border,
        var(--control-appearance-border, var(--control-border, var(--color-transparent)))
      )
    );
}
.appearance[data-appearance="solid"] {
  --control-appearance-background: var(--control-solid-background, var(--control-background));
  --control-appearance-foreground: var(--control-solid-foreground, var(--control-foreground));
}
.appearance[data-appearance="soft"] {
  --control-appearance-background: var(--control-soft-background, var(--color-surface-subtle));
  --control-appearance-foreground: var(--control-accent-foreground, var(--color-text-default));
}
.appearance[data-appearance="outlined"],
.appearance[data-appearance="bordered"] {
  --control-appearance-background: var(--color-surface-default);
  --control-appearance-foreground: var(--control-accent-foreground, var(--color-text-default));
  --control-appearance-border: var(--control-accent-border, var(--color-border-default));
}
.appearance[data-appearance="ghost"],
.appearance[data-appearance="none"] {
  --control-appearance-background: var(--color-transparent);
  --control-appearance-foreground: var(--control-accent-foreground, var(--color-text-default));
  --control-appearance-border: var(--color-transparent);
}
```

```css
.interactive:focus-visible {
  outline: var(--border-width-focus) var(--border-style-default)
    var(--color-focus-ring);
  outline-offset: var(--control-focus-offset, var(--length-1));
}
.interactive:disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}
@media (forced-colors: active) {
  .interactive {
    --control-system-border: var(
      --control-forced-border,
      var(--color-system-field-text)
    );
  }
  .interactive:focus-visible {
    outline-color: var(--color-system-highlight);
  }
}
```

```css
.sized {
  --control-size-height: var(--component-height-md);
  --control-size-font: var(--font-size-md);
  --control-size-padding-block: var(--component-padding-block-md);
  --control-size-padding-inline: var(--component-padding-inline-md);
  min-block-size: var(--control-size-height);
  font-size: var(--control-size-font);
  padding: var(--control-size-padding-block) var(--control-size-padding-inline);
}
.sized[data-size="xs"] {
  --control-size-height: var(--component-height-xs);
  --control-size-font: var(--font-size-xs);
  --control-size-padding-block: var(--component-padding-block-xs);
  --control-size-padding-inline: var(--component-padding-inline-xs);
}
.sized[data-size="sm"] {
  --control-size-height: var(--component-height-sm);
  --control-size-font: var(--font-size-sm);
  --control-size-padding-block: var(--component-padding-block-sm);
  --control-size-padding-inline: var(--component-padding-inline-sm);
}
.sized[data-size="lg"] {
  --control-size-height: var(--component-height-lg);
  --control-size-font: var(--font-size-lg);
  --control-size-padding-block: var(--component-padding-block-lg);
  --control-size-padding-inline: var(--component-padding-inline-lg);
}
.sized[data-size="xl"] {
  --control-size-height: var(--component-height-xl);
  --control-size-font: var(--font-size-xl);
  --control-size-padding-block: var(--component-padding-block-xl);
  --control-size-padding-inline: var(--component-padding-inline-xl);
}
```

```css
.action {
  --control-background: var(--color-action-brand-background);
  --control-foreground: var(--color-action-foreground);
  --control-soft-background: var(--color-surface-subtle);
  --control-accent-foreground: var(--color-text-default);
  --control-accent-border: var(--color-border-default);
}
.action:not([data-tone]),
.action[data-tone="brand"] {
  --control-foreground: var(--color-action-brand-foreground);
}
.action[data-tone="neutral"] {
  --control-background: var(--color-action-neutral-background);
}
.action[data-tone="danger"] {
  --control-background: var(--color-action-danger-background);
}
.action[data-tone="success"] {
  --control-background: var(--color-action-success-background);
}
.action[data-tone="warning"] {
  --control-background: var(--color-action-warning-background);
}
.action[data-tone="info"] {
  --control-background: var(--color-action-info-background);
}
.action[data-tone="sand"] {
  --control-background: var(--color-action-sand-background);
  --control-foreground: var(--color-action-sand-foreground);
  --control-soft-background: var(--color-surface-sand);
  --control-accent-foreground: var(--color-text-sand);
  --control-accent-border: var(--color-text-sand);
}
.action[data-tone="violet"] {
  --control-background: var(--color-action-violet-background);
  --control-accent-foreground: var(--color-text-violet);
  --control-accent-border: var(--color-text-violet);
}
.action[data-tone="forest"] {
  --control-background: var(--color-action-forest-background);
  --control-accent-foreground: var(--color-text-forest);
  --control-accent-border: var(--color-text-forest);
}
.action[data-tone="sky"] {
  --control-background: var(--color-action-sky-background);
  --control-accent-foreground: var(--color-text-sky);
  --control-accent-border: var(--color-text-sky);
}
.action[data-tone="inverse"] {
  --control-background: var(--color-surface-inverse);
  --control-foreground: var(--color-text-inverse);
}
.field {
  --control-solid-foreground: var(--color-action-foreground);
}
.field[data-tone="neutral"] {
  --control-solid-background: var(--color-action-neutral-background);
}
.field[data-tone="brand"] {
  --control-solid-background: var(--color-action-brand-background);
  --control-solid-foreground: var(--color-action-brand-foreground);
}
.field[data-tone="danger"] {
  --control-state-border: var(--color-text-danger);
  --control-solid-background: var(--color-action-danger-background);
}
.field[data-tone="success"] {
  --control-state-border: var(--color-text-success);
  --control-solid-background: var(--color-action-success-background);
}
.field[data-tone="warning"] {
  --control-solid-background: var(--color-action-warning-background);
}
.field[data-tone="info"] {
  --control-solid-background: var(--color-action-info-background);
}
.field[data-tone="sand"] {
  --control-solid-background: var(--color-action-sand-background);
  --control-solid-foreground: var(--color-action-sand-foreground);
}
.field[data-tone="violet"] {
  --control-solid-background: var(--color-action-violet-background);
}
.field[data-tone="forest"] {
  --control-solid-background: var(--color-action-forest-background);
}
.field[data-tone="sky"] {
  --control-solid-background: var(--color-action-sky-background);
}
.field[data-tone="inverse"] {
  --control-solid-background: var(--color-surface-inverse);
  --control-solid-foreground: var(--color-text-inverse);
}
```

```css
.control {
  composes: fullWidth from "./full-width-components.module.css";
  composes: sized from "./sized-components.module.css";
  composes: shaped from "./shaped-components.module.css";
  composes: interactive from "./interactive-components.module.css";
  composes: field from "./toned-components.module.css";
  composes: appearance from "./appearance-components.module.css";
  --control-background: var(--color-surface-default);
  --control-foreground: var(--color-text-default);
  --control-border: var(--color-border-default);
  display: block;
  inline-size: fit-content;
  max-inline-size: var(--size-full);
  min-inline-size: var(--zero);
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
}
.control[aria-invalid="true"] {
  --control-state-border: var(--color-text-danger);
}
.control[data-appearance="solid"][aria-invalid="true"] {
  --control-appearance-background: var(--color-action-danger-background);
  --control-appearance-foreground: var(--color-action-foreground);
}
```

## Animations

```text
stateColor
stateOpacity
stateFeedback
surfacePresence
disclosurePresence
clip
```

## Tests

- Every active custom-property reference resolves to a canonical token in each theme.
- Spacing and component heights retain the documented base-unit scale; invalid numeric/color literals fail the token check.
- Forced colors and unsupported glass effects retain readable semantic fallbacks.
- `node scripts/check-theme.cjs` resolves every base `:root` block before applying theme-specific overrides, checks text/action/focus contrast in all themes, the dark recessed-border hierarchy and unchanged light/contrast/glass control-border contrast. Its focused native Input/Select SSR verifies matching bordered defaults and explicit solid opt-in.

## Criteria

- [x] Native scrollbars consume `--scrollbar-size`, `--scrollbar-radius`, `--color-scrollbar-track`, `--color-scrollbar-thumb` and `--color-scrollbar-thumb-hover`. Values alias shared length/radius/semantic color tokens. [Scrollbar recipe](tech-scrollbars.sc.md) owns selectors and forced-colors fallback.


- [x] Given no data-size override, the shared recipe selects md tokens; xs/sm/md/lg/xl minimum heights derive from 4/5/6/7/8 base units.
- [x] Given a visual consumer, numeric/color declarations and fallback values reference canonical tokens; shared recipes own visual selectors.
- [x] Given an invalid field, its state border takes precedence over appearance; forced-color system border takes precedence over both.
- [x] Given light/dark/contrast/liquid-glass, overrides preserve the semantic token vocabulary.
- [x] Given reduced motion/transparency or missing backdrop support, CSS supplies the corresponding motion/opaque-surface fallback.
- [x] Exclude preference persistence, API/session behavior and restoration of archived helpers under src/old/.
- [x] The --base-unit contract uses 0.5rem; 8px at the default 16px root.
- [x] The --length-N / --space-N contract uses Integer base-unit multiples; spacing aliases length tokens.
- [x] The --component-height-xs/sm/md/lg/xl contract uses 4/5/6/7/8 base units; md default; minimum heights.
- [x] The --font-size-* contract uses Separate typography scale; fractional multipliers allowed.
- [x] The --border-width-thin/thick/focus contract uses 1px/2px/3px inside tokens only.
- [x] The --opacity-disabled/decorative/pulse contract uses 0.65/0.16/0.4 inside tokens only.
- [x] The --control-system-border contract uses Forced-colors border overrides state and appearance.
- [x] The --control-state-border contract uses Invalid state overrides appearance and tone border.
- [x] The --control-solid-background / --control-solid-foreground contract uses Tone fill pair consumed by `[data-appearance="solid"]`; mapped per tone in toned-components.module.css; unset consumers fall back to `--control-background`/`--control-foreground`.
- [x] The --icon-stroke-width / --icon-stroke-width-thin contract uses 2 / 1.5; icon stroke weight applied by icon-components.module.css, CSS overriding the asset presentation.
- [x] The --icon-align-offset / --icon-size-inherit contract uses -0.125em / 1em; optical baseline alignment and the `inherit` icon size ([Icon capability](tech-icon.sc.md)).
- [x] The --layout-container-narrow / --layout-container-wide contract uses 768px / 1104px, aliased to `--length-96` / `--length-138`; Container maximum width ([Layout contracts](tech-layout.sc.md)).
- [x] The --layout-container-padding / --layout-container-padding-wide contract uses `--space-4` base / `--space-6` from the mobile breakpoint; page padding.
- [x] The --aspect-square / --aspect-video / --aspect-photo / --aspect-portrait contract uses 1/1, 16/9, 4/3, 3/4; ratio values live here because a ratio literal is a numeric value.
- [x] The --z-index-popup contract uses 10; below --z-index-skip-link (20); owns popup layering.

- [x] --color-checkable-brand-background aliases --color-action-brand-background in light/contrast/liquid-glass; dark derives 92% --color-brand-primary with 8% --color-text-default in tokens.css, keeping the brand palette constants unchanged and meeting 3:1 on the standard dark surface.

- [x] The V2 design-tokens resource defines Token specimens with 21 selected samples: eight semantic color/surface tokens, six spacing tokens, five font-size tokens and two shadow tokens. This selection does not imply exhaustive token coverage.
- [x] Each specimen applies its actual public CSS variable and shows its exact token name plus the computed sample value; spacing bars remain proportional and typography/shadows render real text/surfaces rather than textual placeholders.
- [x] The colocated view hook measures sample styles after hydration and theme updates, uses deterministic SSR placeholders and cancels its scheduled frame on unmount/reset. No second source of token values is introduced.
- [x] The Contract distinguishes color, spacing, typography and shadow families. Its copyable example is CSS consuming semantic variables; the two-section resource page omits Usage/resources and Related examples, and the gallery remains within the narrow viewport.

- [x] The dark theme uses a darker page/default/subtle/raised surface scale while preserving the light, contrast and liquid-glass overrides.
- [x] The normal dark border tokens are darker than their adjoining control/panel surfaces rather than the previous light blue-gray; semantic border consumption remains centralized.
- [ ] Explicit focus, invalid-state and forced-colors boundaries remain visible, and the target dark contrast/accessibility check is observed in browser.
- [ ] Touched CSS is formatted with repository Prettier and passes token, theme and DS checks; keep the scope limited to this theme change.

- [x] The complete CSS tokens provide four additional non-status action tones (`sand`, `violet`, `forest`, `sky`) with light, dark, contrast and forced-colors values and a subtle sand surface; existing brand/status tokens remain unchanged.
- [x] Shared action and field recipes consume the new tone variables without per-component hardcoded colors, and the canonical `ComponentTone` includes those values.
- [ ] CRUD templates identify one primary action per decision group. Secondary and tertiary actions use neutral/subtle presentation by default; decorative color tones do not imply priority or authorization. Verify visual hierarchy and WCAG contrast in browsers.

- [x] Publish one canonical usage matrix for CRUD consumers: primary `brand/solid`; Edit `sand/bordered`; Back/Cancel `neutral/ghost`; Reload/Filter/Retry `neutral/bordered` (or `neutral/ghost` when visually tertiary); destructive confirmation `danger/solid`. Keep these mappings as composition guidance, not implicit component logic.
- [ ] Validate the sand foreground/background/border pairing and the `violet`/`forest`/`sky` supporting accents in light, dark, contrast and forced-colors themes with real rendered controls. A tone is not a permission, status or action-priority signal by itself.
- [ ] Verify the agreed darker dark page/surface/border scale, shared Input and Select background equality, visible focus outlines and invalid-state boundaries at narrow viewport and keyboard focus. Preserve original four brand identity constants and the existing alternative theme palettes.
- [ ] Token changes must be centralized in `design-system/styles/tokens.css`; shared recipes reuse variables and `ComponentTone`. No page-local hex literals, new dependency or duplicate palette; run formatting, design-system/type contracts and production build before acceptance.
