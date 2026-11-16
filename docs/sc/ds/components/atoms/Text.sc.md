---
title: "Text"
scope: "Body and inline text with the shared typography contracts"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Text

## Files

```text
features/showcase-v2/components/Text/FormattingTextExample.tsx (C)
features/showcase-v2/components/Text/RelativeTimeTextExample.tsx (C)
features/showcase-v2/components/Text/formatting-fixtures.ts (C)
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/index.ts (M)
design-system/components/atoms/Text/Text.tsx (M)
design-system/components/atoms/Text/Text.module.css (M)
design-system/components/atoms/Text/index.ts (M)
features/showcase/examples/Text.example.tsx (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/Text/definition.ts (C)
features/showcase-v2/components/Text/Text.example.tsx (C)
features/showcase-v2/components/Text/useTextExample.ts (C)
features/showcase-v2/components/Text/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/Text/fixtures.ts (C)
```

## Dependencies

- [Typography contracts](../../styles/tech-typography.sc.md)
- [Typography contracts](../../types/tech-typography-contracts.sc.md)

## Contract

```tsx
import { Text } from "@forge-ui/web";
<Text as="p" tone="muted" size="sm">
 {hint}
</Text>;
```

## Styles

```css
.root {
  composes: text from "../../../styles/text-components.module.css";
  composes: size from "../../../styles/text-components.module.css";
  composes: tone from "../../../styles/text-components.module.css";
  composes: weight from "../../../styles/text-components.module.css";
}
```

## Content

```tsx
import { createElement } from "react";
import type { HTMLAttributes, RefAttributes } from "react";
import type {
  ComponentFontWeightProps,
  ComponentTextSizeProps,
  ComponentTextToneProps,
  TextElement,
} from "../../../types/typography";
import styles from "./Text.module.css";

export interface TextProps
  extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement>,
    ComponentTextSizeProps,
    ComponentTextToneProps,
    ComponentFontWeightProps {
  as?: TextElement;
}

export function Text({
  as = "span",
  size,
  tone,
  weight,
  className,
  ...props
}: TextProps) {
  const Element = as;
  return createElement(Element, {
    ...props,
    "className": [styles.root, className].filter(Boolean).join(" "),
    "data-text-size": size,
    "data-text-tone": tone,
    "data-text-weight": weight,
  });
}
```

## Tests

- V2 Semantic typography: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Given no props, the component renders a `span` with no `data-text-*` attribute and the recipe resolves `md`, `default` and `regular`.
- [x] Given each `as` value, the rendered element matches it and keeps the native attributes, events and ref surface of that element.
- [x] Given each `ComponentTextSize`, `ComponentTextTone` and `ComponentFontWeight` value, the matching `data-text-*` attribute is rendered and the recipe resolves the matching token.
- [x] Given a `className`, it is appended to the recipe classes without replacing them.
- [x] Given long unbroken content, the text wraps inside its container without overflowing its parent.
- [x] Given the module CSS, it declares only `composes` rules.
- [x] Given the semantic palettes and forced-color fallbacks, tone values are consumed from the shared typography recipe without local color overrides; palette contrast belongs to the canonical token owner.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens`, `npm run test:design-system` and `npm run build` pass.
- [x] Includes the rendered element choice through a constrained `as` prop.
- [x] Excludes headings (owned by [Heading](Heading.sc.md)), layout and spacing, copy and localization, and every value that the typography recipe owns.
- [x] The as contract uses span; One of `span`, `p`, `small`, `strong`; the only way to choose the element.
- [x] The weight contract uses regular (recipe fallback); `ComponentFontWeight`; maps to an existing `--font-weight-*` token.
- [x] Native attributes, events and `className` pass through.
- [x] `data-text-size`, `data-text-tone` and `data-text-weight` are rendered only for the values the caller passes.
- [x] The component declares no typography value: `styles.root` composes `text`, `size`, `tone` and `weight` from the shared recipe, which resolves the custom properties.
- [x] `TextElement` is a canonical type, so the tag union is never inlined here.
- [x] Component-local CSS: `src/design-system/components/atoms/Text/Text.module.css`.
- [x] All typography values come from the shared recipe and its tokens.
- [x] The module declares no font size, line height, weight, letter spacing, color, margin or padding, so light, dark, contrast and liquid-glass need no rule here.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Semantic typography**: Use children="Children" and a long editable text; supported semantic/typography settings update the real element while content wraps within the parent.
- [x] The Text V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTextExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **Elapsed duration display** in the Text example uses the actual [helper contract](../../helpers/tech-duration-formatters.sc.md): Show actual duration/durationClock output for zero and 5400 seconds with explicit locales, plus validator boundaries; this is elapsed duration rather than a civil date or running timer. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.
- [x] V2 supporting fixture **Formatter namespace contracts** in the Text example uses the actual [helper contract](../../helpers/tech-formatting-api.sc.md): Exercise each public formatter/validator namespace entry in typed caller fixtures using its own valid numeric/date/money/document/phone data; show representative outputs through existing Text and specialized-control examples. Do not invent parser APIs or a helper page kind. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.
- [x] V2 supporting fixture **Deterministic relative time** in the Text example uses the actual [helper contract](../../helpers/tech-relative-time-formatters.sc.md): Use fixed updatedAt/referenceNow values, explicit locale and actual relativeTime/validator APIs; compare past/future/boundary output with no wall-clock access during SSR and no unowned running timer. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

- [x] Supporting helper consumption uses public canonical formatter/validator, geometry or range APIs with deterministic valid fixtures and copyable public usage.
- [ ] Review the added supporting helper examples in a real browser, including narrow layout and displayed output/snippet agreement; SSR and type checks do not certify this visual acceptance.
