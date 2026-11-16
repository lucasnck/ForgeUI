---
title: "AspectRatio"
scope: "Box that keeps a sanctioned aspect ratio while its content fills it"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# AspectRatio

## Files

```text
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/index.ts (M)
design-system/components/atoms/AspectRatio/AspectRatio.tsx (M)
design-system/components/atoms/AspectRatio/AspectRatio.module.css (M)
design-system/components/atoms/AspectRatio/index.ts (M)
features/showcase/examples/AspectRatio.example.tsx (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/AspectRatio/definition.ts (C)
features/showcase-v2/components/AspectRatio/AspectRatio.example.tsx (C)
features/showcase-v2/components/AspectRatio/useAspectRatioExample.ts (C)
features/showcase-v2/components/AspectRatio/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Layout contracts](../../styles/tech-layout.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [Layout contracts](../../types/tech-layout-contracts.sc.md)

## Contract

```tsx
import { AspectRatio } from "@forge-ui/web";
<AspectRatio ratio="video">
 <img src={coverUrl} alt={coverAlt} className={styles.cover}/>
</AspectRatio>;
```

## Styles

```css
.root {
  composes: aspect from "../../../styles/layout-components.module.css";
}
```

## Animations

```text
clip
```

## Content

```tsx
import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentAspectRatio,
  LayoutElement,
} from "../../../types/layout";
import styles from "./AspectRatio.module.css";

export interface AspectRatioProps extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement> {
  as?: LayoutElement;
  ratio: ComponentAspectRatio;
}

export function AspectRatio({
  as = "div",
  ratio,
  className,
  ...props
}: AspectRatioProps) {
  const Element = as;
  return createElement(Element, {
    ...props,
    "className": [styles.root, className].filter(Boolean).join(" "),
    "data-ratio": ratio,
  });
}
```

## Tests

- V2 Media ratio: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given each ratio value, `data-ratio` is rendered and the recipe resolves the matching ratio token.
- [x] Given a resized container, the box height follows the ratio and the box never collapses.
- [x] Given a child that declares its own fill, the child fills the box without the atom adding styling.
- [x] Given a child with a focusable control, the focus ring is not clipped because the atom declares no overflow.
- [x] Given an engine without `aspect-ratio` support, the box renders as a plain block without breaking the surrounding layout.
- [x] Given a `className`, it is appended without replacing the recipe classes.
- [x] Given the module CSS, only the `composes` rule appears, and no ratio literal appears outside `tokens.css`.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Includes the rendered element choice through a constrained `as` prop.
- [x] Excludes media handling itself (`object-fit`, loading, alt text â€” the consumer's `img` or `video`), cropping utilities, placeholder and skeleton states, and any layout arrangement ([Stack](Stack.sc.md), [Inline](Inline.sc.md), [SimpleGrid](SimpleGrid.sc.md)).
- [x] The ratio contract uses Required; `square`, `video`, `photo` or `portrait`; resolves to the matching ratio token.
- [x] The as contract uses div; One of `LayoutElement`; `figure` is not included because captions belong to the feature.
- [x] The children contract uses Optional; The content that fills the box; the atom adds no wrapper and no styling.
- [x] Native attributes, events and `className` pass through.
- [x] `data-ratio` is always rendered.
- [x] The excerpt shows two values; the delivered recipe declares all four.
- [x] The component declares no ratio or size value of its own.
- [x] Component-local CSS: `src/design-system/components/atoms/AspectRatio/AspectRatio.module.css`.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Media ratio**: Compose a valid local image and alt text; switch supported ratio values without stretching the media.
- [x] The AspectRatio V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAspectRatioExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
