import 'dart:math' as math;
import 'package:flutter/widgets.dart';
import 'package:flutter/services.dart';
import '../theme/forge_theme_tokens.dart';
import '../theme/forge_control_style.dart';
import '../theme/forge_primitive_style.dart';
import '../types/component_capabilities.dart';
import '../types/forms.dart';

enum _CheckKind { checkbox, switchControl, radio }

abstract class ForgeCheckable extends StatefulWidget {
  final bool? checked;
  final bool defaultChecked;
  final ValueChanged<bool>? onChanged;
  final bool disabled, required, fullWidth, animated;
  final bool? invalid;
  final String? name, semanticLabel;
  final String value;
  final ForgeFormBinding? form;
  final FocusNode? focusNode;
  final bool autofocus;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeShape? shape;
  final _CheckKind _kind;
  const ForgeCheckable(
      {super.key,
      this.checked,
      this.defaultChecked = false,
      this.onChanged,
      this.disabled = false,
      this.required = false,
      this.fullWidth = false,
      this.animated = true,
      this.invalid,
      this.name,
      this.semanticLabel,
      this.value = 'on',
      this.form,
      this.focusNode,
      this.autofocus = false,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.brand,
      this.shape,
      required _CheckKind kind})
      : _kind = kind;
  @override
  State<ForgeCheckable> createState() => _CheckableState();
}

class ForgeCheckbox extends ForgeCheckable {
  const ForgeCheckbox(
      {super.key,
      super.checked,
      super.defaultChecked,
      super.onChanged,
      super.disabled,
      super.required,
      super.fullWidth,
      super.animated,
      super.invalid,
      super.name,
      super.semanticLabel,
      super.value,
      super.form,
      super.focusNode,
      super.autofocus,
      super.size,
      super.tone,
      super.shape})
      : super(kind: _CheckKind.checkbox);
}

class ForgeSwitch extends ForgeCheckable {
  const ForgeSwitch(
      {super.key,
      super.checked,
      super.defaultChecked,
      super.onChanged,
      super.disabled,
      super.required,
      super.fullWidth,
      super.invalid,
      super.name,
      super.semanticLabel,
      super.value,
      super.form,
      super.focusNode,
      super.autofocus,
      super.size,
      super.tone})
      : super(kind: _CheckKind.switchControl);
}

class ForgeRadio extends ForgeCheckable {
  const ForgeRadio(
      {super.key,
      super.checked,
      super.defaultChecked,
      super.onChanged,
      super.disabled,
      super.required,
      super.fullWidth,
      super.animated,
      super.invalid,
      super.name,
      super.semanticLabel,
      super.value,
      super.form,
      super.focusNode,
      super.autofocus,
      super.size,
      super.tone})
      : super(kind: _CheckKind.radio);
}

class _CheckableState extends State<ForgeCheckable> {
  late bool _checked;
  late FocusNode _focus;
  late bool _ownsFocus;
  bool _focused = false;
  ForgeFormBinding? _form;
  bool get selected => widget.checked ?? _checked;
  bool get disabled => widget.disabled || (_form?.disabled ?? false);
  @override
  void initState() {
    super.initState();
    _checked = widget.defaultChecked;
    attach();
  }

  void attach() {
    _ownsFocus = widget.focusNode == null;
    _focus = widget.focusNode ?? FocusNode();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
  }

