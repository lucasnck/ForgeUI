import 'package:flutter/widgets.dart';
import 'internal/forge_action.dart';
import 'forge_icon.dart';
import '../generated/forge_icons.g.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';

class ForgeIconButton extends StatelessWidget {
  final ForgeIconName icon;
  final String label;
  final VoidCallback? onPressed;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance? appearance;
  final ForgeVariant? variant;
  final ForgeShape? shape;
  final bool loading, disabled, autofocus;
  final String? loadingLabel, tooltip;
  final FocusNode? focusNode;
  final ValueChanged<bool>? onFocusChange;
  const ForgeIconButton(
      {super.key,
      required this.icon,
      required this.label,
      required this.onPressed,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.appearance,
      this.variant,
      this.shape,
      this.loading = false,
      this.disabled = false,
      this.autofocus = false,
      this.loadingLabel,
      this.tooltip,
      this.focusNode,
      this.onFocusChange});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('IconButton requires a nonblank label.');
    return ForgeAction(
        square: true,
        onPressed: onPressed,
        size: size,
        tone: tone,
        appearance: appearance,
        variant: variant,
        shape: shape,
        loading: loading,
        disabled: disabled,
        autofocus: autofocus,
        tooltip: tooltip,
        focusNode: focusNode,
        onFocusChange: onFocusChange,
        semanticLabel: loading && loadingLabel?.trim().isNotEmpty == true
            ? loadingLabel
            : label,
        child: loading
            ? null
            : ForgeIcon(name: icon, size: ForgeIconSize.inherit));
  }
}
