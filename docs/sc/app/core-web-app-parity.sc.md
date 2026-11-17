---
title: "Web and App Component Parity"
scope: "Shared baseline, native adaptations and Web-to-Flutter property mapping"
---

# Web and App Component Parity

Existing Web SCs, actual public source, inherited types, CSS recipes and Showcase V2 definitions are the baseline. Preserve capabilities, defaults, variants, states, accessible intent and scenarios; do not reduce the contract to the current minimal ForgeButton.

These are proposed contracts, not available exports. All 221 current Web catalog components now have app specifications, all PENDING for implementation and acceptance. See the [inventory](core-app-parity-catalog.sc.md), [native mapping rules](core-native-api-mapping.sc.md) and [source traceability](reference/component-contracts.json).

## Ownership

Common semantics remain owned by existing DS SCs. App SCs own native API mappings and acceptance. Implement library behavior before advertising controls or preview availability. Tokens, theme/state resolution, motion preferences and accessible native hit areas belong to shared adapters, not duplicated widget recipes.

Read the [capabilities](ds/types/tech-component-capabilities.sc.md), app component SC and [showcase parity](feature-showcase-parity.sc.md). The contracts cover the full component catalog, including the [Icon registry/vector contract](ds/components/atoms/Icon.sc.md), shared models and injected platform adapters. Detailed property matrices live in each component SC; the Button matrix below is the shared first reference.

## Adaptation policy

| Preserve | Native adaptation | Do not add implicitly |
| --- | --- | --- |
| Enum values, defaults, hierarchy, state precedence | Dart enums and named parameters | A subset described as full parity |
| Content, callback intent, controlled state, validation timing | Widget composition, onPressed | Navigation, persistence, validation, business rules |
| Names, immediate disabled/busy feedback | Semantics, focus traversal, keyboard actions, touch targets | Meaningless DOM parameters |
| Size, spacing, shape, semantic colors | Generated tokens, native constraints, text scaling, directionality | Material default palettes/metrics replacing DS mappings |
| Focus, press, loading, reduced motion | Native mechanisms and hover where available | Required hover on touch-only platforms or delayed callbacks |

Classify inherited native attributes as mapped, native delegation or Web-only with rationale. CSS className/style/data-* and DOM ids remain Web hooks; composition and Key provide native customization/identity. Map action and focus intent rather than inventing generic DOM-event parameters.

DOM form serialization (name/value/form/formAction) has no implicit app equivalent. Callers own data and invoke explicit Form submit/reset callbacks; the library never submits, validates, navigates or networks by itself.

Native accessible hit areas may surround token-sized visible surfaces without removing visual sizes or colliding with adjacent targets. Shared adapter acceptance owns touch targets, directionality, text scaling, theme/contrast and motion policies. Missing portable tokens must be resolved in the canonical generator/theme layer before claiming visual parity; never guess literal palettes.

## Button property mapping

Baseline: Web Button.tsx, component-capabilities.ts, composed CSS and basic/crud-hierarchy definitions, compared with PraticarFront's original Button.

| Web | Proposed Flutter | Required behavior |
| --- | --- | --- |
| children: ReactNode | child: Widget? | Same composition; absent content supported, but action needs accessible naming |
| onClick | onPressed: VoidCallback? | One callback per activation; null disables |
| disabled=false | disabled=false | Effective disabled = disabled or loading or null callback |
| size=md | size=ForgeSize.md | xs, sm, md, lg, xl |
| tone=brand | tone=ForgeTone.brand | All eleven tones, caller-selected hierarchy |
| appearance unset | appearance: ForgeAppearance? | All six values; explicit appearance wins |
| variant=solid | variant: ForgeVariant? | Null resolves solid; outline maps outlined; nullable input distinguishes explicit selection for compatibility |
| shape unset | shape: ForgeShape? | Inherit current theme; square/rounded/pill overrides |
| fullWidth=false | fullWidth=false | Fill finite parent; content-sized under unbounded constraints |
| loading=false | loading=false | Decorative xs spinner, immediately disabled/busy |
| loadingLabel unset | loadingLabel: String? | Nonempty replaces child while loading; empty keeps child, whitespace follows Web truthiness |
| aria-label | semanticLabel: String? | Explicit action name without duplicate child announcement |
| title | tooltip: String? | Native tooltip, not sole required action name |
| ref / autoFocus / focus events | Key / FocusNode? / autofocus=false / onFocusChange | Caller-owned focus node is never disposed by widget |
| type=button/submit/reset | caller-owned onPressed | Caller explicitly invokes Form actions, no hidden behavior |
| className/style/data-*/DOM events | composition and native actions/focus | Web-only mechanics stay Web-only; preserve user-visible purpose |
| no Web equivalent | outlined: bool? deprecated bridge | Preserve current Flutter callers, not a substitute for appearances |

Resolution: explicit appearance > explicit variant (outline becomes outlined) > legacy outlined=true (outlined) or false (solid) > solid. Null shape follows current theme. outlined/bordered share the current Web recipe; ghost/none share theirs. Keep all named values.

## Related property mappings

| Component | Web baseline | App target |
| --- | --- | --- |
| Spinner | size=md, tone unset, animated=true, decorative=true, label unset | Same names/defaults, shared enums, inherited foreground |
| Spinner | status, aria-hidden, never focusable | One named native status or decorative semantics exclusion; no focus stop |
| IconButton | icon: IconName, label required | Typed ForgeIconName from existing geometry registry, nonblank label; no Material substitution |
| IconButton | size=md, tone=brand, appearance/shape/variant | Same visuals and precedence; no invented child/fullWidth |
| IconButton | loading/loadingLabel/disabled and native button attrs | Button states; hide icon while loading; replace name only if loadingLabel.trim() is nonempty |
| ButtonGroup | children, label, gap="2", padding unset, fullWidth=false | List<Widget>, nonblank label, ForgeSpace.s2, nullable padding, false |
| ButtonGroup | group semantics, wrapping inline layout | Preserve individual actions, wrapping, centered cross-axis/directional start alignment; no selection or roving focus |

## Equivalent scenarios and evidence

Button retains basic and crud-hierarchy. Cover all enums, inherited/explicit shape, appearance precedence, content composition, full width, disabled/loading, replacement label and callback feedback. CRUD retains one brand/solid primary, sand/bordered Edit, neutral/ghost Back/Cancel, neutral/bordered Retry and danger only inside destructive confirmation. Supporting accents remain caller-owned.

Spinner covers decorative/named status and motion opt-out. IconButton covers named actions and loading-name substitution. ButtonGroup covers spacing, wrapping, full width and independent actions.

Widget tests prove behavior; token/theme evidence proves mappings; targeted runtime observation proves visual/native integration. Flutter Web preview does not establish Android/iOS acceptance. A completed spec is not an implemented export. Preserve original PraticarFront and consumer integrations.
