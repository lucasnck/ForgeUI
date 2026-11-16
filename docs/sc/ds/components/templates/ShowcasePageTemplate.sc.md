---
title: "ShowcasePageTemplate"
scope: "Responsive header, sticky bounded optional navigation and single main content region"
status: "DONE"
type: "component"
ds-level: "templates"
---

# ShowcasePageTemplate

## Files

```text
features/showcase/examples/ApplicationLayoutPartExamples.tsx (C)
features/showcase/examples/IsolatedExampleDocument.tsx (C)
features/showcase/examples/IsolatedExampleDocument.module.css (C)
features/showcase/examples/useIsolatedExampleDocument.ts (C)
design-system/index.ts (M)
design-system/components/templates/ShowcasePageTemplate/ShowcasePageTemplate.tsx (M)
design-system/components/templates/ShowcasePageTemplate/ShowcasePageTemplate.module.css (M)
design-system/components/templates/ShowcasePageTemplate/index.ts (M)
../scripts/check-layout.cjs (M)
design-system/styles/globals.css (M)
features/showcase-v2/components/ShowcasePageTemplate/definition.ts (C)
features/showcase-v2/components/ShowcasePageTemplate/ShowcasePageTemplate.example.tsx (C)
features/showcase-v2/components/ShowcasePageTemplate/useShowcasePageTemplateExample.ts (C)
features/showcase-v2/components/ShowcasePageTemplate/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
app/design-system-v2/(demos)/demos/templates/showcase-page-template/[scenario]/page.tsx (C)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Heading](../atoms/Heading.sc.md)

## Contract

```tsx
import { ShowcasePageTemplate } from "@forge-ui/web";
import { ShowcaseNavigation, ShowcasePreferences, ShowcasePageContent } from "@/features/showcase";
<ShowcasePageTemplate title="Design System" navigation={<ShowcaseNavigation />} toolbar={<ShowcasePreferences />}>
   <ShowcasePageContent />
  </ShowcasePageTemplate>;
```

## Styles

```css
.sidebar {
  --showcase-navigation-available-block-size: calc(var(--size-viewport) - var(--length-2) - var(--length-2) - var(--border-width-thin));
  position: sticky;
  inset-block-start: var(--zero);
  align-self: start;
  z-index: var(--z-index-popup);
  max-block-size: var(--size-viewport);
  background: var(--color-surface-default);
}

@media (min-width: 768px) {
  .sidebar {
    --showcase-navigation-available-block-size: calc(var(--size-viewport) - var(--length-4) - var(--length-4));
  }
}
```

## Content

```tsx
import type { ReactNode } from "react";
import { Heading } from "../../atoms/Heading";
import styles from "./ShowcasePageTemplate.module.css";
export interface ShowcasePageTemplateProps {
  title?: ReactNode;
  navigation?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
}
export function ShowcasePageTemplate({ title, navigation, toolbar, children, }: ShowcasePageTemplateProps) {
  return (<div className={styles.page}>
   {(title || toolbar) && (<header className={styles.header}>
   {title && (<Heading level={1} size="xl">
   {title}
  </Heading>)}
   {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
  </header>)}
   <div className={styles.body}>
  {navigation && <aside className={styles.sidebar}>{navigation}</aside>}
  <main id="main-content" className={styles.main}>{children}</main>
   </div>
  </div>);
}
```

## Tests

- V2 Catalog shell: verify the specified actions/outcome, reset and agreement with its minimal copyable code.
- V2 Focused preview shell: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Check a short narrow viewport: sidebar padding, bottom border and navigation fit within the dynamic viewport budget.

Frame synchronization compares the resolved theme, preserving an inherited system preference when it already resolves to the requested theme.

The isolated demo uses the shared ExampleState technical grid with its explicit localized heading. Feedback is separate from record content and remains directly visible in its document.

## Criteria

- [x] Given title or toolbar, the full-width header renders before navigation/content; without both, it is omitted.
- [x] Given no navigation, no empty sidebar space remains.
- [x] Given children, exactly one main#main-content contains them.
- [x] Given narrow viewport or increased zoom, header controls wrap and content remains usable without unintended overflow.
- [x] Given feature-owned slots, the Template remains independent of providers, registry data and API calls.
- [x] Relevant lint, type, static-export, keyboard and responsive checks pass before marking this revision done.
- [x] Excludes registries, business navigation, providers, APIs and route registration.
- [x] The title / toolbar contract uses undefined; Header renders when either slot is truthy; title renders through the `Heading` atom at level 1 with `size="xl"`.
- [x] The navigation contract uses undefined; No aside when omitted; caller owns nav semantics.
- [x] The children contract uses Required; Main content; must not contain another main landmark.
- [x] No size/tone/appearance API.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] Showcase renders the actual public component in an isolated document, preserving one main per document, inherited locale/theme and functional caller-owned actions.

- [x] When the document scrolls beyond the header, navigation remains visible at the viewport start on the catalog and routed template pages.
- [x] The sidebar remains in the body layout, occupies its own width, and never becomes a fixed panel covering desktop main content.
- [x] The sidebar supplies its dynamic viewport budget minus its vertical padding and any horizontal border to caller-owned navigation; short viewports do not clip the last navigation item.
- [x] On narrow screens the sticky panel has an opaque surface and remains bounded so main content can still be read and scrolled below it.
- [x] Sticky positioning preserves the existing header slots and exactly one main landmark without adding scroll locking, JavaScript scroll handlers or a public prop.

- [x] V2 **Catalog shell**: Compose title="Title", neutral indexed navigation, public preference toolbar and a small preview. Reuse the supported landmark contract without importing private V1 showcase modules or nesting main landmarks.
- [x] V2 **Focused preview shell**: Compare supported optional-slot combinations around focused content with a compact toolbar; narrow layout preserves reading order and contextual navigation.
- [x] The ShowcasePageTemplate V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useShowcasePageTemplateExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] This template/region preview renders inside a titled iframe backed by the finite static template demo route listed in Files. Enumerate its named scenarios with generateStaticParams and dynamicParams=false. Each frame has its own correct main landmark, theme/locale composition and keyboard access; the catalog keeps one main and no duplicate main-content id. Render a demo-only export inside the frame, never recursively embed the preview. Copied usage remains direct public DS consumption without iframe scaffolding.
