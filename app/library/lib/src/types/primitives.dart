import 'package:flutter/widgets.dart';

enum ForgeTextSize {
  xs('xs'),
  sm('sm'),
  md('md'),
  lg('lg'),
  xl('xl'),
  xl2('2xl'),
  xl3('3xl'),
  xl4('4xl'),
  xl5('5xl'),
  xl6('6xl'),
  xl7('7xl');

  final String token;
  const ForgeTextSize(this.token);
}

enum ForgeTextTone { defaultTone, muted, brand, danger, success, inverse }

enum ForgeFontWeight { regular, medium, semibold, bold }

enum ForgeAlign { start, center, end, stretch, baseline }

enum ForgeJustify { start, center, end, between }

enum ForgeContainerSize { narrow, wide }

enum ForgeElevation { flat, raised, floating }

enum ForgeSkeletonKind { rectangle, text, circle }

enum ForgeIconSize { xs, sm, md, lg, xl, inherit }

enum ForgeAnimationEffect { none, fade, scale }

enum ForgeSemanticRole {
  generic,
  section,
  article,
  aside,
  navigation,
  header,
  footer,
  list,
  orderedList,
  listItem,
  form
}

enum ForgeTextSemanticRole { inline, paragraph, small, strong }

enum ForgeSemanticFlag { off, on, mixed }

enum ForgeInvalidState { valid, invalid, grammar, spelling }

enum ForgeLocale { ptBR, es, en }

enum ForgeCurrencyDisplay { code, symbol, narrowSymbol, name }

enum ForgeNavigationDirection { ltr, rtl }

enum ForgeNavigationOrientation { horizontal, vertical }

enum ForgeSelectionMode { single, multiple }

enum ForgeAnnouncementPoliteness { off, polite, assertive }

enum ForgeStepStatus { pending, complete, error }

class ForgeResponsive<T> {
  final T base;
  final T? mobile, wide;
  const ForgeResponsive({required this.base, this.mobile, this.wide});
  T resolve(double width, double mobileBreakpoint, double wideBreakpoint) =>
      width >= wideBreakpoint
          ? wide ?? mobile ?? base
          : width >= mobileBreakpoint
              ? mobile ?? base
              : base;
}

class ForgeProvided<T> {
  final T value;
  const ForgeProvided(this.value);
}

class ForgeDescriptionBinding {
  final String id, text;
  const ForgeDescriptionBinding({required this.id, required this.text});
}

class ForgeControlBinding {
  final FocusNode focusNode;
  final String id;
  final bool _ownsFocus;
  ForgeControlBinding({required this.id, FocusNode? focusNode})
      : focusNode = focusNode ?? FocusNode(),
        _ownsFocus = focusNode == null;
  void dispose() {
    if (_ownsFocus) focusNode.dispose();
  }
}

typedef ForgeControlBuilder = Widget Function(
    BuildContext context, ForgeControlBinding binding);

class ForgeLaunchRequest {
  final String href;
  final String? target, rel, download, language;
  const ForgeLaunchRequest(this.href,
      {this.target, this.rel, this.download, this.language});
}

typedef ForgeLinkLauncher = void Function(ForgeLaunchRequest request);

class ForgeNavigationAdapter extends InheritedWidget {
  final ForgeLinkLauncher launch;
  const ForgeNavigationAdapter(
      {super.key, required this.launch, required super.child});
  static ForgeLinkLauncher? maybeOf(BuildContext context) => context
      .dependOnInheritedWidgetOfExactType<ForgeNavigationAdapter>()
      ?.launch;
  @override
  bool updateShouldNotify(ForgeNavigationAdapter oldWidget) =>
      oldWidget.launch != launch;
}
