"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import type { ForgePlatform } from "../../model/forge-platforms";
import styles from "./PlatformSwitcher.module.css";

interface Props {
  value: ForgePlatform;
  onChange: (next: ForgePlatform) => void;
  panelId: string;
}
const options = ["react", "flutter"] as const;
const label = { react: "React", flutter: "Flutter" };

export function PlatformSwitcher({ value, onChange, panelId }: Props) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: ForgePlatform) {
    const index = options.indexOf(current);
    const next = event.key === "ArrowRight" ? (index + 1) % 2
      : event.key === "ArrowLeft" ? (index + 1) % 2
      : event.key === "Home" ? 0 : event.key === "End" ? 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    onChange(options[next]);
    refs.current[next]?.focus();
  }
  return (
    <div className={styles.wrapper} role="tablist" aria-label="Plataforma de implementação">
      {options.map((platform, i) => (
        <button key={platform} type="button" id={`forge-platform-${platform}`} role="tab"
          className={styles.tab} aria-selected={value === platform} aria-controls={panelId}
          tabIndex={value === platform ? 0 : -1}
          ref={(node) => { refs.current[i] = node; }}
          onClick={() => onChange(platform)} onKeyDown={(event) => onKeyDown(event, platform)}>
          {label[platform]}
        </button>
      ))}
    </div>
  );
}
