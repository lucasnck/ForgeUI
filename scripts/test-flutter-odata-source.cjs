const fs=require('fs'),ts=require('typescript');
const sourceModule={exports:{}};
new Function('exports','module',ts.transpileModule(fs.readFileSync('web/library/src/design-system/helpers/odata-filter/serializeODataFilter.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(sourceModule.exports,sourceModule);
const m=sourceModule.exports,cases=[];
const options=[{value:'a',label:'Alpha'},{value:'b',label:'Beta'},{value:'off',label:'Disabled',disabled:true}];
const examples={
 text:["O'Brien",'',null,false,0],
 number:[0,-0,1e-7,1e-6,1e20,1e21,123.45,null,'123'],
 guid:['ABCDEF01-2345-6789-ABCD-EF0123456789','abc',null],
 decimal:['-0.00','9007199254740993.0100','-9007199254740993.0100','0.0001','01.00','1e2','1.00000',null],
 date:['0001-01-01','2024-02-29','2023-02-29','2024-02',null],
 time:['00:00','23:59:59.1234567','24:00','12:30:60','12:30:00.12345678',null],
 datetime:['2024-02-29T12:30','2024-02-29T12:30:01.125','2023-02-29T12:30','2024-01-01T24:00',null],
 boolean:[true,false,null,'true'],choice:['a','off','missing',null],multiChoice:[['a','b','a'],['off'],[],null]
};
function add(fields,expression){
 let expected,throws=false,simple;
 try{expected=m.serializeODataFilter(expression,fields);}catch{throws=true;}
 try{simple=m.isODataFilterSimpleExpression(expression,fields);}catch{}
 cases.push({fields,expression,expected,throws,simple});
}
for(const [kind,values] of Object.entries(examples)){
 const field={id:'field',path:'Entity/Value',label:'Field',kind,...(['choice','multiChoice'].includes(kind)?{options}:{}),
 ...(kind==='decimal'?{precision:40,scale:4}:{}),...(kind==='datetime'?{offset:'-03:00'}:{})};
 for(const op of ['eq','ne','contains','startswith','endswith','gt','ge','lt','le','between','in']){
 const samples=op==='between'?[[values[0],values[1]],[values[1],values[0]],[values[0],null],null]:values;
 for(const value of samples){
 const c={kind:'condition',id:'condition',fieldId:'field',fieldKind:kind,operator:op,value};
 add([field],c);add([field],{kind:'group',id:'root',operator:'and',children:[c]});
 }
 }
}
const decimal={id:'exact',path:'Amount',label:'Amount',kind:'decimal',precision:40,scale:4};
for(const range of [['9007199254740993.01','9007199254740993.02'],['9007199254740993.02','9007199254740993.01'],['-0.00','0.00'],['-1000','-2']]){
 add([decimal],{kind:'condition',id:'exact',fieldId:'exact',fieldKind:'decimal',operator:'between',value:range});
}
for(const path of ['Valid/Path','Name eq 1','A//B','1Start','A/B_2']){
 add([{id:'x',path,label:'Name',kind:'text'}],{kind:'group',id:'root',operator:'and',children:[]});
}
fs.mkdirSync('app/library/test/fixtures',{recursive:true});fs.writeFileSync('app/library/test/fixtures/odata-web.json',JSON.stringify(cases));console.log('Generated '+cases.length+' source OData cases.');
