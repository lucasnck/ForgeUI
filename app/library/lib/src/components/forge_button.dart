import 'package:flutter/widgets.dart';
import 'internal/forge_action.dart';
import 'forge_form.dart';
import '../types/forms.dart';

class ForgeButton extends ForgeAction {
  final ForgeButtonType type;
  final String? name, value;
  const ForgeButton(
      {super.key,
      super.onPressed,
      super.child,
      super.size,
      super.tone,
      super.appearance,
      super.variant,
      super.shape,
      super.fullWidth,
      super.disabled,
      super.loading,
      super.loadingLabel,
      super.semanticLabel,
      super.tooltip,
      super.focusNode,
      super.autofocus,
      super.onFocusChange,
      super.outlined,
      this.type = ForgeButtonType.button,
      this.name,
      this.value});
  @override
  Widget build(BuildContext context) {
    final form = ForgeFormScope.maybeOf(context),
        busy = loading ||
            (type == ForgeButtonType.submit && (form?.loading ?? false));
    return ForgeAction(
        onPressed: type == ForgeButtonType.button
            ? onPressed
            : () {
                onPressed?.call();
                forgeActivateForm(context, type, name: name, value: value);
              },
        child: child,
        size: size,
        tone: tone,
        appearance: appearance,
        variant: variant,
        shape: shape,
        fullWidth: fullWidth,
        disabled: disabled,
        loading: busy,
        loadingLabel: loadingLabel ??
            (type == ForgeButtonType.submit ? form?.loadingLabel : null),
        semanticLabel: semanticLabel,
        tooltip: tooltip,
        focusNode: focusNode,
        autofocus: autofocus,
        onFocusChange: onFocusChange,
        // ignore: deprecated_member_use_from_same_package
        outlined: outlined);
  }
}
