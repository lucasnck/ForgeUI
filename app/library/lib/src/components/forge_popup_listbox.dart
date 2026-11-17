import 'package:flutter/material.dart';
import '../controllers/popup_listbox_controller.dart';
import '../types/primitives.dart';
import '../theme/forge_theme_tokens.dart';

class ForgePopupListbox<T> extends StatelessWidget {
  final ForgePopupListboxController popup;
  final List<T> items;
  final String Function(T item) getOptionLabel;
  final String Function(T item, int index)? getOptionKey;
  final String listboxLabel;
  final bool animated;
  final ForgeAnimationEffect animationEffect;
  const ForgePopupListbox(
      {super.key,
      required this.popup,
      required this.items,
      required this.getOptionLabel,
      this.getOptionKey,
      required this.listboxLabel,
      this.animated = true,
      this.animationEffect = ForgeAnimationEffect.scale});
  @override
  Widget build(BuildContext context) => AnimatedBuilder(
      animation: popup,
      builder: (context, _) {
        final open = popup.isOpen && items.isNotEmpty;
        if (open && items.length != popup.count)
          throw ArgumentError('Popup items must match controller count.');
        final keys = [
          for (var i = 0; i < items.length; i++)
            getOptionKey?.call(items[i], i) ?? i.toString()
        ];
        if (keys.toSet().length != keys.length)
          throw ArgumentError('Popup options require unique keys.');
        return Offstage(
            offstage: !open,
            child: ExcludeFocus(
                child: Semantics(
                    container: true,
                    label: listboxLabel,
                    child: Material(
                        color: ForgeThemeTokens.of(context)
                            .palette
                            .colorSurfaceDefault,
                        elevation: 4,
                        child: ConstrainedBox(
                            constraints: const BoxConstraints(maxHeight: 240),
                            child: ListView(
                                shrinkWrap: true,
                                padding: EdgeInsets.zero,
                                children: [
                                  for (var i = 0; i < items.length; i++)
                                    ForgePopupListboxItem(
                                        key: ValueKey(keys[i]),
                                        popup: popup,
                                        index: i,
                                        label: getOptionLabel(items[i]),
                                        animated: animated)
                                ]))))));
      });
}

class ForgePopupListboxItem extends StatelessWidget {
  final ForgePopupListboxController popup;
  final int index;
  final String label;
  final bool animated;
  const ForgePopupListboxItem(
      {super.key,
      required this.popup,
      required this.index,
      required this.label,
      this.animated = true});
  @override
  Widget build(BuildContext context) {
    if (index < 0 || index >= popup.count)
      throw ArgumentError('Popup index out of bounds.');
    return Semantics(
        selected: popup.activeIndex == index,
        onTap: () => popup.acceptOption(index),
        child: Listener(
            onPointerDown: (event) {
              if (event.buttons == 1) popup.acceptOption(index);
            },
            child: ListTile(
                selected: popup.activeIndex == index, title: Text(label))));
  }
}
