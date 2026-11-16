"use client";
import { useState } from "react";
import type { AccordionProps } from "@forge-ui/web";
import { accordionItems } from "../Accordion/fixtures";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useAccordionBodyExample() {
  const copy = useResourceExampleCopy();
  const [value, setValue] = useState<readonly string[]>(["item-1"]);
  const [multiple, setMultiple] = useState(false);
  const [collapsible, setCollapsible] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [disableSecond, setDisableSecond] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [icon, setIcon] = useState(false);
  const [children, setChildren] = useState("Children");
  const [level, setLevel] = useState<AccordionProps["level"]>(3);
  const [calls, setCalls] = useState(0);
  const [saved, setSaved] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [lastItem, setLastItem] = useState<string | null>(null);

  function change(next: readonly string[]) {
    setValue(next);
    setCalls((n) => n + 1);
  }

  function changeMultiple(next: boolean) {
    setMultiple(next);
    if (!next) setValue((values) => values.slice(0, 1));
  }

  function changeLevel(next: string) {
    setLevel(Number(next) as AccordionProps["level"]);
  }

  const items = accordionItems.map((item) => ({
    ...item,
    cancel() {
      setCancelled((n) => n + 1);
      setLastItem(item.id);
      change(value.filter((v) => v !== item.id));
    },
    save() {
      setSaved((n) => n + 1);
      setLastItem(item.id);
    },
  }));

  return {
    copy,
    value,
    multiple,
    changeMultiple,
    collapsible,
    setCollapsible,
    disabled,
    setDisabled,
    disableSecond,
    setDisableSecond,
    animated,
    setAnimated,
    icon,
    setIcon,
    children,
    setChildren,
    level,
    changeLevel,
    calls,
    saved,
    cancelled,
    lastItem,
    items,
    change,
  };
}
