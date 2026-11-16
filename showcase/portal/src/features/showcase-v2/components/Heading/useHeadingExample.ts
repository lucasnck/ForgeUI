"use client";
import { useState } from "react";
import type {
  ComponentTextSize,
  ComponentFontWeight,
  ComponentHeadingLevel,
  TextElement,
} from "@forge-ui/web";
import { initialChildren, longChildren } from "../Text/fixtures";

export function useHeadingExample() {
  const [children, setChildren] = useState(initialChildren);
  const [size, setSize] = useState<ComponentTextSize>("lg");
  const [weight, setWeight] = useState<ComponentFontWeight>("regular");
  const [element, setElement] = useState("3");

  function changeSize(v: string) {
    setSize(v as ComponentTextSize);
  }

  function changeWeight(v: string) {
    setWeight(v as ComponentFontWeight);
  }

  function changeLong(value: boolean) {
    setChildren(value ? longChildren : initialChildren);
  }

  return {
    long: children === longChildren,
    changeLong,
    children,
    setChildren,
    size,
    changeSize,
    weight,
    changeWeight,
    element,
    setElement,
    level: Number(element) as ComponentHeadingLevel,
    as: element as TextElement,
  };
}
