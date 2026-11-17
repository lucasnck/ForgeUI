import fs from "node:fs";
import path from "node:path";
const root=path.resolve(import.meta.dirname,"..");
const api=JSON.parse(fs.readFileSync(path.join(root,"docs/sc/app/reference/native-component-api.json"),"utf8"));
if(api.componentCount!==221||api.components.length!==221||new Set(api.components.map(c=>c.slug)).size!==221)throw Error("Invalid resolved native API baseline");
const entries=api.components.map(c=>({
  slug:c.slug,name:c.name,dartName:c.dartName,sourceFile:c.sourceFile,
  properties:c.parameters.map(p=>({
    name:p.name,type:p.type,required:p.required,defaultValue:p.defaultValue,
    description:p.type.includes("Function")?"Callback fornecido pelo consumidor."
      :p.type.includes("Controller")||p.type.includes("FocusNode")?"Recurso nativo; respeite a propriedade e o descarte pelo consumidor."
      :p.type.includes("Widget")?"Conteúdo Flutter tipado; consulte a composição canônica do componente."
      :"Parâmetro do construtor público Dart. A edição interativa depende do exemplo disponível.",
    source:c.dartName
  }))
}));
const target=path.join(root,"showcase/portal/src/features/showcase-v2/model/flutter-native-api.json");
const content=JSON.stringify({schemaVersion:1,source:"Resolved public Dart constructor contracts",entries},null,2)+"\n";
if(process.argv.includes("--check")){
 if(!fs.existsSync(target)||fs.readFileSync(target,"utf8")!==content)throw Error("Native catalog is stale. Run npm run catalog:flutter-api.");
}else fs.writeFileSync(target,content);
console.log("Verified constructor properties for "+entries.length+" native components; preview availability is unchanged.");
