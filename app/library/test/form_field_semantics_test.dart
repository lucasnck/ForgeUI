import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';

void main() {
  testWidgets(
      'field associates only mounted hint/error and preserves native input state',
      (t) async {
    final handle = t.ensureSemantics();
    try {
      String? hint = 'Ajuda', error = 'Mensagem de erro';
      late StateSetter update;
      await t.pumpWidget(MaterialApp(
          theme: ForgeThemeData.light(),
          home: Scaffold(body: StatefulBuilder(builder: (context, set) {
            update = set;
            return ForgeFormField(
                controlId: 'name',
                label: 'Nome',
                hint: hint,
                error: error,
                controlBuilder: (context, field) => ForgeInput(
                    control: field.binding, semanticLabel: field.label));
          }))));
      await t.tap(find.text('Nome'));
      await t.pump();
      expect(t.widget<TextField>(find.byType(TextField)).focusNode!.hasFocus,
          isTrue);
      await t.enterText(find.byType(TextField), 'Valor mantido');
      await t.pump();
      var data = t.getSemantics(find.byType(TextField)).getSemanticsData();
      expect(data.hint, contains('Ajuda'));
      expect(data.hint, contains('Mensagem de erro'));
      expect(data.validationResult, SemanticsValidationResult.invalid);
      update(() {
        hint = 'Nova ajuda';
        error = null;
      });
      await t.pump();
      data = t.getSemantics(find.byType(TextField)).getSemanticsData();
      expect(data.hint, contains('Nova ajuda'));
      expect(data.hint, isNot(contains('Mensagem de erro')));
      expect(data.validationResult, SemanticsValidationResult.none);
      expect(t.widget<TextField>(find.byType(TextField)).controller!.text,
          'Valor mantido');
      update(() => hint = null);
      await t.pump();
      expect(t.getSemantics(find.byType(TextField)).getSemanticsData().hint,
          isEmpty);
    } finally {
      handle.dispose();
    }
  });
}
