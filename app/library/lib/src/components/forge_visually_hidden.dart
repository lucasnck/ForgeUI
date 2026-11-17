import 'package:flutter/widgets.dart';

class ForgeVisuallyHidden extends StatelessWidget {
  final String? text;
  final Widget? child;
  const ForgeVisuallyHidden({super.key, this.text, this.child});
  @override
  Widget build(BuildContext context) => SizedBox.shrink(
      child: OverflowBox(
          alignment: Alignment.topLeft,
          minWidth: 0,
          minHeight: 0,
          maxWidth: 1,
          maxHeight: 1,
          child: Opacity(
              opacity: 0,
              alwaysIncludeSemantics: true,
              child: child ?? Text(text ?? ''))));
}
