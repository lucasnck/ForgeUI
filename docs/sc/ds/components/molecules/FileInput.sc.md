---
title: "FileInput"
scope: "Native file chooser with selection callbacks. Excludes uploads, previews and file parsing."
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# FileInput

## Files

```text
features/showcase-v2/components/FileInput/FileSizeExample.tsx (C)
features/showcase-v2/components/FileInput/file-size-fixtures.ts (C)
design-system/index.ts (M)
design-system/components/molecules/FileInput/FileInput.tsx (C)
design-system/components/molecules/FileInput/index.ts (C)
design-system/components/molecules/FileInput/useFileInput.ts (C)
features/showcase/examples/FileInput.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-inputs.cjs (C)
features/showcase/examples/InputFamilyExample.tsx (C)
features/showcase-v2/components/FileInput/definition.ts (C)
features/showcase-v2/components/FileInput/FileInput.example.tsx (C)
features/showcase-v2/components/FileInput/useFileInputExample.ts (C)
features/showcase-v2/components/FileInput/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/FileInput/fixtures.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-input-specializations.sc.md](../../types/tech-input-specializations.sc.md)
- [Input.sc.md](../atoms/Input.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { FileInput } from "@forge-ui/web";
<FileInput name="attachment" aria-label="Attachment" accept="application/pdf" onFilesChange={setFiles}/>;
```

## Hooks

```tsx
"use client";

import type { ChangeEvent } from "react";
import type { FileInputProps } from "./FileInput";

export function useFileInput({ onChange, onFilesChange, ...props }: FileInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (!event.defaultPrevented) onFilesChange?.(Array.from(event.currentTarget.files ?? []));
  }
  return { props, handleChange };
}
```

## Content

```tsx
"use client";

import { Input } from "../../atoms/Input";
import type { NativeFileInputProps } from "../../../types/input-specializations";
import type { VisualProps, ComponentFullWidthProps, ComponentInvalidProps } from "../../../types/component-capabilities";
import { useFileInput } from "./useFileInput";

export interface FileInputProps extends NativeFileInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
  onFilesChange?(files: readonly File[]): void;
}

export function FileInput(props: FileInputProps) {
  const view = useFileInput(props);
  return <Input
    {...view.props}
    type="file"
    onChange={view.handleChange}
  />;
}
```

## Tests

- V2 Local file selection: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The declared native or controlled value channel forwards one user change while prop updates emit no corrective callback.
- Caller-prevented and composing input does not trigger an owned selection/completion action.
- Two mounted instances preserve independent ids, descriptions and native submission values.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: Native keyboard activation and chooser cancellation remain intact.
- [x] Verify: Change with an empty FileList emits []; cancellation without change emits nothing.
- [x] Verify: Never create object URLs or read file content.
- [x] Native interactions remain delegated to the control; custom handlers intercept only documented keys, respect composition and prevent activation when disabled.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The value / defaultValue contract uses Unsupported; File selection cannot be controlled by string.
- [x] The multiple / accept / required contract uses false / undefined / false; Native chooser hints, not security validation.
- [x] The onChange / onFilesChange contract uses undefined; Native callback first, then file snapshot.
- [x] Native keyboard activation and chooser cancellation remain intact.
- [x] Never create object URLs or read file content.
- [x] Consumer owns type/size validation and reset through a native form.
- [x] Never set a nonempty value on a file input.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native field value and focus stay unchanged by motion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Local file selection**: Compose a connected Label with supported accept/multiple controls; choose and clear disposable local files, report name/size/type from onFilesChange and make no upload request.
- [x] The FileInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFileInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **File size display** in the FileInput example uses the actual [helper contract](../../helpers/tech-file-size-formatters.sc.md): Display actual fileSize formatter/validator outputs for zero and 1536 bytes, binary versus decimal units and explicit locales, without uploading files or confusing bytes with formatted text. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

- [x] Supporting helper consumption uses public canonical formatter/validator, geometry or range APIs with deterministic valid fixtures and copyable public usage.
- [ ] Review the added supporting helper examples in a real browser, including narrow layout and displayed output/snippet agreement; SSR and type checks do not certify this visual acceptance.
