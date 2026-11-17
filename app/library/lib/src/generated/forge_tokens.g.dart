// GENERATED FILE — do not edit. Source: shared/tokens/*.json.
// CSS rem -> Flutter logical px assumes 16px/root rem; browser root-size parity is not yet verified.
// Browser-only gradients, media queries, forced-colors, backdrop filters, viewport units are not exported.
import 'package:flutter/painting.dart';

class ForgeTokenSet {
  final Map<String, int> _colors;
  final Map<String, double> _numbers;
  const ForgeTokenSet({required Map<String, int> colors, required Map<String, double> numbers})
      : _colors = colors, _numbers = numbers;
  Color color(String cssName) {
    final value = _colors[cssName];
    if (value == null) throw ArgumentError.value(cssName, 'cssName', 'Not a portable color token');
    return Color(value);
  }
  double number(String cssName) {
    final value = _numbers[cssName];
    if (value == null) throw ArgumentError.value(cssName, 'cssName', 'Not a portable numeric token');
    return value;
  }
  double get opacityFull => number('--opacity-full');
  double get switchTrackOpacity => number('--switch-track-opacity');
  double get switchStateLayerSpread => number('--switch-state-layer-spread');
  double get switchTrackWidthXs => number('--switch-track-width-xs');
  double get switchTrackHeightXs => number('--switch-track-height-xs');
  double get switchThumbSizeXs => number('--switch-thumb-size-xs');
  double get switchTrackWidthSm => number('--switch-track-width-sm');
  double get switchTrackHeightSm => number('--switch-track-height-sm');
  double get switchThumbSizeSm => number('--switch-thumb-size-sm');
  double get switchTrackWidthMd => number('--switch-track-width-md');
  double get switchTrackHeightMd => number('--switch-track-height-md');
  double get switchThumbSizeMd => number('--switch-thumb-size-md');
  double get switchTrackWidthLg => number('--switch-track-width-lg');
  double get switchTrackHeightLg => number('--switch-track-height-lg');
  double get switchThumbSizeLg => number('--switch-thumb-size-lg');
  double get switchTrackWidthXl => number('--switch-track-width-xl');
  double get switchTrackHeightXl => number('--switch-track-height-xl');
  double get switchThumbSizeXl => number('--switch-thumb-size-xl');
  double get fontSizeXs => number('--font-size-xs');
  double get fontSizeSm => number('--font-size-sm');
  double get fontSizeMd => number('--font-size-md');
  double get fontSizeLg => number('--font-size-lg');
  double get fontSizeXl => number('--font-size-xl');
  double get fontSize2xl => number('--font-size-2xl');
  double get fontSize3xl => number('--font-size-3xl');
  double get fontSize4xl => number('--font-size-4xl');
  double get fontSize5xl => number('--font-size-5xl');
  double get lineHeightNormal => number('--line-height-normal');
  double get space0 => number('--space-0');
  double get space1 => number('--space-1');
  double get space2 => number('--space-2');
  double get space3 => number('--space-3');
  double get space4 => number('--space-4');
  double get space5 => number('--space-5');
  double get space6 => number('--space-6');
  double get space8 => number('--space-8');
  double get space10 => number('--space-10');
  double get space12 => number('--space-12');
  double get space16 => number('--space-16');
  double get space20 => number('--space-20');
  double get radiusNone => number('--radius-none');
  double get radiusXs => number('--radius-xs');
  double get radiusSm => number('--radius-sm');
  double get radiusMd => number('--radius-md');
  double get radiusLg => number('--radius-lg');
  double get radiusXl => number('--radius-xl');
  double get radiusFull => number('--radius-full');
  double get motionFast => number('--motion-fast');
  double get motionNormal => number('--motion-normal');
  double get motionOpacityHidden => number('--motion-opacity-hidden');
  double get motionOpacityVisible => number('--motion-opacity-visible');
  double get motionScaleEnter => number('--motion-scale-enter');
  double get motionScaleRest => number('--motion-scale-rest');
  double get baseUnit => number('--base-unit');
  double get zero => number('--zero');
  double get sizeVisuallyHidden => number('--size-visually-hidden');
  double get borderWidthThin => number('--border-width-thin');
  double get borderWidthThick => number('--border-width-thick');
  double get borderWidthFocus => number('--border-width-focus');
  double get opacityDisabled => number('--opacity-disabled');
  double get opacityDecorative => number('--opacity-decorative');
  double get opacityPulse => number('--opacity-pulse');
  double get motionSpinDuration => number('--motion-spin-duration');
  double get motionPulseDuration => number('--motion-pulse-duration');
  double get zIndexPopup => number('--z-index-popup');
  double get zIndexSkipLink => number('--z-index-skip-link');
  double get iconStrokeWidth => number('--icon-stroke-width');
  double get iconStrokeWidthThin => number('--icon-stroke-width-thin');
  double get layoutSidebarNavigationColumn => number('--layout-sidebar-navigation-column');
  double get layoutSidebarContentColumn => number('--layout-sidebar-content-column');
  double get layoutContainerNarrow => number('--layout-container-narrow');
  double get layoutContainerWide => number('--layout-container-wide');
  double get layoutContainerPadding => number('--layout-container-padding');
  double get layoutContainerPaddingWide => number('--layout-container-padding-wide');
  double get length1 => number('--length-1');
  double get length2 => number('--length-2');
  double get length3 => number('--length-3');
  double get length4 => number('--length-4');
  double get length5 => number('--length-5');
  double get length6 => number('--length-6');
  double get length8 => number('--length-8');
  double get length10 => number('--length-10');
  double get length12 => number('--length-12');
  double get length16 => number('--length-16');
  double get length20 => number('--length-20');
  double get fontSize6xl => number('--font-size-6xl');
  double get fontSize7xl => number('--font-size-7xl');
  double get lineHeightTight => number('--line-height-tight');
  double get lineHeightDisplay => number('--line-height-display');
  double get lineHeightHeading => number('--line-height-heading');
  double get lineHeightCompact => number('--line-height-compact');
  double get lineHeightText => number('--line-height-text');
  double get lineHeightRelaxed => number('--line-height-relaxed');
  double get fontWeightRegular => number('--font-weight-regular');
  double get fontWeightMedium => number('--font-weight-medium');
  double get fontWeightSemibold => number('--font-weight-semibold');
  double get fontWeightBold => number('--font-weight-bold');
  double get letterSpacingTight => number('--letter-spacing-tight');
  double get letterSpacingDisplay => number('--letter-spacing-display');
  double get letterSpacingWide => number('--letter-spacing-wide');
  double get letterSpacingNormal => number('--letter-spacing-normal');
  double get componentHeightXs => number('--component-height-xs');
  double get componentPaddingBlockXs => number('--component-padding-block-xs');
  double get componentPaddingInlineXs => number('--component-padding-inline-xs');
  double get componentHeightSm => number('--component-height-sm');
  double get componentPaddingBlockSm => number('--component-padding-block-sm');
  double get componentPaddingInlineSm => number('--component-padding-inline-sm');
  double get componentHeightMd => number('--component-height-md');
  double get componentPaddingBlockMd => number('--component-padding-block-md');
  double get componentPaddingInlineMd => number('--component-padding-inline-md');
  double get length7 => number('--length-7');
  double get componentHeightLg => number('--component-height-lg');
  double get componentPaddingBlockLg => number('--component-padding-block-lg');
  double get componentPaddingInlineLg => number('--component-padding-inline-lg');
  double get componentHeightXl => number('--component-height-xl');
  double get componentPaddingBlockXl => number('--component-padding-block-xl');
  double get componentPaddingInlineXl => number('--component-padding-inline-xl');
  double get length96 => number('--length-96');
  double get breakpointMobile => number('--breakpoint-mobile');
  double get length138 => number('--length-138');
  double get breakpointWide => number('--breakpoint-wide');
  double get length18 => number('--length-18');
  double get length170 => number('--length-170');
  double get length40 => number('--length-40');
  double get length93 => number('--length-93');
  double get length148 => number('--length-148');
  double get length39 => number('--length-39');
  double get length13 => number('--length-13');
  double get length71 => number('--length-71');
  double get length58 => number('--length-58');
  double get length29 => number('--length-29');
  double get length32 => number('--length-32');
  double get length28 => number('--length-28');
  double get length8Negative => number('--length-8-negative');
  double get length6Negative => number('--length-6-negative');
  double get length21 => number('--length-21');
  double get length22 => number('--length-22');
  double get length88 => number('--length-88');
  double get scrollbarSize => number('--scrollbar-size');
  double get scrollbarRadius => number('--scrollbar-radius');
  Color get colorScrollbarTrack => color('--color-scrollbar-track');
  Color get colorScrollbarThumb => color('--color-scrollbar-thumb');
  Color get colorScrollbarThumbHover => color('--color-scrollbar-thumb-hover');
  Color get colorBrandPrimary => color('--color-brand-primary');
  Color get colorBrandDeep => color('--color-brand-deep');
  Color get colorBrandNight => color('--color-brand-night');
  Color get colorBrandGray => color('--color-brand-gray');
  Color get colorSurfacePage => color('--color-surface-page');
  Color get colorSurfaceDefault => color('--color-surface-default');
  Color get colorSurfaceSubtle => color('--color-surface-subtle');
  Color get colorSurfaceRaised => color('--color-surface-raised');
  Color get colorSurfaceInverse => color('--color-surface-inverse');
  Color get colorTextDefault => color('--color-text-default');
  Color get colorTextMuted => color('--color-text-muted');
  Color get colorTextInverse => color('--color-text-inverse');
  Color get colorTextBrand => color('--color-text-brand');
  Color get colorBorderDefault => color('--color-border-default');
  Color get colorBorderSubtle => color('--color-border-subtle');
  Color get colorFocusRing => color('--color-focus-ring');
  Color get colorActionBrandBackground => color('--color-action-brand-background');
  Color get colorActionBrandForeground => color('--color-action-brand-foreground');
  Color get colorCheckableBrandBackground => color('--color-checkable-brand-background');
  Color get colorActionNeutralBackground => color('--color-action-neutral-background');
  Color get colorActionDangerBackground => color('--color-action-danger-background');
  Color get colorActionSuccessBackground => color('--color-action-success-background');
  Color get colorActionWarningBackground => color('--color-action-warning-background');
  Color get colorActionInfoBackground => color('--color-action-info-background');
  Color get colorActionSkyBackground => color('--color-action-sky-background');
  Color get colorActionForestBackground => color('--color-action-forest-background');
  Color get colorActionVioletBackground => color('--color-action-violet-background');
  Color get colorActionSandBackground => color('--color-action-sand-background');
  Color get colorActionSandForeground => color('--color-action-sand-foreground');
  Color get colorTextSand => color('--color-text-sand');
  Color get colorTextViolet => color('--color-text-violet');
  Color get colorTextForest => color('--color-text-forest');
  Color get colorTextSky => color('--color-text-sky');
  Color get colorActionForeground => color('--color-action-foreground');
  Color get colorTextDanger => color('--color-text-danger');
  Color get colorTextSuccess => color('--color-text-success');
  Color get colorSurfaceAccent => color('--color-surface-accent');
  Color get colorSurfaceSand => color('--color-surface-sand');
  Color get surfaceBackground => color('--surface-background');
  Color get surfaceRaisedBackground => color('--surface-raised-background');
  Color get colorTransparent => color('--color-transparent');
  double get shapeRadius => number('--shape-radius');
}

