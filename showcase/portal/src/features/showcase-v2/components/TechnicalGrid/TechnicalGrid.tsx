"use client";
import { useId } from "react";
import { Heading, Stack, DataGrid, DataGridHeader, DataGridBody } from "@forge-ui/web";
import type { DataGridColumn } from "@forge-ui/web";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";
import { useShowcaseV2Copy } from "../../messages/useShowcaseV2Copy";

export function TechnicalGrid({definition}:{definition:ShowcaseV2Definition}) {
  const {copy}=useShowcaseV2Copy();
  const id=useId();
  const rows=[
    ...definition.methods.map(x=>({id:`method:${x.name}`,kind:copy.methods,name:x.name,signature:x.signature,description:x.description})),
    ...definition.events.map(x=>({id:`event:${x.name}`,kind:copy.events,name:x.name,signature:x.signature,description:x.description})),
    ...definition.features.map(x=>({id:`resource:${x.id}`,kind:copy.resources,name:x.name,signature:"—",description:x.description})),
  ];
  type Row = (typeof rows)[number];
  const columns:readonly DataGridColumn<Row>[]=[
    {key:"category",header:copy.category,renderCell:row=>row.kind},
    {key:"name",header:copy.name,rowHeader:true,renderCell:row=>row.name},
    {key:"signature",header:copy.type,renderCell:row=>row.signature},
    {key:"description",header:copy.description,renderCell:row=>row.description},
  ];
  return <Stack as="section" gap="2" aria-labelledby={`${id}-methods`}>
    <Heading id={`${id}-methods`} level={3} size="lg">{copy.capabilities}</Heading>
    <DataGrid label={copy.capabilities} rows={rows} columns={columns} getRowKey={row=>row.id} fullWidth size="sm" emptyContent="—">
      <DataGridHeader/><DataGridBody/>
    </DataGrid>
  </Stack>;
}
