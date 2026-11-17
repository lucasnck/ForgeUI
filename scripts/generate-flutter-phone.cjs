const fs=require('fs'),vm=require('vm'),ts=require('typescript');
const lib=require('libphonenumber-js/max'),metadata=require('libphonenumber-js/metadata.max.json');
const sourceModule={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('web/library/src/design-system/helpers/phone-country-labels.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:sourceModule.exports,module:sourceModule});
const data={labels:sourceModule.exports.phoneCountryLabels,countries:{}};
for(const c of lib.getCountries()){
 const m=metadata.countries[c];
 data.countries[c]={callingCode:lib.getCountryCallingCode(c),lengths:m[3],pattern:m[2]};
}
fs.writeFileSync('app/library/lib/src/generated/forge_phone_data.g.dart',"// Generated from the pinned Web libphonenumber metadata and source labels.\nconst String forgePhoneDataJson=r'''"+JSON.stringify(data)+"''';\n");
fs.copyFileSync(require('path').join(require('path').dirname(require.resolve('libphonenumber-js/package.json')),'LICENSE'),'app/library/LICENSE-phone-metadata.md');
console.log('Generated '+Object.keys(data.countries).length+' country contracts and existing localized labels.');
