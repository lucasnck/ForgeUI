"use client";
import { useExamplePropertySnapshot as useAspectRatioExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseAspectRatioProps } from "react";
import { useExampleProperties as useAspectRatioExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, AspectRatio } from "@forge-ui/web";
import { ExampleControls, SelectControl } from "../ExampleControls";

import { useAspectRatioExample } from "./useAspectRatioExample";
import styles from "./AspectRatio.example.module.css";

export function AspectRatioExample() {
  const { properties: aspectRatioProperties } = useAspectRatioPropertyBindings();

  const view = useAspectRatioExample();
  const { ratio: viewRatio, changeRatio: viewChangeRatio } = view;
  useAspectRatioPropertySnapshot({ ratio: viewRatio });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="ratio"
          value={viewRatio}
          options={["video", "square", "photo", "portrait"]}
          onChange={viewChangeRatio}
        />
      </ExampleControls>
      <div className={styles.mediaFrame}>
        <AspectRatio ratio={viewRatio} {...aspectRatioProperties}>
          <div className={styles.media} role="img" aria-label="Media ratio specimen" />
        </AspectRatio>
      </div>
    </Stack>
  );
}

function useAspectRatioPropertyBindings() {
  return useAspectRatioExampleProperties<
    Pick<ShowcaseAspectRatioProps<typeof AspectRatio>, "ratio" | "title">
  >("AspectRatio");
}

function useAspectRatioPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useAspectRatioExamplePropertySnapshot("AspectRatio", values);
}
