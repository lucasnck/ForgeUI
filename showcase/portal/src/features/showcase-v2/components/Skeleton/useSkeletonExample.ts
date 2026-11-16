"use client";
import { useState } from "react";
import type { ComponentSize, SkeletonKind } from "@forge-ui/web";

export function useSkeletonExample() {
  const [loading, setLoading] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [size, setSize] = useState<ComponentSize>("md");
  const [kind, setKind] = useState<SkeletonKind>("text");

  function changeSize(v: string) {
    setSize(v as ComponentSize);
  }

  function changeKind(v: string) {
    setKind(v as SkeletonKind);
  }

  return {
    loading,
    setLoading,
    animated,
    setAnimated,
    size,
    changeSize,
    kind,
    changeKind,
  };
}
