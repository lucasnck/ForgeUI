// Generated from real Showcase copyable feedback snippets.
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/forge_ui.dart';
Widget host(Widget child)=>MaterialApp(theme:ForgeThemeData.light(),home:Scaffold(body:SingleChildScrollView(child:SizedBox(width:480,child:child))));
void main(){
testWidgets('copyable feedback card 0',(t)async{await t.pumpWidget(host(ForgeCard(
  elevation: ForgeElevation.raised,
  fullWidth: true,
  children: [
    ForgeCardHeader(child: Text("Resumo do projeto")),
    ForgeCardBody(child: Text("Dados do projeto disponíveis.")),
    ForgeCardFooter(child: ForgeButton(onPressed: () {}, child: Text("Abrir"))),
  ],
)));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});
testWidgets('copyable feedback alert 1',(t)async{await t.pumpWidget(host(ForgeAlert(
  announcement: ForgeAnnouncementPoliteness.polite,
  children: [
    ForgeAlertHeader(child: Text("Aviso")),
    ForgeAlertBody(child: Text("Alterações não foram enviadas.")),
    ForgeAlertFooter(child: ForgeButton(onPressed: () {}, child: Text("Entendi"))),
  ],
)));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});
testWidgets('copyable feedback empty-state 2',(t)async{await t.pumpWidget(host(ForgeEmptyState(children: [
  ForgeEmptyStateHeader(child: Text("Nenhum resultado")),
  ForgeEmptyStateBody(child: Text("Não há registros nesta lista.")),
  ForgeEmptyStateFooter(child: ForgeButton(onPressed: () {}, child: Text("Criar registro"))),
])));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});
testWidgets('copyable feedback error-state 3',(t)async{await t.pumpWidget(host(ForgeErrorState(
  announcement: ForgeAnnouncementPoliteness.polite,
  children: [
    ForgeErrorStateHeader(child: Text("Não foi possível carregar")),
    ForgeErrorStateBody(child: Text("Confira a conexão e tente novamente.")),
    ForgeErrorStateFooter(child: ForgeButton(onPressed: () {}, child: Text("Tentar novamente"))),
  ],
)));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});
testWidgets('copyable feedback loading-state 4',(t)async{await t.pumpWidget(host(ForgeLoadingState(
  label: "Carregando registros",
  children: [
    ForgeLoadingStateHeader(child: Text("Atualização em andamento")),
    ForgeLoadingStateBody(child: Text("Preparando os dados...")),
  ],
)));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});
testWidgets('copyable feedback card 5',(t)async{await t.pumpWidget(host(ForgeCard(
  elevation: ForgeElevation.raised,
  fullWidth: true,
  children: [
    ForgeCardHeader(child: Text("Aspas ' dólar \$ barra \\ e\nlinha")),
    ForgeCardBody(child: Text("Dados do projeto disponíveis.")),
    ForgeCardFooter(child: ForgeButton(onPressed: () {}, child: Text("Abrir"))),
  ],
)));await t.pump(const Duration(milliseconds:100));expect(t.takeException(),isNull);});
}