  void bind() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (next != _form) {
      _form?.unregister(this);
      _form = next;
    }
    _form?.register(
        this,
        ForgeFieldRegistration(
            name: widget.name ?? '',
            enabled: () => !disabled && widget.name?.isNotEmpty == true,
            values: () => selected ? [widget.value] : [],
            validate: () =>
                !widget.required ||
                (widget._kind == _CheckKind.radio && widget.name != null
                    ? _form!.data().getAll(widget.name!).isNotEmpty
                    : selected),
            reset: () {
              if (mounted) setState(() => _checked = widget.defaultChecked);
            },
            focusNode: _focus));
  }

  @override
  void didUpdateWidget(covariant ForgeCheckable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.focusNode != widget.focusNode) {
      if (_ownsFocus) _focus.dispose();
      attach();
    }
    bind();
  }

  void change() {
    if (disabled) return;
    final next = widget._kind == _CheckKind.radio ? true : !selected;
    if (next == selected) return;
    if (widget.checked == null) setState(() => _checked = next);
    widget.onChanged?.call(next);
    if (widget.name != null) _form?.changed(widget.name!);
  }

  @override
  void dispose() {
    _form?.unregister(this);
    if (_ownsFocus) _focus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final t = ForgeThemeTokens.of(context), p = t.palette;
    final action = forgeActionColors(p, widget.tone);
    final accent = widget.tone == ForgeTone.brand
        ? p.color('--color-checkable-brand-background')
        : widget.tone == ForgeTone.inverse
            ? p.colorTextInverse
            : action.background;
    final indicator = [
      p.length3,
      p.length3,
      p.length3,
      p.length4,
      p.length5
    ][widget.size.index];
    Widget visual;
    final duration = Duration(
        milliseconds: !widget.animated ||
                (MediaQuery.maybeOf(context)?.disableAnimations ?? false)
            ? 0
            : p.motionFast.round());
    if (widget._kind == _CheckKind.switchControl) {
      final width = p.number('--switch-track-width-${widget.size.name}'),
          height = p.number('--switch-track-height-${widget.size.name}'),
          thumb = p.number('--switch-thumb-size-${widget.size.name}');
      visual = SizedBox(
          width: width,
          height: math.max(height, thumb),
          child: Stack(alignment: Alignment.center, children: [
            Container(
                width: width,
                height: height,
                decoration: BoxDecoration(
                    color: (selected ? accent : p.colorTextMuted)
                        .withValues(alpha: p.switchTrackOpacity),
                    border: Border.all(
                        color: widget.invalid == true
                            ? p.colorTextDanger
                            : p.colorBorderDefault,
                        width: p.borderWidthThin),
                    borderRadius: BorderRadius.circular(p.radiusFull))),
            AnimatedAlign(
                duration: duration,
                alignment: selected
                    ? AlignmentDirectional.centerEnd
                    : AlignmentDirectional.centerStart,
                child: Container(
                    width: thumb,
                    height: thumb,
                    decoration: BoxDecoration(
                        color: selected ? accent : p.colorTextDefault,
                        shape: BoxShape.circle,
                        border: Border.all(
                            color: p.colorBorderDefault,
                            width: p.borderWidthThin)))),
          ]));
    } else {
      final radio = widget._kind == _CheckKind.radio;
      visual = AnimatedContainer(
          duration: duration,
          width: indicator,
          height: indicator,
          decoration: BoxDecoration(
              color: selected && !radio ? accent : p.colorSurfaceDefault,
              shape: radio ? BoxShape.circle : BoxShape.rectangle,
              borderRadius:
                  radio ? null : forgeRadius(p, widget.shape ?? t.shape),
              border: Border.all(
                  color: widget.invalid == true
                      ? p.colorTextDanger
                      : p.colorBorderDefault,
                  width: p.borderWidthThin)),
          child: !selected
              ? null
              : radio
                  ? Padding(
                      padding: EdgeInsets.all(p.borderWidthThick),
                      child: DecoratedBox(
                          decoration: BoxDecoration(
                              color: accent, shape: BoxShape.circle)))
                  : CustomPaint(
                      painter:
                          _CheckMark(action.foreground, p.borderWidthThick)));
    }
    final minimum = math.max(48.0,
        p.number('--component-height-${widget.size.name}'));
    visual =
        SizedBox(width: minimum, height: minimum, child: Center(child: visual));
    if (_focused)
      visual = DecoratedBox(
          decoration: BoxDecoration(
              border: Border.all(
                  color: p.colorFocusRing, width: p.borderWidthFocus),
              borderRadius: BorderRadius.circular(p.radiusSm)),
          child: visual);
    Widget target = Semantics(
        label: widget.semanticLabel,
        enabled: !disabled,
        focusable: !disabled,
        focused: _focused,
        checked: widget._kind == _CheckKind.switchControl ? null : selected,
        toggled: widget._kind == _CheckKind.switchControl ? selected : null,
        inMutuallyExclusiveGroup: widget._kind == _CheckKind.radio,
        onTap: disabled ? null : change,
        child: ExcludeSemantics(
            child: Focus(
                focusNode: _focus,
                autofocus: widget.autofocus,
                canRequestFocus: !disabled,
                skipTraversal: disabled,
                onFocusChange: (value) {
                  if (mounted) setState(() => _focused = value);
                },
                onKeyEvent: (node, event) {
                  if (disabled || event is! KeyDownEvent) {
                    return KeyEventResult.ignored;
                  }
                  if (event.logicalKey == LogicalKeyboardKey.space ||
                      event.logicalKey == LogicalKeyboardKey.enter) {
                    change();
                    return KeyEventResult.handled;
                  }
                  return KeyEventResult.ignored;
                },
                child: GestureDetector(
                    behavior: HitTestBehavior.opaque,
                    onTap: disabled ? null : change,
                    child: visual))));
    target = Opacity(
        opacity: disabled ? p.opacityDisabled : p.opacityFull, child: target);
    if (!widget.fullWidth) return target;
    return SizedBox(
        width: double.infinity,
        child:
            Align(alignment: AlignmentDirectional.centerStart, child: target));
  }
}

class _CheckMark extends CustomPainter {
  final Color color;
  final double stroke;
  const _CheckMark(this.color, this.stroke);
  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(size.width * .2, size.height * .5)
      ..lineTo(size.width * .43, size.height * .75)
      ..lineTo(size.width * .8, size.height * .25);
    canvas.drawPath(
        path,
        Paint()
          ..color = color
          ..style = PaintingStyle.stroke
          ..strokeWidth = stroke
          ..strokeCap = StrokeCap.round);
  }

  @override
  bool shouldRepaint(_CheckMark old) =>
      old.color != color || old.stroke != stroke;
}
