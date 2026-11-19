// Generated from actual copyable native interaction snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
typedef SnippetProfile0=({String email});
const snippetContracts0=<String,Map<String,Map<String,Object?>>>{"list":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"titleText":{"kind":"text","defaultValue":"Itens disponíveis","nonblank":true},"firstItem":{"kind":"text","defaultValue":"Primeiro registro","nonblank":true},"secondItem":{"kind":"text","defaultValue":"Segundo registro","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Adicionar","nonblank":true}}};
const snippetFamilies0=<String,String>{"list":"list"};
class FormSnippet0 extends StatefulWidget {final String slug='list';final Map<String,Object?> properties=const {"label": "Registros", "titleText": "Itens disponíveis", "firstItem": "Primeiro registro", "secondItem": "Segundo registro", "actionLabel": "Adicionar"};const FormSnippet0({super.key});@override State<FormSnippet0> createState()=>_FormSnippetState0();}
class _FormSnippetState0 extends State<FormSnippet0> {
  ForgeTypedFormController<SnippetProfile0>? controller;
  final path = ForgeFieldPath<SnippetProfile0>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies0[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts0[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile0> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile0>(
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
  void didUpdateWidget(covariant FormSnippet0 old) {
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
      : ForgeFormFieldInput<SnippetProfile0>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile0>(
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

typedef SnippetProfile1=({String email});
const snippetContracts1=<String,Map<String,Map<String,Object?>>>{"list-header":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"titleText":{"kind":"text","defaultValue":"Itens disponíveis","nonblank":true},"firstItem":{"kind":"text","defaultValue":"Primeiro registro","nonblank":true},"secondItem":{"kind":"text","defaultValue":"Segundo registro","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Adicionar","nonblank":true}}};
const snippetFamilies1=<String,String>{"list-header":"list"};
class FormSnippet1 extends StatefulWidget {final String slug='list-header';final Map<String,Object?> properties=const {"label": "Registros", "titleText": "Itens disponíveis", "firstItem": "Primeiro registro", "secondItem": "Segundo registro", "actionLabel": "Adicionar"};const FormSnippet1({super.key});@override State<FormSnippet1> createState()=>_FormSnippetState1();}
class _FormSnippetState1 extends State<FormSnippet1> {
  ForgeTypedFormController<SnippetProfile1>? controller;
  final path = ForgeFieldPath<SnippetProfile1>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies1[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts1[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile1> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile1>(
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
  void didUpdateWidget(covariant FormSnippet1 old) {
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
      : ForgeFormFieldInput<SnippetProfile1>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile1>(
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

typedef SnippetProfile2=({String email});
const snippetContracts2=<String,Map<String,Map<String,Object?>>>{"list-body":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"titleText":{"kind":"text","defaultValue":"Itens disponíveis","nonblank":true},"firstItem":{"kind":"text","defaultValue":"Primeiro registro","nonblank":true},"secondItem":{"kind":"text","defaultValue":"Segundo registro","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Adicionar","nonblank":true}}};
const snippetFamilies2=<String,String>{"list-body":"list"};
class FormSnippet2 extends StatefulWidget {final String slug='list-body';final Map<String,Object?> properties=const {"label": "Registros", "titleText": "Itens disponíveis", "firstItem": "Primeiro registro", "secondItem": "Segundo registro", "actionLabel": "Adicionar"};const FormSnippet2({super.key});@override State<FormSnippet2> createState()=>_FormSnippetState2();}
class _FormSnippetState2 extends State<FormSnippet2> {
  ForgeTypedFormController<SnippetProfile2>? controller;
  final path = ForgeFieldPath<SnippetProfile2>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies2[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts2[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile2> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile2>(
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
  void didUpdateWidget(covariant FormSnippet2 old) {
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
      : ForgeFormFieldInput<SnippetProfile2>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile2>(
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

typedef SnippetProfile3=({String email});
const snippetContracts3=<String,Map<String,Map<String,Object?>>>{"list-footer":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"titleText":{"kind":"text","defaultValue":"Itens disponíveis","nonblank":true},"firstItem":{"kind":"text","defaultValue":"Primeiro registro","nonblank":true},"secondItem":{"kind":"text","defaultValue":"Segundo registro","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Adicionar","nonblank":true}}};
const snippetFamilies3=<String,String>{"list-footer":"list"};
class FormSnippet3 extends StatefulWidget {final String slug='list-footer';final Map<String,Object?> properties=const {"label": "Registros", "titleText": "Itens disponíveis", "firstItem": "Primeiro registro", "secondItem": "Segundo registro", "actionLabel": "Adicionar"};const FormSnippet3({super.key});@override State<FormSnippet3> createState()=>_FormSnippetState3();}
class _FormSnippetState3 extends State<FormSnippet3> {
  ForgeTypedFormController<SnippetProfile3>? controller;
  final path = ForgeFieldPath<SnippetProfile3>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies3[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts3[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile3> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile3>(
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
  void didUpdateWidget(covariant FormSnippet3 old) {
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
      : ForgeFormFieldInput<SnippetProfile3>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile3>(
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

typedef SnippetProfile4=({String email});
const snippetContracts4=<String,Map<String,Map<String,Object?>>>{"list-item":{"label":{"kind":"text","defaultValue":"Registros","nonblank":true},"titleText":{"kind":"text","defaultValue":"Itens disponíveis","nonblank":true},"firstItem":{"kind":"text","defaultValue":"Primeiro registro","nonblank":true},"secondItem":{"kind":"text","defaultValue":"Segundo registro","nonblank":true},"actionLabel":{"kind":"text","defaultValue":"Adicionar","nonblank":true}}};
const snippetFamilies4=<String,String>{"list-item":"list"};
class FormSnippet4 extends StatefulWidget {final String slug='list-item';final Map<String,Object?> properties=const {"label": "Registros", "titleText": "Itens disponíveis", "firstItem": "Primeiro registro", "secondItem": "Segundo registro", "actionLabel": "Adicionar"};const FormSnippet4({super.key});@override State<FormSnippet4> createState()=>_FormSnippetState4();}
class _FormSnippetState4 extends State<FormSnippet4> {
  ForgeTypedFormController<SnippetProfile4>? controller;
  final path = ForgeFieldPath<SnippetProfile4>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies4[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts4[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile4> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile4>(
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
  void didUpdateWidget(covariant FormSnippet4 old) {
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
      : ForgeFormFieldInput<SnippetProfile4>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile4>(
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

typedef SnippetProfile5=({String email});
const snippetContracts5=<String,Map<String,Map<String,Object?>>>{"form":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies5=<String,String>{"form":"form"};
class FormSnippet5 extends StatefulWidget {final String slug='form';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet5({super.key});@override State<FormSnippet5> createState()=>_FormSnippetState5();}
class _FormSnippetState5 extends State<FormSnippet5> {
  ForgeTypedFormController<SnippetProfile5>? controller;
  final path = ForgeFieldPath<SnippetProfile5>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies5[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts5[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile5> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile5>(
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
  void didUpdateWidget(covariant FormSnippet5 old) {
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
      : ForgeFormFieldInput<SnippetProfile5>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile5>(
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

typedef SnippetProfile6=({String email});
const snippetContracts6=<String,Map<String,Map<String,Object?>>>{"form-header":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies6=<String,String>{"form-header":"form"};
class FormSnippet6 extends StatefulWidget {final String slug='form-header';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet6({super.key});@override State<FormSnippet6> createState()=>_FormSnippetState6();}
class _FormSnippetState6 extends State<FormSnippet6> {
  ForgeTypedFormController<SnippetProfile6>? controller;
  final path = ForgeFieldPath<SnippetProfile6>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies6[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts6[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile6> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile6>(
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
  void didUpdateWidget(covariant FormSnippet6 old) {
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
      : ForgeFormFieldInput<SnippetProfile6>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile6>(
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

typedef SnippetProfile7=({String email});
const snippetContracts7=<String,Map<String,Map<String,Object?>>>{"form-body":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies7=<String,String>{"form-body":"form"};
class FormSnippet7 extends StatefulWidget {final String slug='form-body';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet7({super.key});@override State<FormSnippet7> createState()=>_FormSnippetState7();}
class _FormSnippetState7 extends State<FormSnippet7> {
  ForgeTypedFormController<SnippetProfile7>? controller;
  final path = ForgeFieldPath<SnippetProfile7>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies7[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts7[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile7> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile7>(
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
  void didUpdateWidget(covariant FormSnippet7 old) {
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
      : ForgeFormFieldInput<SnippetProfile7>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile7>(
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

typedef SnippetProfile8=({String email});
const snippetContracts8=<String,Map<String,Map<String,Object?>>>{"form-footer":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies8=<String,String>{"form-footer":"form"};
class FormSnippet8 extends StatefulWidget {final String slug='form-footer';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet8({super.key});@override State<FormSnippet8> createState()=>_FormSnippetState8();}
class _FormSnippetState8 extends State<FormSnippet8> {
  ForgeTypedFormController<SnippetProfile8>? controller;
  final path = ForgeFieldPath<SnippetProfile8>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies8[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts8[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile8> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile8>(
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
  void didUpdateWidget(covariant FormSnippet8 old) {
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
      : ForgeFormFieldInput<SnippetProfile8>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile8>(
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

typedef SnippetProfile9=({String email});
const snippetContracts9=<String,Map<String,Map<String,Object?>>>{"form-field":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies9=<String,String>{"form-field":"form-field"};
class FormSnippet9 extends StatefulWidget {final String slug='form-field';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet9({super.key});@override State<FormSnippet9> createState()=>_FormSnippetState9();}
class _FormSnippetState9 extends State<FormSnippet9> {
  ForgeTypedFormController<SnippetProfile9>? controller;
  final path = ForgeFieldPath<SnippetProfile9>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies9[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts9[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile9> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile9>(
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
  void didUpdateWidget(covariant FormSnippet9 old) {
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
      : ForgeFormFieldInput<SnippetProfile9>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile9>(
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

typedef SnippetProfile10=({String email});
const snippetContracts10=<String,Map<String,Map<String,Object?>>>{"form-field-header":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies10=<String,String>{"form-field-header":"form-field"};
class FormSnippet10 extends StatefulWidget {final String slug='form-field-header';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet10({super.key});@override State<FormSnippet10> createState()=>_FormSnippetState10();}
class _FormSnippetState10 extends State<FormSnippet10> {
  ForgeTypedFormController<SnippetProfile10>? controller;
  final path = ForgeFieldPath<SnippetProfile10>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies10[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts10[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile10> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile10>(
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
  void didUpdateWidget(covariant FormSnippet10 old) {
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
      : ForgeFormFieldInput<SnippetProfile10>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile10>(
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

typedef SnippetProfile11=({String email});
const snippetContracts11=<String,Map<String,Map<String,Object?>>>{"form-field-body":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies11=<String,String>{"form-field-body":"form-field"};
class FormSnippet11 extends StatefulWidget {final String slug='form-field-body';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet11({super.key});@override State<FormSnippet11> createState()=>_FormSnippetState11();}
class _FormSnippetState11 extends State<FormSnippet11> {
  ForgeTypedFormController<SnippetProfile11>? controller;
  final path = ForgeFieldPath<SnippetProfile11>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies11[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts11[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile11> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile11>(
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
  void didUpdateWidget(covariant FormSnippet11 old) {
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
      : ForgeFormFieldInput<SnippetProfile11>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile11>(
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

typedef SnippetProfile12=({String email});
const snippetContracts12=<String,Map<String,Map<String,Object?>>>{"form-field-footer":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies12=<String,String>{"form-field-footer":"form-field"};
class FormSnippet12 extends StatefulWidget {final String slug='form-field-footer';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet12({super.key});@override State<FormSnippet12> createState()=>_FormSnippetState12();}
class _FormSnippetState12 extends State<FormSnippet12> {
  ForgeTypedFormController<SnippetProfile12>? controller;
  final path = ForgeFieldPath<SnippetProfile12>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies12[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts12[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile12> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile12>(
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
  void didUpdateWidget(covariant FormSnippet12 old) {
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
      : ForgeFormFieldInput<SnippetProfile12>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile12>(
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

typedef SnippetProfile13=({String email});
const snippetContracts13=<String,Map<String,Map<String,Object?>>>{"form-field-input":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies13=<String,String>{"form-field-input":"form-field-input"};
class FormSnippet13 extends StatefulWidget {final String slug='form-field-input';final Map<String,Object?> properties=const {"label": "Email", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet13({super.key});@override State<FormSnippet13> createState()=>_FormSnippetState13();}
class _FormSnippetState13 extends State<FormSnippet13> {
  ForgeTypedFormController<SnippetProfile13>? controller;
  final path = ForgeFieldPath<SnippetProfile13>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies13[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts13[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile13> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile13>(
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
  void didUpdateWidget(covariant FormSnippet13 old) {
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
      : ForgeFormFieldInput<SnippetProfile13>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile13>(
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

typedef SnippetProfile14=({String email});
const snippetContracts14=<String,Map<String,Map<String,Object?>>>{"form-field-input":{"label":{"kind":"text","defaultValue":"Email","nonblank":true},"titleText":{"kind":"text","defaultValue":"Cadastro","nonblank":true},"hint":{"kind":"text","defaultValue":"Informe um email","nonblank":false},"modelValue":{"kind":"text","defaultValue":"","nonblank":false},"providerError":{"kind":"text","defaultValue":"","nonblank":false},"errorOverride":{"kind":"text","defaultValue":"","nonblank":false},"required":{"kind":"boolean","defaultValue":true},"readOnly":{"kind":"boolean","defaultValue":false},"disabled":{"kind":"boolean","defaultValue":false},"loading":{"kind":"boolean","defaultValue":false},"noValidate":{"kind":"boolean","defaultValue":false},"cancelSubmit":{"kind":"boolean","defaultValue":false},"cancelReset":{"kind":"boolean","defaultValue":false}}};
const snippetFamilies14=<String,String>{"form-field-input":"form-field-input"};
class FormSnippet14 extends StatefulWidget {final String slug='form-field-input';final Map<String,Object?> properties=const {"label": "Aspas ' barra \\ dólar \$ e\nnova linha", "titleText": "Cadastro", "hint": "Informe um email", "modelValue": "", "providerError": "", "errorOverride": "", "required": true, "readOnly": false, "disabled": false, "loading": false, "noValidate": false, "cancelSubmit": false, "cancelReset": false};const FormSnippet14({super.key});@override State<FormSnippet14> createState()=>_FormSnippetState14();}
class _FormSnippetState14 extends State<FormSnippet14> {
  ForgeTypedFormController<SnippetProfile14>? controller;
  final path = ForgeFieldPath<SnippetProfile14>('profile.email',
      read: (v) => v.email, write: (v, text) => (email: text));
  int edits = 0, submits = 0, resets = 0, actions = 0;
  String feedback = '';
  String get family => snippetFamilies14[widget.slug]!;
  Object? prop(String key) =>
      widget.properties[key] ??
      snippetContracts14[widget.slug]?[key]?['defaultValue'];
  String text(String key) => (prop(key) as String?) ?? '';
  bool flag(String key) => prop(key) == true;
  ForgeTypedFormController<SnippetProfile14> get owner => controller!;
  @override
  void initState() {
    super.initState();
    if (family != 'list') {
      controller = ForgeTypedFormController<SnippetProfile14>(
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
  void didUpdateWidget(covariant FormSnippet14 old) {
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
      : ForgeFormFieldInput<SnippetProfile14>(
          name: path,
          label: text('label'),
          hint: text('hint'),
          error: text('errorOverride').isEmpty ? null : text('errorOverride'),
          required: flag('required'),
          disabled: flag('disabled'),
          readOnly: flag('readOnly'),
          validationMessage: 'Preencha o campo.',
          onChanged: (_) => setState(() => edits++));
  Widget form() => ForgeTypedFormScope<SnippetProfile14>(
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

Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:320,child:child))));
void main(){
testWidgets('copyable interaction list 0',(t)async{await t.pumpWidget(host(const FormSnippet0()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-header 1',(t)async{await t.pumpWidget(host(const FormSnippet1()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-body 2',(t)async{await t.pumpWidget(host(const FormSnippet2()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-footer 3',(t)async{await t.pumpWidget(host(const FormSnippet3()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction list-item 4',(t)async{await t.pumpWidget(host(const FormSnippet4()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form 5',(t)async{await t.pumpWidget(host(const FormSnippet5()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-header 6',(t)async{await t.pumpWidget(host(const FormSnippet6()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-body 7',(t)async{await t.pumpWidget(host(const FormSnippet7()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-footer 8',(t)async{await t.pumpWidget(host(const FormSnippet8()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-field 9',(t)async{await t.pumpWidget(host(const FormSnippet9()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-field-header 10',(t)async{await t.pumpWidget(host(const FormSnippet10()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-field-body 11',(t)async{await t.pumpWidget(host(const FormSnippet11()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-field-footer 12',(t)async{await t.pumpWidget(host(const FormSnippet12()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-field-input 13',(t)async{await t.pumpWidget(host(const FormSnippet13()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
testWidgets('copyable interaction form-field-input 14',(t)async{await t.pumpWidget(host(const FormSnippet14()));await t.pump(const Duration(milliseconds:150));expect(t.takeException(),isNull);await t.pumpWidget(const SizedBox());await t.pump();});
}
