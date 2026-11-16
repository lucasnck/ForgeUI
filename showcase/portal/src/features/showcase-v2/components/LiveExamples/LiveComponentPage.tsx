"use client";
import { useMemo, useState } from "react";
import { Badge, Button, Container, Divider, Heading, Inline, Label, Option, Select, Stack, Text, VisuallyHidden } from "@forge-ui/web";
import type { ComponentSize, ComponentTone } from "@forge-ui/web";
import { examples, Preview, sourceFor } from "./LiveExamples";
import type { ComponentKey } from "./LiveExamples";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";
import styles from "./LiveComponentPage.module.css";

interface Props { name: ComponentKey; specification: string; }
export function LiveComponentPage({name,specification}:Props) {
 const {copy}=useShowcaseV2Copy();
 const detail=useMemo(()=>examples.find(x=>x.key===name),[name]);
 const [size,setSize]=useState<ComponentSize>("md");
 const [tone,setTone]=useState<ComponentTone>("brand");
 const [variant,setVariant]=useState<"solid"|"soft"|"ghost"|"outline">("solid");
 const [disabled,setDisabled]=useState(false);
 const [loading,setLoading]=useState(false);
 const [invalid,setInvalid]=useState(false);
 const [headingLevel,setHeadingLevel]=useState<1|2|3|4|5|6>(2);
 const [resetCounter,setResetCounter]=useState(0);
 const [copied,setCopied]=useState(false);
 const snippet=`import { ${name==="Label"?"Label, Input":name==="VisuallyHidden"?"Button, VisuallyHidden":name} } from "@forge-ui/web";\n\n${sourceFor(name,size,tone,disabled,variant,headingLevel)}`;
 const reset=()=>{setSize("md");setTone("brand");setVariant("solid");setDisabled(false);setLoading(false);setInvalid(false);setHeadingLevel(2);setResetCounter(x=>x+1);setCopied(false)};
 const copyCode=async()=>{try {await navigator.clipboard.writeText(snippet);setCopied(true)}catch{setCopied(false)}};
 if(!detail) return null;
 return <Container size="wide" padding="4"><Stack as="article" gap="6">
  <Stack as="header" gap="2"><Inline align="center" justify="between"><Heading level={2} size="xl">{name}</Heading><Badge tone="warning" appearance="soft">Migração parcial</Badge></Inline><Text as="p">{detail.description}</Text><Text as="p" size="sm" tone="muted">SC de origem: {specification}</Text></Stack>
  <section aria-label={copy.example} className={styles.section}><Stack gap="2"><Heading level={3} size="lg">{copy.example}</Heading><div className={styles.preview}><Preview key={`${name}-${resetCounter}`} selected={name} size={size} tone={tone} disabled={disabled} loading={loading} invalid={invalid} variant={variant} headingLevel={headingLevel}/></div></Stack></section>
  <section aria-label={copy.properties} className={styles.section}><Stack gap="2"><Heading level={3} size="lg">{copy.properties}</Heading>
   <div className={styles.editors}>
    {name!=="Divider"&&name!=="VisuallyHidden"&&<Label htmlFor="component-size">size<Select id="component-size" size="sm" value={size} onChange={e=>setSize(e.currentTarget.value as ComponentSize)}>{["xs","sm","md","lg","xl"].map(x=><Option key={x} value={x}>{x}</Option>)}</Select></Label>}
    {name!=="Divider"&&name!=="VisuallyHidden"&&<Label htmlFor="component-tone">tone<Select id="component-tone" size="sm" value={tone} onChange={e=>setTone(e.currentTarget.value as ComponentTone)}>{["brand","neutral","success","danger","warning","info"].map(x=><Option key={x} value={x}>{x}</Option>)}</Select></Label>}
    {name==="Button"&&<Label htmlFor="component-variant">variant<Select id="component-variant" size="sm" value={variant} onChange={e=>setVariant(e.currentTarget.value as typeof variant)}>{["solid","soft","outline","ghost"].map(x=><Option key={x} value={x}>{x}</Option>)}</Select></Label>}
    {name==="Heading"&&<Label htmlFor="heading-level">level<Select id="heading-level" value={headingLevel} onChange={e=>setHeadingLevel(Number(e.currentTarget.value) as typeof headingLevel)}>{[1,2,3,4,5,6].map(x=><Option value={String(x)} key={x}>h{x}</Option>)}</Select></Label>}
    {["Button","Input","Checkbox","Textarea","Switch","Radio"].includes(name)&&<label className={styles.check}><input type="checkbox" checked={disabled} onChange={e=>setDisabled(e.currentTarget.checked)}/>disabled</label>}
    {name==="Button"&&<label className={styles.check}><input type="checkbox" checked={loading} onChange={e=>setLoading(e.currentTarget.checked)}/>loading</label>}
    {["Input","Checkbox","Textarea","Switch","Radio"].includes(name)&&<label className={styles.check}><input type="checkbox" checked={invalid} onChange={e=>setInvalid(e.currentTarget.checked)}/>invalid</label>}
   </div><Inline gap="2"><Button type="button" tone="neutral" variant="outline" onClick={reset}>{copy.reset}</Button></Inline>
  </Stack></section>
  <section aria-label={copy.capabilities} className={styles.section}><Stack gap="2"><Heading level={3} size="lg">{copy.capabilities}</Heading><Text as="p">{detail.contract}</Text><Text as="p" size="sm" tone="muted">{detail.states.join(" · ")}</Text><Divider/><Inline align="center" justify="between"><Heading level={4} size="md">Exemplo de consumo</Heading><Button type="button" tone="neutral" variant="outline" onClick={copyCode}>{copied?"Copiado":copy.copyCode}</Button></Inline><pre className={styles.code}><code>{snippet}</code></pre></Stack></section>
 </Stack></Container>
}
