const fs=require('fs'),vm=require('vm'),ts=require('typescript');
const code=fs.readFileSync('web/library/src/design-system/helpers/money.ts','utf8');
const sourceModule={exports:{}};
vm.runInNewContext(ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:sourceModule.exports,module:sourceModule,Intl,RangeError});
const m=sourceModule.exports,fixtures=[];
for(const locale of ['pt-BR','es','en'])for(const currency of ['BRL','USD','EUR','JPY','KWD','ZZZ'])
for(const currencyDisplay of ['code','symbol','narrowSymbol','name'])for(const useGrouping of [true,false]){
const o={locale,currency,currencyDisplay,useGrouping};
for(const value of [null,'0','-0','1','-1','2','1234','9007199254740993','9007199254740993.01','0.123','-12345.67']){
try{fixtures.push({type:'format',...o,value,expected:m.formatMoney(value,o),display:m.moneyDisplayText(value,o),edit:m.moneyEditText(value,o)});}
catch{fixtures.push({type:'format',...o,value,throws:true});}
}
for(const text of ['','-','.',',','1,','1.','001','1,234.56','1.234,56','12,34.56','-0','0.123','1e3','USD 1.00',m.formatMoney('2',o),m.formatMoney('-2',o)]){
fixtures.push({type:'parse',...o,text,expected:m.parseMoneyInput(text,o)});
}
}
fs.mkdirSync('app/library/test/fixtures',{recursive:true});
fs.writeFileSync('app/library/test/fixtures/money-web.json',JSON.stringify(fixtures));
console.log('Generated '+fixtures.length+' Web money comparison cases');
