"use client";
import { useState } from "react";

export function useAvatarExample() {
  const [src, setSrc] = useState("none");
  const [decorative, setDecorative] = useState(false);

  return {
    src,
    setSrc,
    decorative,
    setDecorative,
    resolvedSrc:
      src === "image"
        ? "/images/showcase/accordion-landscape.svg"
        : src === "broken"
          ? "/images/showcase/missing-avatar.svg"
          : undefined,
  };
}
