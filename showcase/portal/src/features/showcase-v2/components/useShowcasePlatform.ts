"use client";
import { useLayoutEffect, useRef, useState } from "react";
import type { ForgePlatform } from "../model/forge-platforms";
export function useShowcasePlatform() {
  const [platform, setPlatform] = useState<ForgePlatform>("react");
  const restoreFocus = useRef(false);
  useLayoutEffect(() => {
    if (restoreFocus.current) {
      document.getElementById(`forge-platform-${platform}`)?.focus();
      restoreFocus.current = false;
    }
  }, [platform]);
  function changePlatform(next: ForgePlatform) {
    if (next === platform) return;
    restoreFocus.current = true;
    setPlatform(next);
  }
  return { platform, changePlatform };
}
