---
title: "InputGroup"
scope: "Field row that places a control beside leading and trailing slots"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# InputGroup

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/InputGroup/index.ts (C)
design-system/components/molecules/InputGroup/InputGroup.module.css (C)
design-system/components/molecules/InputGroup/InputGroup.tsx (C)
features/showcase/examples/InputGroup.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-inputs.cjs (C)
features/showcase/examples/InputFamilyExample.tsx (C)
features/showcase-v2/components/InputGroup/definition.ts (C)
features/showcase-v2/components/InputGroup/InputGroup.example.tsx (C)
features/showcase-v2/components/InputGroup/useInputGroupExample.ts (C)
features/showcase-v2/components/InputGroup/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Layout contracts](../../styles/tech-layout.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Native control recipes](../../styles/tech-native-control-recipes.sc.md)
- [Layout contracts](../../types/tech-layout-contracts.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { Button, Icon, Input, InputGroup } from "@forge-ui/web";
<InputGroup trailing={<Button appearance="ghost" tone="neutral" aria-label={clearLabel} onClick={onClear}>
   <Icon name="close"/>
  </Button>}>
 <Input value={query} onChange={onQueryChange} fullWidth/>
</InputGroup>;
```

## Styles


```css
.root {
  composes: inline from "../../../styles/layout-components.module.css";
  composes: fullWidth from "../../../styles/full-width-components.module.css";
  flex-wrap: nowrap;
  inline-size: fit-content;
  max-inline-size: var(--size-full);
  min-inline-size: var(--zero);
}

.root > input {
  flex: auto;
}

.root > :not(input) {
  flex-shrink: var(--zero);
}
```

## Content

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import type { ComponentFullWidthProps } from "../../../types/component-capabilities";
import type { ComponentAlignProps, ComponentSpaceProps, LayoutElement } from "../../../types/layout";
import styles from "./InputGroup.module.css";

export interface InputGroupProps extends HTMLAttributes<HTMLElement>, ComponentSpaceProps, ComponentAlignProps, ComponentFullWidthProps {
  as?: LayoutElement;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}

export function InputGroup({ children, className, leading, trailing, gap = "2", align = "stretch", padding = "0", fullWidth = true, as = "div", ...props }: InputGroupProps) {
  const Tag = as;
  return (
    <Tag
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-gap={gap}
      data-align={align}
      data-padding={padding}
      data-full-width={fullWidth || undefined}
    >
      {leading}
      {children}
      {trailing}
    </Tag>
  );
}
```

## Tests

- V2 Composed input actions: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Render without browser globals and verify forwarded native attributes and the documented value channel.
- Verify explicit invalid=false overrides aria-invalid=true and fullWidth=false preserves the intrinsic contract.
- Verify shared input capabilities use canonical contracts without introducing another visual recipe.

## Criteria

- [x] Given only children, the rendered element is a `div` containing the control, with no extra markup and no style of its own beyond the composed recipes.
- [x] Given `leading` or `trailing`, the slot is rendered before or after the control respectively and only when present.
- [x] Given a trailing `Button`, it keeps its accessible name, focus behavior and disabled state.
- [x] Given a disabled control with a slot, the slot is not disabled automatically and the caller decides its state.
- [x] Given `fullWidth={false}`, the row uses its intrinsic width while the control keeps its own width contract.
- [x] Given a long control value, the control shrinks inside the row without pushing the trailing slot out of the container.
- [x] Given composition with `FormField`, the injected `id`, `invalid` and `aria-describedby` reach the control through the consumer's own element.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Includes alignment to the control height and the gap between the parts.
- [x] Excludes the control itself, inset adornments inside the field border, and every behavior: the slots receive real elements with their own semantics and accessible names.
- [x] The children contract uses Required; The control; it keeps its own visual and ARIA contract.
- [x] The leading / trailing contract uses undefined; Rendered only when present; each keeps its own semantics.
- [x] The gap contract uses 2; `ComponentSpace`; resolved by the composed inline recipe.
- [x] The align contract uses stretch; `ComponentAlign`; keeps the slots on the control height.
- [x] The fullWidth contract uses true; false uses intrinsic width; true fills the parent.
- [x] The as contract uses div; One of `LayoutElement`.
- [x] Native attributes, events and `className` pass through.
- [x] `data-gap`, `data-align`, `data-padding` and `data-full-width` follow the shared attribute contract.
- [x] Consumer control remains caller-owned without an added wrapper; its own fullWidth contract and native slots determine alignment.
- [x] No field-control declaration is duplicated here.
- [x] Component-local CSS: `src/design-system/components/molecules/InputGroup/InputGroup.module.css`.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Composed input actions**: Compose InputGroup/Input/InputAddon with a named trailing clear action; preserve ids/descriptions, independent event feedback and alignment with the input rather than the label/control group.
- [x] The InputGroup V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useInputGroupExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
