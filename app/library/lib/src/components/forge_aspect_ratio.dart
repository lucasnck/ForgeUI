import 'package:flutter/widgets.dart';

class ForgeAspectRatio extends StatelessWidget {
  final ForgeAspectRatioValue ratio;
  final Widget child;
  const ForgeAspectRatio(
      {super.key, required this.ratio, this.child = const SizedBox.shrink()});
  @override
  Widget build(BuildContext context) =>
      AspectRatio(aspectRatio: ratio.value, child: child);
}

enum ForgeAspectRatioValue {
  square(1),
  video(16 / 9),
  photo(4 / 3),
  portrait(3 / 4);

  final double value;
  const ForgeAspectRatioValue(this.value);
}
