---
title: "Avatar"
scope: "Display a supplied image or deterministic initials/icon fallback in fixed geometry"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Avatar

## Files

```text
design-system/components/atoms/Avatar/Avatar.tsx (M)
design-system/components/atoms/Avatar/Avatar.module.css (M)
design-system/components/atoms/Avatar/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/Avatar.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
design-system/components/atoms/Avatar/useAvatar.ts (M)
../scripts/check-hooks.cjs (M)
features/showcase-v2/components/Avatar/definition.ts (C)
features/showcase-v2/components/Avatar/Avatar.example.tsx (C)
features/showcase-v2/components/Avatar/useAvatarExample.ts (C)
features/showcase-v2/components/Avatar/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Status primitives](../../styles/tech-status-primitives.sc.md)
- [Icon](Icon.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { Avatar } from "@forge-ui/web";
<Avatar label="Ana Silva" initials="AS" size="md"/>;
```

## Styles

```css
.root {
  composes: avatar from "../../../styles/status-components.module.css";
}
.image {
  inline-size: var(--size-full);
  block-size: var(--size-full);
  object-fit: cover;
}
```

## Hooks

```tsx
"use client";
import { useLayoutEffect, useRef, useState } from "react";
import type { AvatarProps } from "./Avatar";
export function useAvatar({ className, label, src, initials, decorative = false, size = "md", shape = "pill", ...props }: AvatarProps) {
  if (!label.trim()) throw new Error("Avatar requires a nonempty label.");
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const imageRef = useRef<HTMLImageElement>(null);
  useLayoutEffect(() => {
    // A cached failure may finish before hydration attaches the error handler.
    const image = imageRef.current;
    if (src && image?.complete && image.naturalWidth === 0) setFailedSrc(src);
  }, [src]);
  return { className, label, src, initials, decorative, size, shape, props, imageRef,
    showImage: Boolean(src) && src !== failedSrc,
    handleError: () => setFailedSrc(src), handleLoad: () => setFailedSrc(undefined),
  };
}
```

## Content

```tsx
"use client";

import { useAvatar } from "./useAvatar";
import { Icon } from "../Icon";
import type { HTMLAttributes, ReactElement } from "react";
import type {
  ComponentSizedProps,
  ComponentShapeProps,
} from "../../../types/component-capabilities";

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    ComponentSizedProps,
    ComponentShapeProps {
  label: string;
  src?: string;
  initials?: string;
  decorative?: boolean;
}
import styles from "./Avatar.module.css";

export function Avatar(input: AvatarProps): ReactElement {
  const {
    className, label, src, initials, decorative, size, shape, props,
    showImage, imageRef, handleError, handleLoad,
  } = useAvatar(input);
  return (
    <span
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-shape={shape}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      {showImage ? (
        // Static/native images do not require an optimization server.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={src}
          alt=""
          className={styles.image}
          onError={handleError}
          onLoad={handleLoad}
        />
      ) : (
        <span aria-hidden="true">
          {initials || <Icon name="user" size="inherit" />}
        </span>
      )}
    </span>
  );
}
```

## Tests

- V2 Identity fallback: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Failed and cached-failed image sources retain one fallback without retrying; a replacement URL or loaded image remains eligible.
- Server markup does not read image state; hydration checks completed images after mount.

## Criteria

- [x] Five sizes, three shapes, named/decorative, successful/missing/broken source, source replacement and initials/icon fallback are demonstrated.
- [x] Failed source shows fallback without an infinite retry or layout shift; a new source is attempted.
- [x] Root exposes one image name or none when decorative; nested alt text does not duplicate the label.
- [x] Exactly one Atom registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] The Defaults contract uses label nonempty required; size md, shape pill, decorative false.
- [x] The Constraint 1 contract uses src optional native image URL; initials optional caller-prepared text, otherwise user Icon.
- [x] The Constraint 2 contract uses No tone/appearance/fullWidth axis.
- [x] The Constraint 3 contract uses failedSrc stores failed URL; changed src retries, onLoad clears failedSrc.
- [x] The Constraint 4 contract uses Same initial markup on server/client; local event handling uses the smallest client boundary.
- [x] Defaults are those in Signature.
- [x] Use native image rendering, compatible with static export and no optimization server.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.

- [x] V2 **Identity fallback**: Use label="Label", initials="IN" and a valid local image; demonstrate image fallback and decorative usage next to visible identity text.
- [x] The Avatar V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAvatarExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
