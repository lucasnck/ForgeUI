"use client";
import { useLayoutEffect, useRef, useState } from "react";
import type { AvatarProps } from "./Avatar";

export function useAvatar({
  className,
  label,
  src,
  initials,
  decorative = false,
  size = "md",
  shape = "pill",
  ...props
}: AvatarProps) {
  if (!label.trim()) throw new Error("Avatar requires a nonempty label.");
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const imageRef = useRef<HTMLImageElement>(null);
  useLayoutEffect(() => {
    // A cached failure may finish before hydration attaches the error handler.
    const image = imageRef.current;
    if (src && image?.complete && image.naturalWidth === 0) setFailedSrc(src);
  }, [src]);
  return {
    className,
    label,
    src,
    initials,
    decorative,
    size,
    shape,
    props,
    imageRef,
    showImage: Boolean(src) && src !== failedSrc,
    handleError: () => setFailedSrc(src),
    handleLoad: () => setFailedSrc(undefined),
  };
}
