"use client";
import layoutStyles from "../../../../../../../web/library/src/design-system/styles/layout-components.module.css";

export function TemplateFrame({ src, title }: { src: string; title: string }) {
  return <iframe src={src} title={title} height={600} className={layoutStyles.aspect} />;
}
