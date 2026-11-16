"use client";
import { useMemo } from "react";
import type { ComponentSize, ComponentTone } from "@forge-ui/web";
import type { ShowcaseV2Definition, ShowcaseV2Property } from "../../model/showcase-v2.types";
import { showcaseV2ControlOptions } from "../../model/showcase-v2-control-options";
import { useExampleProperties } from "../ExampleScope/useExampleScope";
import { ShowcaseV2Renderer } from "../ShowcaseV2Renderer/ShowcaseV2Renderer";
import { Preview, examples, sourceFor } from "./LiveExamples";
import type { ComponentKey } from "./LiveExamples";

interface EditableProperties {
  size?: ComponentSize;
  tone?: ComponentTone;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "solid"|"soft"|"ghost"|"outline";
  level?: 1|2|3|4|5|6;
}
/** The original V2 scope provides overrides to the real public Forge UI preview. */
function BoundPreview({name,emptyGrid=false}:{name:ComponentKey;emptyGrid?:boolean}) {
  const {properties}=useExampleProperties<EditableProperties>(name);
  return <Preview selected={name} size={properties.size??"md"} tone={properties.tone??"brand"}
   disabled={properties.disabled??false} invalid={properties.invalid??false} loading={properties.loading??false}
   variant={properties.variant??"solid"} headingLevel={properties.level??2} emptyGrid={emptyGrid}/>;
}

export function LiveDefinitionPage({name,slug,specification,level}:{name:ComponentKey;slug:string;specification:string;level:ShowcaseV2Definition["level"]}) {
  const definition=useMemo<ShowcaseV2Definition>(()=>{
    const item=examples.find(x=>x.key===name);
    if(!item) throw new Error(`Unknown extracted component ${name}`);
    const schema=showcaseV2ControlOptions[name] ?? {};
    const properties:ShowcaseV2Property[]=item.props.map(prop=>({
      name:prop,
      type:schema[prop]?.kind==="boolean"?"boolean":schema[prop]?.kind==="number"?"number":"string",
      required:false,
      defaultValue:schema[prop]?.defaultValue===undefined?null:String(schema[prop].defaultValue),
      description:`${prop} — ${schema[prop] ? "Editável neste exemplo" : "Contrato público do componente"}`,
      source:specification,
    }));
    const base = {id:`${slug}-base`,title:`${name} — exemplo`,description:item.description,
        code:`import { ${name === "Label" ? "Label, Input" : name === "VisuallyHidden" ? "Button, VisuallyHidden" : name === "Card" ? "Card, CardHeader, CardBody, CardFooter, Heading" : name === "DataGrid" ? "DataGrid, DataGridHeader, DataGridBody" : name} } from "@forge-ui/web";\n\n${sourceFor(name,"md","brand",false,"solid",2)}`,
        Component:()=> <BoundPreview name={name}/> };
    const demos: ShowcaseV2Definition["examples"] = name === "DataGrid"
      ? [base,{...base,id:`${slug}-empty`,title:"DataGrid — sem resultados",description:"Segundo cenário: estado vazio com tabela acessível.",code:`import { DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";\n\nconst rows = [];\nconst columns = [{key:"name", header:"Projeto", renderCell:(row)=>row.name}];\n<DataGrid label="Projetos" rows={rows} columns={columns} getRowKey={row=>row.id} emptyContent="Nenhum projeto encontrado"><DataGridHeader/><DataGridBody/></DataGrid>`,Component:()=> <BoundPreview name={name} emptyGrid/>}]
      : [base];
    return {name,slug,level,specification,description:item.description,
      examples:demos,properties,methods:[],events:[],features:[{id:`${name}-contract`,name:"Contrato público",description:item.contract}]};
  },[name,slug,specification,level]);
  return <ShowcaseV2Renderer definition={definition}/>;
}