class ForgeTokens {
  const ForgeTokens._();
  static const ForgeTokenSet light = ForgeTokenSet(
    colors: <String, int>{
      '--color-scrollbar-track': 0x00000000,
      '--color-scrollbar-thumb': 0xFF53635E,
      '--color-scrollbar-thumb-hover': 0xFF161E47,
      '--color-brand-primary': 0xFF2D66EE,
      '--color-brand-deep': 0xFF212D6B,
      '--color-brand-night': 0xFF161E47,
      '--color-brand-gray': 0xFFD9D9D9,
      '--color-surface-page': 0xFFD2D8E1,
      '--color-surface-default': 0xFFE7EBF1,
      '--color-surface-subtle': 0xFFD9DFE8,
      '--color-surface-raised': 0xFFF0F3F7,
      '--color-surface-inverse': 0xFF182A29,
      '--color-text-default': 0xFF161E47,
      '--color-text-muted': 0xFF53635E,
      '--color-text-inverse': 0xFFFFFFFF,
      '--color-text-brand': 0xFF212D6B,
      '--color-border-default': 0xFF758294,
      '--color-border-subtle': 0xFFB3BDCA,
      '--color-focus-ring': 0xFF2D66EE,
      '--color-action-brand-background': 0xFF2D66EE,
      '--color-action-brand-foreground': 0xFFFFFFFF,
      '--color-checkable-brand-background': 0xFF2D66EE,
      '--color-action-neutral-background': 0xFF394B43,
      '--color-action-danger-background': 0xFFA12C35,
      '--color-action-success-background': 0xFF236144,
      '--color-action-warning-background': 0xFF795300,
      '--color-action-info-background': 0xFF285C82,
      '--color-action-sky-background': 0xFF246C9F,
      '--color-action-forest-background': 0xFF287A63,
      '--color-action-violet-background': 0xFF7656B8,
      '--color-action-sand-background': 0xFFD6C3A5,
      '--color-action-sand-foreground': 0xFF161E47,
      '--color-text-sand': 0xFF705531,
      '--color-text-violet': 0xFF624397,
      '--color-text-forest': 0xFF1E624E,
      '--color-text-sky': 0xFF205A82,
      '--color-action-foreground': 0xFFFFFFFF,
      '--color-text-danger': 0xFFA12C35,
      '--color-text-success': 0xFF236144,
      '--color-surface-accent': 0xFFE8EFE5,
      '--color-surface-sand': 0xFFF3EDE4,
      '--surface-background': 0xFFE7EBF1,
      '--surface-raised-background': 0xFFF0F3F7,
      '--color-transparent': 0x00000000,
    },
    numbers: <String, double>{
      '--opacity-full': 1,
      '--switch-track-opacity': 0.4,
      '--switch-state-layer-spread': 8,
      '--switch-track-width-xs': 40,
      '--switch-track-height-xs': 16,
      '--switch-thumb-size-xs': 24,
      '--switch-track-width-sm': 40,
      '--switch-track-height-sm': 16,
      '--switch-thumb-size-sm': 24,
      '--switch-track-width-md': 48,
      '--switch-track-height-md': 16,
      '--switch-thumb-size-md': 24,
      '--switch-track-width-lg': 56,
      '--switch-track-height-lg': 24,
      '--switch-thumb-size-lg': 32,
      '--switch-track-width-xl': 64,
      '--switch-track-height-xl': 24,
      '--switch-thumb-size-xl': 32,
      '--font-size-xs': 12,
      '--font-size-sm': 14,
      '--font-size-md': 16,
      '--font-size-lg': 18,
      '--font-size-xl': 20,
      '--font-size-2xl': 24,
      '--font-size-3xl': 32,
      '--font-size-4xl': 40,
      '--font-size-5xl': 48,
      '--line-height-normal': 1.5,
      '--space-0': 0,
      '--space-1': 8,
      '--space-2': 16,
      '--space-3': 24,
      '--space-4': 32,
      '--space-5': 40,
      '--space-6': 48,
      '--space-8': 64,
      '--space-10': 80,
      '--space-12': 96,
      '--space-16': 128,
      '--space-20': 160,
      '--radius-none': 0,
      '--radius-xs': 8,
      '--radius-sm': 8,
      '--radius-md': 16,
      '--radius-lg': 16,
      '--radius-xl': 24,
      '--radius-full': 9999,
      '--motion-fast': 140,
      '--motion-normal': 220,
      '--motion-opacity-hidden': 0,
      '--motion-opacity-visible': 1,
      '--motion-scale-enter': 0.98,
      '--motion-scale-rest': 1,
      '--base-unit': 8,
      '--zero': 0,
      '--size-visually-hidden': 1,
      '--border-width-thin': 1,
      '--border-width-thick': 2,
      '--border-width-focus': 3,
      '--opacity-disabled': 0.65,
      '--opacity-decorative': 0.16,
      '--opacity-pulse': 0.4,
      '--motion-spin-duration': 800,
      '--motion-pulse-duration': 1000,
      '--z-index-popup': 10,
      '--z-index-skip-link': 20,
      '--icon-stroke-width': 2,
      '--icon-stroke-width-thin': 1.5,
      '--layout-sidebar-navigation-column': 1,
      '--layout-sidebar-content-column': 2,
      '--layout-container-narrow': 768,
      '--layout-container-wide': 1104,
      '--layout-container-padding': 32,
      '--layout-container-padding-wide': 48,
      '--length-1': 8,
      '--length-2': 16,
      '--length-3': 24,
      '--length-4': 32,
      '--length-5': 40,
      '--length-6': 48,
      '--length-8': 64,
      '--length-10': 80,
      '--length-12': 96,
      '--length-16': 128,
      '--length-20': 160,
      '--font-size-6xl': 56,
      '--font-size-7xl': 64,
      '--line-height-tight': 1,
      '--line-height-display': 1.1,
      '--line-height-heading': 1.2,
      '--line-height-compact': 1.3,
      '--line-height-text': 1.6,
      '--line-height-relaxed': 1.8,
      '--font-weight-regular': 400,
      '--font-weight-medium': 500,
      '--font-weight-semibold': 600,
      '--font-weight-bold': 700,
      '--letter-spacing-tight': -1,
      '--letter-spacing-display': -2,
      '--letter-spacing-wide': 1.6,
      '--letter-spacing-normal': 0,
      '--component-height-xs': 32,
      '--component-padding-block-xs': 0,
      '--component-padding-inline-xs': 16,
      '--component-height-sm': 40,
      '--component-padding-block-sm': 8,
      '--component-padding-inline-sm': 16,
      '--component-height-md': 48,
      '--component-padding-block-md': 8,
      '--component-padding-inline-md': 24,
      '--length-7': 56,
      '--component-height-lg': 56,
      '--component-padding-block-lg': 8,
      '--component-padding-inline-lg': 24,
      '--component-height-xl': 64,
      '--component-padding-block-xl': 16,
      '--component-padding-inline-xl': 24,
      '--length-96': 768,
      '--breakpoint-mobile': 768,
      '--length-138': 1104,
      '--breakpoint-wide': 1104,
      '--length-18': 144,
      '--length-170': 1360,
      '--length-40': 320,
      '--length-93': 744,
      '--length-148': 1184,
      '--length-39': 312,
      '--length-13': 104,
      '--length-71': 568,
      '--length-58': 464,
      '--length-29': 232,
      '--length-32': 256,
      '--length-28': 224,
      '--length-8-negative': -64,
      '--length-6-negative': -48,
      '--length-21': 168,
      '--length-22': 176,
      '--length-88': 704,
      '--scrollbar-size': 8,
      '--scrollbar-radius': 16,
      '--shape-radius': 16,
    },
  );

