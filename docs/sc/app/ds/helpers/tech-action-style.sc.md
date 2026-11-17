---
title: "Flutter Action Style Resolution"
scope: "Shared token-backed size, tone, appearance and native action state recipes"
status: "PENDING"
type: "helper"
ds-level: "none"
---

# Flutter Action Style Resolution

## Files

```text
theme/forge_control_style.dart (C)
theme/forge_theme_tokens.dart (M)
```

## Dependencies

- [App capabilities](../types/tech-component-capabilities.sc.md)
- [Flutter theme adapter](../../tech-flutter-theme-adapter.sc.md)
- [Web action tones](../../../ds/styles/tech-interactive-primitives.sc.md)

## Tests

- Resolve all eleven action tones using the actual toned-components recipe: only sand changes soft background, and brand/sand/inverse have specific solid foregrounds.
- Preserve all size metrics, explicit/inherited shapes, outlined/bordered and ghost/none aliases, appearance/variant/legacy precedence.
- Preserve disabled opacity and token-backed focus border; native padded tap targets may exceed the visible token-sized surface.
- Map the Web brightness(0.92) hover recipe explicitly to native RGB scaling; use the same feedback for native press without adding a replacement palette.
- Theme changes preserve explicit shape and contrast configuration without preference storage or importing browser CSS.

## Criteria

- [x] Expose public capability enums once and keep action recipes internal to the library.
- [x] Resolve styles from generated semantic tokens with no replacement palette or arbitrary sizing defaults.
- [x] Preserve inherited theme shape and native touch/keyboard feedback.
- [x] Record behavior/style tests separately from unverified visual and native-device acceptance.


- [ ] Verify representative runtime appearance/focus/touch rendering before accepting full visual parity.
