import 'package:flutter/widgets.dart';
import 'forge_badge.dart';
import 'forge_icon_button.dart';
import '../types/component_capabilities.dart';
import '../generated/forge_icons.g.dart';

class ForgeTag extends StatelessWidget {
  final Widget? child;
  final String? text, removeLabel;
  final VoidCallback? onRemove;
  final bool disabled, fullWidth;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  const ForgeTag(
      {super.key,
      this.child,
      this.text,
      this.removeLabel,
      this.onRemove,
      this.disabled = false,
      this.fullWidth = false,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.soft,
      this.shape});
  @override
  Widget build(BuildContext context) {
    if (onRemove != null &&
        (removeLabel == null || removeLabel!.trim().isEmpty))
      throw ArgumentError('Removable Tag requires a nonblank removeLabel.');
    return ForgeBadge(
        size: size,
        tone: tone,
        appearance: appearance,
        shape: shape,
        fullWidth: fullWidth,
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Flexible(child: child ?? Text(text ?? '')),
          if (onRemove != null)
            ForgeIconButton(
                icon: ForgeIconName.close,
                label: removeLabel!,
                onPressed: disabled ? null : onRemove,
                size: size,
                tone: tone,
                appearance: ForgeAppearance.ghost),
        ]));
  }
}

class ForgeTagConfiguration {
  final String? text, removeLabel;
  final Widget? child;
  final VoidCallback? onRemove;
  final bool disabled, fullWidth;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  const ForgeTagConfiguration(
      {this.text,
      this.child,
      this.removeLabel,
      this.onRemove,
      this.disabled = false,
      this.fullWidth = false,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.soft,
      this.shape});
  ForgeTag build() => ForgeTag(
      text: text,
      child: child,
      removeLabel: removeLabel,
      onRemove: onRemove,
      disabled: disabled,
      fullWidth: fullWidth,
      size: size,
      tone: tone,
      appearance: appearance,
      shape: shape);
}
