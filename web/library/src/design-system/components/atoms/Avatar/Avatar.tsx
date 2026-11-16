"use client";

import { useAvatar } from "./useAvatar";
import { Icon } from "../Icon";
import type { HTMLAttributes, ReactElement } from "react";
import type {
  ComponentSizedProps,
  ComponentShapeProps,
} from "../../../types/component-capabilities";

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>, ComponentSizedProps, ComponentShapeProps {
  label: string;
  src?: string;
  initials?: string;
  decorative?: boolean;
}
import styles from "./Avatar.module.css";

export function Avatar(input: AvatarProps): ReactElement {
  const {
    className,
    label,
    src,
    initials,
    decorative,
    size,
    shape,
    props,
    showImage,
    imageRef,
    handleError,
    handleLoad,
  } = useAvatar(input);

  return (
    <span
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-size={size}
      data-shape={shape}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      {showImage ? (
        // Static/native images do not require an optimization server.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={src}
          alt=""
          className={styles.image}
          onError={handleError}
          onLoad={handleLoad}
        />
      ) : (
        <span aria-hidden="true">{initials || <Icon name="user" size="inherit" />}</span>
      )}
    </span>
  );
}
