"use client";
import { ShowcaseV2Renderer } from "../ShowcaseV2Renderer/ShowcaseV2Renderer";
import avatar from "../Avatar/definition";
import skeleton from "../Skeleton/definition";
import iconButton from "../IconButton/definition";
import tag from "../Tag/definition";
import alert from "../Alert/definition";
import select from "../Select/definition";
import option from "../Option/definition";
import container from "../Container/definition";
import stack from "../Stack/definition";
import inline from "../Inline/definition";
import link from "../Link/definition";
import surface from "../Surface/definition";
import aspectRatio from "../AspectRatio/definition";
import simpleGrid from "../SimpleGrid/definition";
import fieldHint from "../FieldHint/definition";
import fieldError from "../FieldError/definition";
import spinner from "../Spinner/definition";
import divider from "../Divider/definition";
import badge from "../Badge/definition";
import visuallyHidden from "../VisuallyHidden/definition";
import button from "../Button/definition";
import card from "../Card/definition";
import input from "../Input/definition";
import textarea from "../Textarea/definition";
import checkbox from "../Checkbox/definition";
import switchDefinition from "../Switch/definition";
import radio from "../Radio/definition";
import heading from "../Heading/definition";
import label from "../Label/definition";
import icon from "../Icon/definition";
import dataGrid from "../DataGrid/definition";
import legend from "../Legend/definition";
import type { ShowcaseV2Definition } from "../../model/showcase-v2.types";




const definitions: Record<string, ShowcaseV2Definition> = {
  Avatar: avatar, Skeleton: skeleton, IconButton: iconButton, Tag: tag, Alert: alert,
  Select: select, Option: option, Container: container, Stack: stack, Inline: inline, Link: link, Surface: surface, AspectRatio: aspectRatio, SimpleGrid: simpleGrid, FieldHint: fieldHint, FieldError: fieldError, Spinner: spinner, Divider: divider, Badge: badge, VisuallyHidden: visuallyHidden, Button: button, Card: card, Input: input, Textarea: textarea, Checkbox: checkbox, Switch: switchDefinition, Radio: radio, Heading: heading, Label: label, Icon: icon, DataGrid: dataGrid, Legend: legend
};




export function OriginalDefinitionPage({ name }: { name: keyof typeof definitions; slug: string; specification: string; level: ShowcaseV2Definition["level"] }) {
  const definition = definitions[name];
  if (!definition) throw new Error(`Original V2 definition missing for ${name}`);
  return <ShowcaseV2Renderer definition={definition} />;
}