  static const ForgeTokenSet dark = ForgeTokenSet(
    colors: <String, int>{
      '--color-scrollbar-track': 0x00000000,
      '--color-scrollbar-thumb': 0xFFB3C2CF,
      '--color-scrollbar-thumb-hover': 0xFFF3F6F7,
      '--color-brand-primary': 0xFF2D66EE,
      '--color-brand-deep': 0xFF212D6B,
      '--color-brand-night': 0xFF161E47,
      '--color-brand-gray': 0xFFD9D9D9,
      '--color-surface-page': 0xFF080E16,
      '--color-surface-default': 0xFF141D28,
      '--color-surface-subtle': 0xFF1B2734,
      '--color-surface-raised': 0xFF1B2734,
      '--color-surface-inverse': 0xFFF3F6F7,
      '--color-text-default': 0xFFF3F6F7,
      '--color-text-muted': 0xFFB3C2CF,
      '--color-text-inverse': 0xFF11241F,
      '--color-text-brand': 0xFFF3F6F7,
      '--color-border-default': 0xFF060C14,
      '--color-border-subtle': 0xFF0D1620,
      '--color-focus-ring': 0xFFF3F6F7,
      '--color-action-brand-background': 0xFF2D66EE,
      '--color-action-brand-foreground': 0xFFF3F6F7,
      '--color-checkable-brand-background': 0xFF3D72EF,
      '--color-action-neutral-background': 0xFFC2D1DB,
      '--color-action-danger-background': 0xFFFFB1B7,
      '--color-action-success-background': 0xFFA7DCC0,
      '--color-action-warning-background': 0xFFF5D494,
      '--color-action-info-background': 0xFFA9CFFF,
      '--color-action-sky-background': 0xFF81BDE6,
      '--color-action-forest-background': 0xFF83C8B0,
      '--color-action-violet-background': 0xFFB9A3E9,
      '--color-action-sand-background': 0xFFA58D70,
      '--color-action-sand-foreground': 0xFF11241F,
      '--color-text-sand': 0xFFD6C3A5,
      '--color-text-violet': 0xFFB9A3E9,
      '--color-text-forest': 0xFF83C8B0,
      '--color-text-sky': 0xFF81BDE6,
      '--color-action-foreground': 0xFF11241F,
      '--color-text-danger': 0xFFFFB1B7,
      '--color-text-success': 0xFFA7DCC0,
      '--color-surface-accent': 0xFF193132,
      '--color-surface-sand': 0xFF342F29,
      '--surface-background': 0xFF141D28,
      '--surface-raised-background': 0xFF1B2734,
      '--color-transparent': 0x00000000,
    },
    numbers: <String, double>{
      '--opacity-full': 1,
      '--switch-track-opacity': 0.4,
      '--switch-state-layer-spread': 8,
      '--switch-track-width-xs': 40,
      '--switch-track-height-xs': 16,
      '--switch-thumb-size-xs': 24,
      '--switch-track-width-sm': 40,
      '--switch-track-height-sm': 16,
      '--switch-thumb-size-sm': 24,
      '--switch-track-width-md': 48,
      '--switch-track-height-md': 16,
      '--switch-thumb-size-md': 24,
      '--switch-track-width-lg': 56,
      '--switch-track-height-lg': 24,
      '--switch-thumb-size-lg': 32,
      '--switch-track-width-xl': 64,
      '--switch-track-height-xl': 24,
      '--switch-thumb-size-xl': 32,
      '--font-size-xs': 12,
      '--font-size-sm': 14,
      '--font-size-md': 16,
      '--font-size-lg': 18,
      '--font-size-xl': 20,
      '--font-size-2xl': 24,
      '--font-size-3xl': 32,
      '--font-size-4xl': 40,
      '--font-size-5xl': 48,
      '--line-height-normal': 1.5,
      '--space-0': 0,
      '--space-1': 8,
      '--space-2': 16,
      '--space-3': 24,
      '--space-4': 32,
      '--space-5': 40,
      '--space-6': 48,
      '--space-8': 64,
      '--space-10': 80,
      '--space-12': 96,
      '--space-16': 128,
      '--space-20': 160,
      '--radius-none': 0,
      '--radius-xs': 8,
      '--radius-sm': 8,
      '--radius-md': 16,
      '--radius-lg': 16,
      '--radius-xl': 24,
      '--radius-full': 9999,
      '--motion-fast': 140,
      '--motion-normal': 220,
      '--motion-opacity-hidden': 0,
      '--motion-opacity-visible': 1,
      '--motion-scale-enter': 0.98,
      '--motion-scale-rest': 1,
      '--base-unit': 8,
      '--zero': 0,
      '--size-visually-hidden': 1,
      '--border-width-thin': 1,
      '--border-width-thick': 2,
      '--border-width-focus': 3,
      '--opacity-disabled': 0.65,
      '--opacity-decorative': 0.16,
      '--opacity-pulse': 0.4,
      '--motion-spin-duration': 800,
      '--motion-pulse-duration': 1000,
      '--z-index-popup': 10,
      '--z-index-skip-link': 20,
      '--icon-stroke-width': 2,
      '--icon-stroke-width-thin': 1.5,
      '--layout-sidebar-navigation-column': 1,
      '--layout-sidebar-content-column': 2,
      '--layout-container-narrow': 768,
      '--layout-container-wide': 1104,
      '--layout-container-padding': 32,
      '--layout-container-padding-wide': 48,
      '--length-1': 8,
      '--length-2': 16,
      '--length-3': 24,
      '--length-4': 32,
      '--length-5': 40,
      '--length-6': 48,
      '--length-8': 64,
      '--length-10': 80,
      '--length-12': 96,
      '--length-16': 128,
      '--length-20': 160,
      '--font-size-6xl': 56,
      '--font-size-7xl': 64,
      '--line-height-tight': 1,
      '--line-height-display': 1.1,
      '--line-height-heading': 1.2,
      '--line-height-compact': 1.3,
      '--line-height-text': 1.6,
      '--line-height-relaxed': 1.8,
      '--font-weight-regular': 400,
      '--font-weight-medium': 500,
      '--font-weight-semibold': 600,
      '--font-weight-bold': 700,
      '--letter-spacing-tight': -1,
      '--letter-spacing-display': -2,
      '--letter-spacing-wide': 1.6,
      '--letter-spacing-normal': 0,
      '--component-height-xs': 32,
      '--component-padding-block-xs': 0,
      '--component-padding-inline-xs': 16,
      '--component-height-sm': 40,
      '--component-padding-block-sm': 8,
      '--component-padding-inline-sm': 16,
      '--component-height-md': 48,
      '--component-padding-block-md': 8,
      '--component-padding-inline-md': 24,
      '--length-7': 56,
      '--component-height-lg': 56,
      '--component-padding-block-lg': 8,
      '--component-padding-inline-lg': 24,
      '--component-height-xl': 64,
      '--component-padding-block-xl': 16,
      '--component-padding-inline-xl': 24,
      '--length-96': 768,
      '--breakpoint-mobile': 768,
      '--length-138': 1104,
      '--breakpoint-wide': 1104,
      '--length-18': 144,
      '--length-170': 1360,
      '--length-40': 320,
      '--length-93': 744,
      '--length-148': 1184,
      '--length-39': 312,
      '--length-13': 104,
      '--length-71': 568,
      '--length-58': 464,
      '--length-29': 232,
      '--length-32': 256,
      '--length-28': 224,
      '--length-8-negative': -64,
      '--length-6-negative': -48,
      '--length-21': 168,
      '--length-22': 176,
      '--length-88': 704,
      '--scrollbar-size': 8,
      '--scrollbar-radius': 16,
      '--shape-radius': 16,
    },
  );

