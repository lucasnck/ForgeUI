const fs=require('fs'),ts=require('typescript'),lib=require('libphonenumber-js/max');
const sourceModule={exports:{}};
new Function('exports','module','require',ts.transpileModule(fs.readFileSync('web/library/src/design-system/helpers/phone.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(sourceModule.exports,sourceModule,p=>p==='./phone-country-labels'?{phoneCountryLabels:{}}:require(p));
const phone=sourceModule.exports,examples=require('libphonenumber-js/mobile/examples'),cases=[];
for(const [country,nsn] of Object.entries(examples)){
 const full='+'+lib.getCountryCallingCode(country)+nsn;
 for(const text of [full,nsn,'',nsn.slice(0,3),full+' ext 2']){
 const result=phone.parsePhone(text,country);
 cases.push({text,country,expected:result,...(result.kind==='possible'?{formatted:phone.formatPhone(result.number),national:phone.formatPhone(result.number,{international:false})}:{})});
 }
}
fs.writeFileSync('app/library/test/fixtures/phone-web.json',JSON.stringify(cases));
console.log('Generated '+cases.length+' source phone cases');
