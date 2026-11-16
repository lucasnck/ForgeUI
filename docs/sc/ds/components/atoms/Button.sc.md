---
title: "Button"
scope: "Native action button with shared visual capabilities and loading feedback"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Button

## Files

```text
features/showcase-v2/components/Button/usage-code.ts (M)
features/showcase-v2/components/Button/definition.ts (M)
features/showcase-v2/components/Button/Button.example.tsx (M)
features/showcase-v2/components/Button/useButtonExample.ts (M)
design-system/index.ts (M)
design-system/components/atoms/Button/Button.tsx (M)
design-system/components/atoms/Button/Button.module.css (M)
design-system/components/atoms/Button/index.ts (M)
features/showcase/examples/Button.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Shape contracts](../../styles/tech-shape.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { Button } from "@forge-ui/web";
<Button type="submit" loading={isSubmitting} loadingLabel={savingLabel} fullWidth>
 {saveLabel}
</Button>;
```

## Styles

```css
.root {
  composes: stateFeedback from "../../../styles/motion-components.module.css";
}
```

## Animations

```text
stateFeedback
```

## Content

```tsx
import type { ComponentPropsWithRef } from "react";
import type {
  ComponentFullWidthProps,
  ComponentLoadingProps,
  ComponentVariantProps,
  VisualProps,
} from "../../../types/component-capabilities";
import styles from "./Button.module.css";
import { Spinner } from "../Spinner";

export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    VisualProps,
    ComponentFullWidthProps,
    ComponentLoadingProps,
    ComponentVariantProps {}

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  loading = false,
  loadingLabel,
  size = "md",
  appearance,
  shape,
  tone = "brand",
  type = "button",
  variant = "solid",
  ...props
}: ButtonProps) {
  const content = loading && loadingLabel ? loadingLabel : children;
  return (
    <button
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-appearance={
        appearance ?? (variant === "outline" ? "outlined" : variant)
      }
      data-shape={shape}
      data-full-width={fullWidth || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      type={type}
    >
      {loading && <Spinner size="xs" />}
      {content !== undefined && content !== null && content !== false && (
        <span>{content}</span>
      )}
    </button>
  );
}
```

## Criteria

- [x] Given loading=true, the native button is disabled, aria-busy is true and the spinner is aria-hidden.
- [x] Given loading=true and loadingLabel, the label replaces children; without loadingLabel, children remain visible.
- [x] Given variant=outline without appearance, data-appearance is outlined; explicit appearance overrides variant.
- [x] Given omitted visual props, size=md, tone=brand and variant=solid apply; an omitted `shape` renders no `data-shape` attribute, so the document shape resolves and defaults to rounded.
- [x] Given fullWidth=true, the button uses the shared full-width token; reduced motion disables spinner animation.
- [x] Given `shape="square"`, `"rounded"` or `"pill"`, the button renders that `data-shape` value and the shared recipe resolves the corresponding radius.
- [x] Caller owns actions, localized text and application state.
- [x] Excludes API calls, provider access and business validation.
- [x] `shape` no longer defaults to `rounded`.
- [x] The button renders `data-shape` only when the caller passes the prop, so the document `data-shape` applies otherwise and the effective default stays `rounded` through `--shape-radius` ([Shape contracts](../../styles/tech-shape.sc.md)).
- [x] The tone contract uses brand; Canonical visual type.
- [x] The shape contract uses Inherited from the document shape; rounded when nothing is declared; `square`, `rounded` or `pill`; rendered as `data-shape` only when passed.
- [x] The fullWidth / loading contract uses false / false; Loading disables the native button.
- [x] The type contract uses button; Caller sets submit for form submission.
- [x] The loadingLabel contract uses undefined; Caller supplies localized text; absent label preserves children.
- [x] Native attributes, events, ref and className pass through.
- [x] The button keeps its accessible name while loading; spinner is decorative.
- [x] State, callbacks, native form values and focus update immediately.
- [x] rest ↔ hover/pressed → Native pointer/keyboard interaction → Existing root background/border targets → --motion-fast / --ease-standard.
- [x] enabled ↔ disabled → Disabled prop → Native root opacity → --motion-fast / --ease-standard.
- [x] Use only states actually defined by the component; focus outline and error semantics are immediate.
- [x] No validation shake, typing animation, caret movement or delayed submission.
- [x] Controlled updates retarget from the current interpolated frame.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] V2 definition and example use the real public Button export; V1 examples remain unchanged.
- [x] The named Basic action example uses children="Children", title="Title" and loadingLabel="LoadingLabel"; typed controls expose supported visual values and inherited document shape.
- [x] A colocated useButtonExample owns settings, event count and callbacks; no inline view state is added to the render.
- [x] Properties document canonical capabilities, native button inheritance, loadingLabel and type; methods state that no custom imperative API exists and events document onClick.
- [x] Loading/disabled states preserve native behavior; reset clears event feedback and restores initial props.

- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.

- [x] V2 CRUD action hierarchy: the Button API remains purely presentational and caller-owned. It must not infer primary/secondary importance from its label, route, submit type or location; consumers choose tone and appearance explicitly. Default `tone="brand"` remains backward compatible outside the CRUD migration.
- [x] Showcase documents the existing `brand`, `neutral`, `sand`, `violet`, `forest`, `sky`, `success`, `warning`, `info` and `danger` tones (when supported by the canonical type), with meaningful solid/soft/bordered/ghost combinations. No new local palette or duplicate type is introduced.
- [x] Consumer scenarios demonstrate one prominent `brand/solid` action per decision area, `sand/bordered` for Edit, `neutral/ghost` for Back and Cancel, `neutral/bordered` for Retry and filters, and `danger` only in destructive confirmation. Supporting `violet`, `forest` and `sky` tones require a semantic use and must not compete with Create/Save.
- [ ] Check keyboard focus, pending/disabled behavior, contrast and forced-colors in light, dark, contrast and liquid-glass themes; verify actual V2 preview, minimal copyable TSX and relevant typecheck/build before accepting this increment.
