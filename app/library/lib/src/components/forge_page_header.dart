import 'package:flutter/widgets.dart';

import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import 'forge_divider.dart';
import 'forge_heading.dart';
import 'forge_layout.dart';
import 'forge_text.dart';

/// Page-content heading, not an application AppBar or route manager.
class ForgePageHeader extends StatelessWidget {
  final String titleId;
  final Widget pageTitle;
  final Widget? description;
  final Widget? identity;
  final Widget? breadcrumb;
  final Widget? actions;
  final bool divider;

  const ForgePageHeader({
    super.key,
    required this.titleId,
    required this.pageTitle,
    this.description,
    this.identity,
    this.breadcrumb,
    this.actions,
    this.divider = false,
  });

  @override
  Widget build(BuildContext context) {
    if (titleId.trim().isEmpty) {
      throw ArgumentError.value(
          titleId, 'titleId', 'A stable heading ID is required');
    }
    final palette = ForgeThemeTokens.of(context).palette;
    return Semantics(
      container: true,
      explicitChildNodes: true,
      child: ForgeStack(
        gap: ForgeSpace.s2,
        children: [
          if (breadcrumb != null) breadcrumb!,
          LayoutBuilder(
            builder: (context, box) {
              final maxWidth = box.hasBoundedWidth
                  ? box.maxWidth
                  : palette.layoutContainerNarrow;
              return Wrap(
                spacing: palette.space3,
                runSpacing: palette.space2,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  ConstrainedBox(
                    constraints: BoxConstraints(maxWidth: maxWidth),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        if (identity != null) ...[
                          identity!,
                          SizedBox(width: palette.space2),
                        ],
                        Flexible(
                          fit: FlexFit.loose,
                          child: ForgeStack(
                            gap: ForgeSpace.s1,
                            children: [
                              ForgeHeading(
                                level: 1,
                                semanticId: titleId,
                                child: pageTitle,
                              ),
                              if (description != null)
                                ForgeText(child: description),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (actions != null) actions!,
                ],
              );
            },
          ),
          if (divider) const ForgeDivider(),
        ],
      ),
    );
  }
}
