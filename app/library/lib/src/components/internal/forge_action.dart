import 'package:flutter/material.dart';
import '../../theme/forge_control_style.dart';
import '../../theme/forge_theme_tokens.dart';
import '../../types/component_capabilities.dart';
import '../forge_spinner.dart';

class ForgeAction extends StatelessWidget {
  final VoidCallback? onPressed;
  final bool square;
  final Widget? child;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance? appearance;
  final ForgeVariant? variant;
  final ForgeShape? shape;
  final bool fullWidth;
  final bool disabled;
  final bool loading;
  final String? loadingLabel;
  final String? semanticLabel;
  final String? tooltip;
  final FocusNode? focusNode;
  final bool autofocus;
  final ValueChanged<bool>? onFocusChange;
  @Deprecated('Use appearance or variant; outlined is a compatibility bridge.')
  final bool? outlined;

  const ForgeAction(
      {super.key,
      this.square = false,
      required this.onPressed,
      this.child,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance,
      this.variant,
      this.shape,
      this.fullWidth = false,
      this.disabled = false,
      this.loading = false,
      this.loadingLabel,
      this.semanticLabel,
      this.tooltip,
      this.focusNode,
      this.autofocus = false,
      this.onFocusChange,
      this.outlined});

  @override
  Widget build(BuildContext context) {
    final theme = ForgeThemeTokens.of(context);
    final p = theme.palette;
    // ignore: deprecated_member_use_from_same_package
    final legacyOutlined = outlined;
    final effectiveAppearance = resolveForgeAppearance(
        appearance: appearance, variant: variant, outlined: legacyOutlined);
    final callback = disabled || loading ? null : onPressed;
    final effectiveChild =
        loading && loadingLabel != null && loadingLabel!.isNotEmpty
            ? Text(loadingLabel!)
            : child;
    final content = Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (loading) const ForgeSpinner(size: ForgeSize.xs),
          if (loading && effectiveChild != null) SizedBox(width: p.space2),
          if (effectiveChild != null) Flexible(child: effectiveChild),
        ]);
    var style = forgeActionStyle(p,
        size: size,
        tone: tone,
        appearance: effectiveAppearance,
        shape: shape ?? theme.shape,
        reduceMotion: MediaQuery.maybeOf(context)?.disableAnimations ?? false);
    final visible =
        semanticLabel == null ? content : ExcludeSemantics(child: content);
    if (square) {
      final side = p.number('--component-height-' + size.name);
      style = style.copyWith(
          padding: const WidgetStatePropertyAll(EdgeInsets.zero),
          fixedSize: WidgetStatePropertyAll(Size.square(side)));
    }
    Widget button = effectiveAppearance == ForgeAppearance.outlined ||
            effectiveAppearance == ForgeAppearance.bordered
        ? OutlinedButton(
            onPressed: callback,
            style: style,
            focusNode: focusNode,
            autofocus: autofocus,
            onFocusChange: onFocusChange,
            child: visible)
        : FilledButton(
            onPressed: callback,
            style: style,
            focusNode: focusNode,
            autofocus: autofocus,
            onFocusChange: onFocusChange,
            child: visible);
    if (tooltip != null) button = Tooltip(message: tooltip!, child: button);
    button = Opacity(
        opacity: callback == null ? p.opacityDisabled : p.opacityFull,
        child: button);
    button =
        Semantics(label: semanticLabel, liveRegion: loading, child: button);
    if (!fullWidth) return button;
    return LayoutBuilder(
        builder: (context, constraints) => SizedBox(
            width: constraints.hasBoundedWidth ? constraints.maxWidth : null,
            child: button));
  }
}
