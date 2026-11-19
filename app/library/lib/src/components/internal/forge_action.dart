import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import '../../theme/forge_action_palette.dart';
import '../../theme/forge_native_action_recipe.dart';
import '../../theme/forge_theme_tokens.dart';
import '../../types/component_capabilities.dart';
import '../forge_spinner.dart';
import '../forge_tooltip.dart';

/// Shared native action for ForgeButton and ForgeIconButton.
/// It uses Web-owned tokens rather than Material default button styles.
class ForgeAction extends StatefulWidget {
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

  const ForgeAction({
    super.key,
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
    this.outlined,
  });

  @override
  State<ForgeAction> createState() => _ForgeActionState();
}

class _ForgeActionState extends State<ForgeAction> {
  bool hovered = false;
  bool pressed = false;
  bool focused = false;

  bool get enabled => !widget.disabled && !widget.loading && widget.onPressed != null;

  void activate() {
    if (enabled) widget.onPressed?.call();
  }

  void setPressed(bool value) {
    if (pressed != value && mounted) setState(() => pressed = value);
  }

  void setHovered(bool value) {
    if (hovered != value && mounted) setState(() => hovered = value);
  }

  @override
  void didUpdateWidget(covariant ForgeAction oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!enabled) {
      pressed = false;
      hovered = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = ForgeThemeTokens.of(context);
    final p = theme.palette;
    // ignore: deprecated_member_use_from_same_package
    final legacyOutlined = widget.outlined;
    final appearance = resolveForgeAppearance(
      appearance: widget.appearance,
      variant: widget.variant,
      outlined: legacyOutlined,
    );
    final recipe = forgeNativeActionRecipe(
      p,
      size: widget.size,
      tone: widget.tone,
      appearance: appearance,
      shape: widget.shape ?? theme.shape,
      reduceMotion: MediaQuery.maybeOf(context)?.disableAnimations ?? false,
    );
    final label = widget.loading && widget.loadingLabel?.isNotEmpty == true
        ? Text(widget.loadingLabel!)
        : widget.child;
    Widget result = LayoutBuilder(builder: (context, constraints) {
      final bounded = constraints.hasBoundedWidth;
      final visualContent = Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (widget.loading) const ForgeSpinner(size: ForgeSize.xs),
          if (widget.loading && label != null) SizedBox(width: p.space2),
          if (label != null)
            bounded ? Flexible(child: label) : label,
        ],
      );
      final painted = AnimatedContainer(
        duration: recipe.duration,
        curve: Curves.easeOut,
        height: widget.square ? recipe.height : null,
        width: widget.square
            ? recipe.height
            : widget.fullWidth && bounded
                ? constraints.maxWidth
                : null,
        constraints: BoxConstraints(minHeight: recipe.height),
        padding: widget.square ? EdgeInsets.zero : recipe.padding,
        decoration: recipe.decoration(
          hovered: enabled && hovered,
          pressed: enabled && pressed,
          focused: enabled && focused,
        ),
        alignment: Alignment.center,
        child: DefaultTextStyle.merge(
          style: recipe.textStyle,
          child: visualContent,
        ),
      );
      final target = ConstrainedBox(
        constraints: BoxConstraints(
          minWidth: forgeMobileActionTarget(recipe.height),
          minHeight: forgeMobileActionTarget(recipe.height),
        ),
        child: Center(widthFactor: 1, heightFactor: 1, child: painted),
      );
      return MouseRegion(
        cursor: enabled ? SystemMouseCursors.click : SystemMouseCursors.basic,
        onEnter: (_) => setHovered(true),
        onExit: (_) => setHovered(false),
        child: GestureDetector(
          behavior: HitTestBehavior.opaque,
          excludeFromSemantics: true,
          onTapDown: enabled ? (_) => setPressed(true) : null,
          onTapUp: enabled ? (_) => setPressed(false) : null,
          onTapCancel: enabled ? () => setPressed(false) : null,
          onTap: enabled ? activate : null,
          child: target,
        ),
      );
    });

    result = Focus(
      focusNode: widget.focusNode,
      autofocus: widget.autofocus,
      canRequestFocus: enabled,
      skipTraversal: !enabled,
      onFocusChange: (value) {
        if (mounted && focused != value) setState(() => focused = value);
        widget.onFocusChange?.call(value);
      },
      onKeyEvent: (node, event) {
        if (!enabled || event is! KeyDownEvent) return KeyEventResult.ignored;
        if (event.logicalKey == LogicalKeyboardKey.enter ||
            event.logicalKey == LogicalKeyboardKey.space) {
          activate();
          return KeyEventResult.handled;
        }
        return KeyEventResult.ignored;
      },
      child: result,
    );
    result = Semantics(
      container: true,
      button: true,
      enabled: enabled,
      label: widget.semanticLabel,
      liveRegion: widget.loading,
      onTap: enabled ? activate : null,
      child: widget.semanticLabel != null
          ? ExcludeSemantics(child: result)
          : result,
    );
    result = Opacity(
      opacity: enabled ? p.opacityFull : p.opacityDisabled,
      child: result,
    );
    if (widget.tooltip?.trim().isNotEmpty == true) {
      result = ForgeTooltip(content: widget.tooltip!, child: result);
    }
    return result;
  }
}
