import 'package:flutter/material.dart';
import 'package:forge_ui/forge_ui.dart';
import 'form_catalog_contracts.dart';

typedef ForgeDemoProfile = ({String email});

class ForgeFormCatalogExample extends StatefulWidget {
  final String slug;
  final Map<String, Object?> properties;
  const ForgeFormCatalogExample(
      {super.key, required this.slug, this.properties = const {}});
  @override
  State<ForgeFormCatalogExample> createState() => _FormCatalogState();
}

class _FormCatalogState extends State<ForgeFormCatalogExample> {
  ForgeTypedFormController<ForgeDemoProfile>? controller;
  final path = ForgeFieldPath<ForgeDemoProfile>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => formCatalogFamilies[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      formCatalogContracts[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<ForgeDemoProfile> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<ForgeDemoProfile>(
          initialValues: (email: ''));
      sync();
    }
  }

  void sync() {
    owner.replaceValues((email: text('modelValue')));
    owner.setDisabled(flag('disabled'));
    owner.setError(path.name,
        text('providerError').isEmpty ? null : text('providerError'));
  }

  @override
  void didUpdateWidget(covariant ForgeFormCatalogExample old) {
    super.didUpdateWidget(old);
    if (family != 'list') {
      if (old.properties['modelValue'] != widget.properties['modelValue'])
        owner.replaceValues((email: text('modelValue')));
      if (old.properties['disabled'] != widget.properties['disabled'])
        owner.setDisabled(flag('disabled'));
      if (old.properties['providerError'] != widget.properties['providerError'])
        owner.setError(path.name,
            text('providerError').isEmpty ? null : text('providerError'));
    }
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  Widget field() => family == 'form-field'
      ? ForgeFormField(
          controlId: 'form-example-email',
          label: text('label'),
          children: [
              const ForgeFormFieldHeader(),
              ForgeFormFieldBody(
                  controlBuilder: (context, field) => ForgeInput(
                        control: field.binding,
                        name: path.name,
                        value: owner.values.email,
                        onChanged: (v) {
                          owner.writeField(path, v, notify: false);
                          setState(() => edits++);
                        },
                        semanticLabel: field.label,
                        invalid: field.invalid,
                        readOnly: flag('readOnly'),
                        disabled: flag('disabled'),
                        required: flag('required'),
                        validationMessage: 'Preencha o campo.',
                      )),
              ForgeFormFieldFooter(
                  hint: text('hint'),
                  error: text('errorOverride').isEmpty
                      ? owner.errors[path.name]
                      : text('errorOverride')),
            ])
      : ForgeFormFieldInput<ForgeDemoProfile>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<ForgeDemoProfile>(
      controller: owner,
      child: ForgeForm(
          binding: owner,
          loading: flag('loading'),
          loadingLabel: 'Enviando',
          noValidate: flag('noValidate'),
          onSubmit: (event) {
            if (flag('cancelSubmit')) {
              event.cancel();
              setState(() => feedback = 'Envio cancelado');
            }
          },
          onReset: (event) {
            if (flag('cancelReset')) {
              event.cancel();
              setState(() => feedback = 'Reset cancelado');
            } else {
              setState(() => resets++);
            }
          },
          onValidSubmit: (data, event) => setState(() {
                submits++;
                feedback = 'Enviado: ' +
                    (data.get(path.name)?.toString() ?? '') +
                    ' | ação: ' +
                    (data.get('action')?.toString() ?? '');
              }),
          children: [
            ForgeFormHeader(children: [Text(text('titleText'))]),
            ForgeFormBody(children: [field()]),
            const ForgeFormFooter(children: [
              ForgeButton(
                  type: ForgeButtonType.submit,
                  name: 'action',
                  value: 'save',
                  child: Text('Enviar')),
              ForgeButton(type: ForgeButtonType.reset, child: Text('Restaurar'))
            ])
          ]));
  Widget list() => ForgeList(label: text('label'), children: [
        ForgeListHeader(child: Text(text('titleText'))),
        ForgeListBody(items: [
          ForgeListItem(child: Text(text('firstItem'))),
          ForgeListItem(child: Text(text('secondItem')))
        ]),
        ForgeListFooter(
            child: ForgeButton(
                onPressed: () => setState(() => actions++),
                child: Text(text('actionLabel'))))
      ]);
  @override
  Widget build(BuildContext context) =>
      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        if (family == 'list')
          list()
        else
          ListenableBuilder(listenable: owner, builder: (context, child) => form()),
        if (family == 'list')
          Text('Ações: $actions')
        else
          Text('Edições: $edits · Envios: $submits · Resets: $resets'),
        if (feedback.isNotEmpty) Text(feedback)
      ]);
}