  static const ForgeTokenSet contrast = ForgeTokenSet(
    colors: <String, int>{
      '--color-scrollbar-track': 0x00000000,
      '--color-scrollbar-thumb': 0xFFEEEEEE,
      '--color-scrollbar-thumb-hover': 0xFFFFFFFF,
      '--color-brand-primary': 0xFF2D66EE,
      '--color-brand-deep': 0xFF212D6B,
      '--color-brand-night': 0xFF161E47,
      '--color-brand-gray': 0xFFD9D9D9,
      '--color-surface-page': 0xFF000000,
      '--color-surface-default': 0xFF000000,
      '--color-surface-subtle': 0xFF141414,
      '--color-surface-raised': 0xFF000000,
      '--color-surface-inverse': 0xFFFFFFFF,
      '--color-text-default': 0xFFFFFFFF,
      '--color-text-muted': 0xFFEEEEEE,
      '--color-text-inverse': 0xFF000000,
      '--color-text-brand': 0xFFFFEC54,
      '--color-border-default': 0xFFFFFFFF,
      '--color-border-subtle': 0xFFBDBDBD,
      '--color-focus-ring': 0xFFFFEC54,
      '--color-action-brand-background': 0xFFFFEC54,
      '--color-action-brand-foreground': 0xFF000000,
      '--color-checkable-brand-background': 0xFFFFEC54,
      '--color-action-neutral-background': 0xFFEEEEEE,
      '--color-action-danger-background': 0xFFFFB8C0,
      '--color-action-success-background': 0xFFB8FFCD,
      '--color-action-warning-background': 0xFFFFEC54,
      '--color-action-info-background': 0xFFB5D8FF,
      '--color-action-sky-background': 0xFFEEEEEE,
      '--color-action-forest-background': 0xFFEEEEEE,
      '--color-action-violet-background': 0xFFEEEEEE,
      '--color-action-sand-background': 0xFFEEEEEE,
      '--color-action-sand-foreground': 0xFF161E47,
      '--color-text-sand': 0xFFEEEEEE,
      '--color-text-violet': 0xFFEEEEEE,
      '--color-text-forest': 0xFFEEEEEE,
      '--color-text-sky': 0xFFEEEEEE,
      '--color-action-foreground': 0xFF000000,
      '--color-text-danger': 0xFFFFB8C0,
      '--color-text-success': 0xFFB8FFCD,
      '--color-surface-accent': 0xFF141414,
      '--color-surface-sand': 0xFF141414,
      '--surface-background': 0xFF000000,
      '--surface-raised-background': 0xFF000000,
      '--color-transparent': 0x00000000,
    },
    numbers: <String, double>{
      '--opacity-full': 1,
      '--switch-track-opacity': 0.4,
      '--switch-state-layer-spread': 8,
      '--switch-track-width-xs': 40,
      '--switch-track-height-xs': 16,
      '--switch-thumb-size-xs': 24,
      '--switch-track-width-sm': 40,
      '--switch-track-height-sm': 16,
      '--switch-thumb-size-sm': 24,
      '--switch-track-width-md': 48,
      '--switch-track-height-md': 16,
      '--switch-thumb-size-md': 24,
      '--switch-track-width-lg': 56,
      '--switch-track-height-lg': 24,
      '--switch-thumb-size-lg': 32,
      '--switch-track-width-xl': 64,
      '--switch-track-height-xl': 24,
      '--switch-thumb-size-xl': 32,
      '--font-size-xs': 12,
      '--font-size-sm': 14,
      '--font-size-md': 16,
      '--font-size-lg': 18,
      '--font-size-xl': 20,
      '--font-size-2xl': 24,
      '--font-size-3xl': 32,
      '--font-size-4xl': 40,
      '--font-size-5xl': 48,
      '--line-height-normal': 1.5,
      '--space-0': 0,
      '--space-1': 8,
      '--space-2': 16,
      '--space-3': 24,
      '--space-4': 32,
      '--space-5': 40,
      '--space-6': 48,
      '--space-8': 64,
      '--space-10': 80,
      '--space-12': 96,
      '--space-16': 128,
      '--space-20': 160,
      '--radius-none': 0,
      '--radius-xs': 8,
      '--radius-sm': 8,
      '--radius-md': 16,
      '--radius-lg': 16,
      '--radius-xl': 24,
      '--radius-full': 9999,
      '--motion-fast': 140,
      '--motion-normal': 220,
      '--motion-opacity-hidden': 0,
      '--motion-opacity-visible': 1,
      '--motion-scale-enter': 0.98,
      '--motion-scale-rest': 1,
      '--base-unit': 8,
      '--zero': 0,
      '--size-visually-hidden': 1,
      '--border-width-thin': 1,
      '--border-width-thick': 2,
      '--border-width-focus': 3,
      '--opacity-disabled': 0.65,
      '--opacity-decorative': 0.16,
      '--opacity-pulse': 0.4,
      '--motion-spin-duration': 800,
      '--motion-pulse-duration': 1000,
      '--z-index-popup': 10,
      '--z-index-skip-link': 20,
      '--icon-stroke-width': 2,
      '--icon-stroke-width-thin': 1.5,
      '--layout-sidebar-navigation-column': 1,
      '--layout-sidebar-content-column': 2,
      '--layout-container-narrow': 768,
      '--layout-container-wide': 1104,
      '--layout-container-padding': 32,
      '--layout-container-padding-wide': 48,
      '--length-1': 8,
      '--length-2': 16,
      '--length-3': 24,
      '--length-4': 32,
      '--length-5': 40,
      '--length-6': 48,
      '--length-8': 64,
      '--length-10': 80,
      '--length-12': 96,
      '--length-16': 128,
      '--length-20': 160,
      '--font-size-6xl': 56,
      '--font-size-7xl': 64,
      '--line-height-tight': 1,
      '--line-height-display': 1.1,
      '--line-height-heading': 1.2,
      '--line-height-compact': 1.3,
      '--line-height-text': 1.6,
      '--line-height-relaxed': 1.8,
      '--font-weight-regular': 400,
      '--font-weight-medium': 500,
      '--font-weight-semibold': 600,
      '--font-weight-bold': 700,
      '--letter-spacing-tight': -1,
      '--letter-spacing-display': -2,
      '--letter-spacing-wide': 1.6,
      '--letter-spacing-normal': 0,
      '--component-height-xs': 32,
      '--component-padding-block-xs': 0,
      '--component-padding-inline-xs': 16,
      '--component-height-sm': 40,
      '--component-padding-block-sm': 8,
      '--component-padding-inline-sm': 16,
      '--component-height-md': 48,
      '--component-padding-block-md': 8,
      '--component-padding-inline-md': 24,
      '--length-7': 56,
      '--component-height-lg': 56,
      '--component-padding-block-lg': 8,
      '--component-padding-inline-lg': 24,
      '--component-height-xl': 64,
      '--component-padding-block-xl': 16,
      '--component-padding-inline-xl': 24,
      '--length-96': 768,
      '--breakpoint-mobile': 768,
      '--length-138': 1104,
      '--breakpoint-wide': 1104,
      '--length-18': 144,
      '--length-170': 1360,
      '--length-40': 320,
      '--length-93': 744,
      '--length-148': 1184,
      '--length-39': 312,
      '--length-13': 104,
      '--length-71': 568,
      '--length-58': 464,
      '--length-29': 232,
      '--length-32': 256,
      '--length-28': 224,
      '--length-8-negative': -64,
      '--length-6-negative': -48,
      '--length-21': 168,
      '--length-22': 176,
      '--length-88': 704,
      '--scrollbar-size': 8,
      '--scrollbar-radius': 16,
      '--shape-radius': 16,
    },
  );

