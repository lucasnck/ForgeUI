"use client";
import { partConfigurations, resolvePart } from "./flutter-part-configurations";
import { advancedConfigurations, resolveAdvanced } from "./flutter-advanced-configurations";
import { transientConfigurations, resolveTransient } from "./flutter-transient-configurations";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { findFlutterPreview } from "../../model/flutter-preview-index";
import {
  isForgeThemeName,
  type ForgeThemeName,
} from "../../model/forge-platforms";
import { resolveFlutterButtonProperties } from "./flutter-button-properties";
import { resolveCollection, collectionConfigurations } from "./flutter-collection-configurations";
import { resolveFormCatalog, formCatalogConfigurations } from "./flutter-form-configurations";
import { resolveInteraction, interactionConfigurations } from "./flutter-interaction-configurations";
import { resolveInput, inputConfigurations } from "./flutter-input-configurations";
import { resolveComposite, compositeConfigurations } from "./flutter-composite-configurations";
import { resolveFeedback, feedbackConfigurations } from "./flutter-feedback-configurations";
import { resolvePrimitive, primitiveConfigurations } from "./flutter-primitive-configurations";
import { resolveSpinner, resolveGroup } from "./flutter-component-properties";

export function useFlutterPreview(slug: string, properties: object) {
  const frame = useRef<HTMLIFrameElement>(null);
  const entry = useMemo(() => findFlutterPreview(slug), [slug]);
  const [theme, setTheme] = useState<ForgeThemeName>("light");
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const raw = properties as Readonly<Record<string, unknown>>;
  const isPart = Object.hasOwn(partConfigurations,slug);
  const isAdvanced = Object.hasOwn(advancedConfigurations,slug);
  const isTransient = Object.hasOwn(transientConfigurations, slug);
  const isCollection = Object.hasOwn(collectionConfigurations, slug);
  const isFormCatalog = Object.hasOwn(formCatalogConfigurations, slug);
  const isInteraction = Object.hasOwn(interactionConfigurations, slug);
  const isPrimitive = Object.hasOwn(primitiveConfigurations, slug);
  const isInput = Object.hasOwn(inputConfigurations, slug);
  const isComposite = Object.hasOwn(compositeConfigurations, slug);
  const isFeedback = Object.hasOwn(feedbackConfigurations, slug);
  const values = isPart ? resolvePart(slug,raw) : isAdvanced ? resolveAdvanced(slug,raw) : isTransient ? resolveTransient(slug,raw) : isCollection ? resolveCollection(slug,raw) : isFormCatalog ? resolveFormCatalog(slug,raw) : isInteraction ? resolveInteraction(slug,raw) : isPrimitive ? resolvePrimitive(slug,raw) : isInput ? resolveInput(slug,raw) : isComposite ? resolveComposite(slug,raw) : isFeedback ? resolveFeedback(slug,raw) :
    slug === "spinner"
      ? resolveSpinner(raw)
      : slug === "button-group"
        ? resolveGroup(raw)
        : resolveFlutterButtonProperties(raw);
  const message = JSON.stringify({
    version: isPart || isAdvanced || isTransient || isCollection || isFormCatalog || isInteraction || isPrimitive || isInput || isComposite || isFeedback ? 2 : 1,
    type: "forge-ui-preview",
    component: slug,
    properties: {
      theme,
      ...values,
      scenario:
        slug === "button" && raw.scenario === "crud-hierarchy"
          ? "crud-hierarchy"
          : "basic",
    },
  });
  const send = useCallback(
    () =>
      frame.current?.contentWindow?.postMessage(
        message,
        window.location.origin,
      ),
    [message],
  );
  useEffect(() => {
    const update = () => {
      const requested = document.documentElement.dataset.theme;
      setTheme(isForgeThemeName(requested) ? requested : "light");
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow ||
        typeof event.data !== "string" ||
        event.data.length > 2048
      )
        return;
      try {
        const data = JSON.parse(event.data);
        if (data.component !== slug) return;
        if (data.type === "forge-ui:flutter-ready") {
          setStatus("ready");
          send();
        }
        if (data.type === "forge-ui:flutter-error") setStatus("error");
      } catch {
        /* Ignore unrelated messages. */
      }
    }
    window.addEventListener("message", receive);
    send();
    return () => window.removeEventListener("message", receive);
  }, [send, slug]);
  useEffect(() => {
    if (!entry || status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("error"), 30000);
    return () => window.clearTimeout(timeout);
  }, [entry, status, attempt]);
  const url = entry
    ? `${entry.previewPath}?build=${entry.buildId}#/${encodeURIComponent(slug)}`
    : null;
  function retry() {
    setStatus("loading");
    setAttempt((value) => value + 1);
  }
  return {
    frame,
    url,
    status,
    attempt,
    send,
    retry,
    failed: () => setStatus("error"),
  };
}
