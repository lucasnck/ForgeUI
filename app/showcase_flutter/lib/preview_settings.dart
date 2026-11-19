import 'dart:convert';
import 'examples/primitives_generated.dart';
import 'examples/input_contracts.dart';
import 'examples/composite_contracts.dart';
import 'examples/feedback_contracts.dart';
import 'examples/interaction_contracts.dart';
import 'examples/form_catalog_contracts.dart';
import 'examples/collection_contracts.dart';
import 'examples/transient_contracts.dart';
import 'examples/advanced_contracts.dart';
import 'examples/part_contracts.dart';
import 'package:forge_ui/forge_ui.dart';

class ForgePreviewSettings {
  final Map<String, Object?> catalogProperties;
  final String component;
  final String scenario;
  final ForgeThemeId theme;
  final String child;
  final bool enabled, loading, outlined, disabled, fullWidth, autofocus;
  final ForgeSize size;
  final ForgeTone? tone;
  final ForgeAppearance? appearance;
  final ForgeShape? shape;
  final ForgeVariant? variant;
  final String? loadingLabel, semanticLabel, tooltip;
  final bool animated, decorative;
  final String label;
  final ForgeSpace gap;
  final ForgeSpace? padding;
  const ForgePreviewSettings(
      {this.catalogProperties = const {},
      this.component = 'button',
      this.scenario = 'basic',
      this.theme = ForgeThemeId.light,
      this.child = 'Salvar alterações',
      this.enabled = true,
      this.loading = false,
      this.outlined = false,
      this.disabled = false,
      this.fullWidth = false,
      this.autofocus = false,
      this.size = ForgeSize.md,
      this.tone,
      this.appearance,
      this.shape,
      this.variant,
      this.loadingLabel,
      this.semanticLabel,
      this.tooltip,
      this.animated = true,
      this.decorative = true,
      this.label = 'Carregando conteúdo',
      this.gap = ForgeSpace.s2,
      this.padding});
  static ForgeThemeId? themeFor(String? v) => switch (v) {
        'light' => ForgeThemeId.light,
        'dark' => ForgeThemeId.dark,
        'contrast' => ForgeThemeId.contrast,
        'liquid-glass' => ForgeThemeId.liquidGlass,
        _ => null
      };
  static T? _enum<T extends Enum>(Object? v, List<T> values) {
    for (final item in values) {
      if (item.name == v) return item;
    }
    return null;
  }

  static ForgePreviewSettings? fromMessage(String message) {
    if (message.length > 16384) return null;
    try {
      final data = jsonDecode(message);
      if (data is Map &&
          data['version'] == 2 &&
          data['type'] == 'forge-ui-preview' &&
          data['component'] is String) {
        final slug = data['component'] as String, p = data['properties'];
        if (p is! Map ||
            p.keys.any((k) => k is! String) ||
            !(validPrimitiveProperties(slug, p) ||
                validInputProperties(slug, p) ||
                validCompositeProperties(slug, p) ||
                validFeedbackProperties(slug, p) ||
                validInteractionProperties(slug, p) ||
                validFormCatalogProperties(slug, p) ||
                validCollectionProperties(slug, p) ||
                validTransientProperties(slug, p) ||
                validAdvancedProperties(slug, p) ||
                validPartProperties(slug, p))) return null;
        final theme = themeFor(p['theme'] is String ? p['theme'] : null);
        if (theme == null ||
            (p['scenario'] != null && p['scenario'] != 'basic')) return null;
        return ForgePreviewSettings(
            component: slug,
            theme: theme,
            catalogProperties: Map<String, Object?>.from(p));
      }
      if (data is! Map ||
          data['version'] != 1 ||
          message.length > 2048 ||
          data['type'] != 'forge-ui-preview' ||
          !['button', 'spinner', 'button-group'].contains(data['component']))
        return null;
      final p = data['properties'];
      if (p is! Map) return null;
      final theme = themeFor(p['theme'] is String ? p['theme'] : null);
      if (theme == null) return null;
      for (final name in [
        'autofocus',
        'onPressed',
        'enabled',
        'loading',
        'outlined',
        'disabled',
        'fullWidth',
        'animated',
        'decorative'
      ]) {
        if (p.containsKey(name) && p[name] is! bool) return null;
      }
      for (final name in [
        'child',
        'loadingLabel',
        'semanticLabel',
        'tooltip',
        'label'
      ]) {
        if (p.containsKey(name) &&
            (p[name] is! String || (p[name] as String).length > 200))
          return null;
      }
      final size = p.containsKey('size')
          ? _enum(p['size'], ForgeSize.values)
          : ForgeSize.md;
      if (size == null) return null;
      final tone = p['tone'] == null || p['tone'] == 'inherit'
          ? null
          : _enum(p['tone'], ForgeTone.values);
      if (p['tone'] != null && p['tone'] != 'inherit' && tone == null)
        return null;
      final appearance = _enum(p['appearance'], ForgeAppearance.values);
      final shape = _enum(p['shape'], ForgeShape.values);
      final variant = _enum(p['variant'], ForgeVariant.values);
      final gap = p.containsKey('gap')
          ? _enum(p['gap'], ForgeSpace.values)
          : ForgeSpace.s2;
      final padding = _enum(p['padding'], ForgeSpace.values);
      for (final name in ['appearance', 'shape', 'variant', 'padding']) {
        if (p[name] != null &&
            p[name] != 'inherit' &&
            {
                  'appearance': appearance,
                  'shape': shape,
                  'variant': variant,
                  'padding': padding
                }[name] ==
                null) return null;
      }
      if (gap == null) return null;
      final label = p['label'] as String? ??
          (data['component'] == 'button-group'
              ? 'Ações'
              : 'Carregando conteúdo');
      if ((data['component'] == 'button-group' ||
              (data['component'] == 'spinner' && p['decorative'] == false)) &&
          label.trim().isEmpty) return null;
      final scenario = p['scenario'] ?? 'basic';
      if (!['basic', 'crud-hierarchy'].contains(scenario) ||
          (data['component'] != 'button' && scenario != 'basic')) return null;
      return ForgePreviewSettings(
          component: data['component'],
          scenario: scenario,
          theme: theme,
          child: p['child'] as String? ?? 'Salvar alterações',
          enabled: p['onPressed'] as bool? ?? p['enabled'] as bool? ?? true,
          loading: p['loading'] == true,
          outlined: p['outlined'] == true,
          disabled: p['disabled'] == true,
          fullWidth: p['fullWidth'] == true,
          autofocus: p['autofocus'] == true,
          size: size,
          tone: tone,
          appearance: appearance,
          shape: shape,
          variant: variant,
          loadingLabel: p['loadingLabel'],
          semanticLabel: p['semanticLabel'],
          tooltip: p['tooltip'],
          animated: p['animated'] != false,
          decorative: p['decorative'] != false,
          label: label,
          gap: gap,
          padding: padding);
    } on FormatException {
      return null;
    }
  }
}