  static const ForgeTokenSet liquidGlass = ForgeTokenSet(
    colors: <String, int>{
      '--color-scrollbar-track': 0x00000000,
      '--color-scrollbar-thumb': 0xFF435A50,
      '--color-scrollbar-thumb-hover': 0xFF161E47,
      '--color-brand-primary': 0xFF2D66EE,
      '--color-brand-deep': 0xFF212D6B,
      '--color-brand-night': 0xFF161E47,
      '--color-brand-gray': 0xFFD9D9D9,
      '--color-surface-page': 0xFFE6EDF8,
      '--color-surface-default': 0xFFF9FCFA,
      '--color-surface-subtle': 0xFFE9F0EC,
      '--color-surface-raised': 0xFFFFFFFF,
      '--color-surface-inverse': 0xFF182A29,
      '--color-text-default': 0xFF161E47,
      '--color-text-muted': 0xFF435A50,
      '--color-text-inverse': 0xFFFFFFFF,
      '--color-text-brand': 0xFF212D6B,
      '--color-border-default': 0xFF72887B,
      '--color-border-subtle': 0xFFC5D7CC,
      '--color-focus-ring': 0xFF2D66EE,
      '--color-action-brand-background': 0xFF2D66EE,
      '--color-action-brand-foreground': 0xFFFFFFFF,
      '--color-checkable-brand-background': 0xFF2D66EE,
      '--color-action-neutral-background': 0xFF394B43,
      '--color-action-danger-background': 0xFFA12C35,
      '--color-action-success-background': 0xFF236144,
      '--color-action-warning-background': 0xFF795300,
      '--color-action-info-background': 0xFF285C82,
      '--color-action-sky-background': 0xFF246C9F,
      '--color-action-forest-background': 0xFF287A63,
      '--color-action-violet-background': 0xFF7656B8,
      '--color-action-sand-background': 0xFFD6C3A5,
      '--color-action-sand-foreground': 0xFF161E47,
      '--color-text-sand': 0xFF705531,
      '--color-text-violet': 0xFF624397,
      '--color-text-forest': 0xFF1E624E,
      '--color-text-sky': 0xFF205A82,
      '--color-action-foreground': 0xFFFFFFFF,
      '--color-text-danger': 0xFFA12C35,
      '--color-text-success': 0xFF236144,
      '--color-surface-accent': 0xFFE8EFE5,
      '--color-surface-sand': 0xFFF3EDE4,
      '--surface-background': 0xFFF9FCFA,
      '--surface-raised-background': 0xFFF9FCFA,
      '--color-transparent': 0x00000000,
    },
    numbers: <String, double>{
      '--opacity-full': 1,
      '--switch-track-opacity': 0.4,
      '--switch-state-layer-spread': 8,
      '--switch-track-width-xs': 40,
      '--switch-track-height-xs': 16,
      '--switch-thumb-size-xs': 24,
      '--switch-track-width-sm': 40,
      '--switch-track-height-sm': 16,
      '--switch-thumb-size-sm': 24,
      '--switch-track-width-md': 48,
      '--switch-track-height-md': 16,
      '--switch-thumb-size-md': 24,
      '--switch-track-width-lg': 56,
      '--switch-track-height-lg': 24,
      '--switch-thumb-size-lg': 32,
      '--switch-track-width-xl': 64,
      '--switch-track-height-xl': 24,
      '--switch-thumb-size-xl': 32,
      '--font-size-xs': 12,
      '--font-size-sm': 14,
      '--font-size-md': 16,
      '--font-size-lg': 18,
      '--font-size-xl': 20,
      '--font-size-2xl': 24,
      '--font-size-3xl': 32,
      '--font-size-4xl': 40,
      '--font-size-5xl': 48,
      '--line-height-normal': 1.5,
      '--space-0': 0,
      '--space-1': 8,
      '--space-2': 16,
      '--space-3': 24,
      '--space-4': 32,
      '--space-5': 40,
      '--space-6': 48,
      '--space-8': 64,
      '--space-10': 80,
      '--space-12': 96,
      '--space-16': 128,
      '--space-20': 160,
      '--radius-none': 0,
      '--radius-xs': 8,
      '--radius-sm': 8,
      '--radius-md': 16,
      '--radius-lg': 16,
      '--radius-xl': 24,
      '--radius-full': 9999,
      '--motion-fast': 140,
      '--motion-normal': 220,
      '--motion-opacity-hidden': 0,
      '--motion-opacity-visible': 1,
      '--motion-scale-enter': 0.98,
      '--motion-scale-rest': 1,
      '--base-unit': 8,
      '--zero': 0,
      '--size-visually-hidden': 1,
      '--border-width-thin': 1,
      '--border-width-thick': 2,
      '--border-width-focus': 3,
      '--opacity-disabled': 0.65,
      '--opacity-decorative': 0.16,
      '--opacity-pulse': 0.4,
      '--motion-spin-duration': 800,
      '--motion-pulse-duration': 1000,
      '--z-index-popup': 10,
      '--z-index-skip-link': 20,
      '--icon-stroke-width': 2,
      '--icon-stroke-width-thin': 1.5,
      '--layout-sidebar-navigation-column': 1,
      '--layout-sidebar-content-column': 2,
      '--layout-container-narrow': 768,
      '--layout-container-wide': 1104,
      '--layout-container-padding': 32,
      '--layout-container-padding-wide': 48,
      '--length-1': 8,
      '--length-2': 16,
      '--length-3': 24,
      '--length-4': 32,
      '--length-5': 40,
      '--length-6': 48,
      '--length-8': 64,
      '--length-10': 80,
      '--length-12': 96,
      '--length-16': 128,
      '--length-20': 160,
      '--font-size-6xl': 56,
      '--font-size-7xl': 64,
      '--line-height-tight': 1,
      '--line-height-display': 1.1,
      '--line-height-heading': 1.2,
      '--line-height-compact': 1.3,
      '--line-height-text': 1.6,
      '--line-height-relaxed': 1.8,
      '--font-weight-regular': 400,
      '--font-weight-medium': 500,
      '--font-weight-semibold': 600,
      '--font-weight-bold': 700,
      '--letter-spacing-tight': -1,
      '--letter-spacing-display': -2,
      '--letter-spacing-wide': 1.6,
      '--letter-spacing-normal': 0,
      '--component-height-xs': 32,
      '--component-padding-block-xs': 0,
      '--component-padding-inline-xs': 16,
      '--component-height-sm': 40,
      '--component-padding-block-sm': 8,
      '--component-padding-inline-sm': 16,
      '--component-height-md': 48,
      '--component-padding-block-md': 8,
      '--component-padding-inline-md': 24,
      '--length-7': 56,
      '--component-height-lg': 56,
      '--component-padding-block-lg': 8,
      '--component-padding-inline-lg': 24,
      '--component-height-xl': 64,
      '--component-padding-block-xl': 16,
      '--component-padding-inline-xl': 24,
      '--length-96': 768,
      '--breakpoint-mobile': 768,
      '--length-138': 1104,
      '--breakpoint-wide': 1104,
      '--length-18': 144,
      '--length-170': 1360,
      '--length-40': 320,
      '--length-93': 744,
      '--length-148': 1184,
      '--length-39': 312,
      '--length-13': 104,
      '--length-71': 568,
      '--length-58': 464,
      '--length-29': 232,
      '--length-32': 256,
      '--length-28': 224,
      '--length-8-negative': -64,
      '--length-6-negative': -48,
      '--length-21': 168,
      '--length-22': 176,
      '--length-88': 704,
      '--scrollbar-size': 8,
      '--scrollbar-radius': 16,
      '--shape-radius': 16,
    },
  );
}
