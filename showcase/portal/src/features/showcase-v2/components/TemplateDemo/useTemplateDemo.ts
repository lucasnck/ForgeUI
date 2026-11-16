"use client";
import { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  createTemplateDemoRecords,
  demoBase,
  templateDemoIds,
  type TemplateDemoRecord,
} from "../../model/template-demo.fixtures";
import { pageTransitionTypes } from "@forge-ui/web";
import { TemplateDemoContext } from "./TemplateDemoProvider";

export function useTemplateDemoState() {
  const instanceId = useId();
  const [records, setRecords] = useState(createTemplateDemoRecords);
  const [query, setQuery] = useState("");
  const [descending, setDescending] = useState(false);
  const [page, setPage] = useState(1);
  const [simulation, setSimulation] = useState("fast");
  const [status, setStatus] = useState("ready");
  const [animated, setAnimated] = useState(true);
  const [revision, setRevision] = useState(0);
  const generation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancel = useCallback(() => {
    generation.current++;
    if (timer.current) clearTimeout(timer.current);
    setStatus("ready");
  }, []);
  useEffect(() => cancel, [cancel]);
  const run = useCallback(
    (accepted?: () => void) => {
      cancel();
      const current = generation.current;
      setStatus("loading");
      timer.current = setTimeout(
        () => {
          if (current !== generation.current) return;

          if (simulation === "failed") setStatus("error");
          else {
            accepted?.();
            setStatus("ready");
          }
        },
        simulation === "slow" ? 1800 : 180,
      );
    },
    [cancel, simulation],
  );
  const reset = useCallback(() => {
    cancel();
    setRecords(createTemplateDemoRecords());
    setQuery("");
    setDescending(false);
    setPage(1);
    setSimulation("fast");
    setAnimated(true);
    setStatus("ready");
    setRevision((n) => n + 1);
  }, [cancel]);

  const updateQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const updateSimulation = (e: ChangeEvent<HTMLSelectElement>) => {
    cancel();
    setStatus("ready");
    setSimulation(e.target.value);
  };

  const toggleSort = () => {
    setDescending((value) => !value);
    setPage(1);
  };

  const refresh = () => run();
  const save = (record: TemplateDemoRecord) =>
    setRecords((items) =>
      items.some((item) => item.id === record.id)
        ? items.map((item) => (item.id === record.id ? record : item))
        : [...items, record],
    );

  return {
    animated,
    updateAnimated: (event: ChangeEvent<HTMLInputElement>) => setAnimated(event.target.checked),
    instanceId,
    records,
    query,
    descending,
    page,
    simulation,
    status,
    revision,
    run,
    cancel,
    reset,
    updateQuery,
    updateSimulation,
    toggleSort,
    setPage,
    save,
    refresh,
  };
}

export function useTemplateDemo() {
  const value = useContext(TemplateDemoContext);
  if (!value) throw new Error("TemplateDemoProvider is required.");
  return value;
}

export function useTemplateDemoForm(id?: string, preview = false) {
  const demo = useTemplateDemo();
  const fieldId = useId();
  const navigate = useTemplateDemoNavigation();
  const record = demo.records.find((item) => item.id === id);
  const [title, setTitle] = useState(record?.title ?? "");
  const [description, setDescription] = useState(record?.description ?? "");
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [capacity, setCapacity] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = title !== (record?.title ?? "") || description !== (record?.description ?? "");
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);
  useEffect(() => {
    if (!dirty || preview) return;

    const intercept = (event: globalThis.MouseEvent) => {
      const anchor = (event.target as Element).closest("a");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0 ||
        anchor.target === "_blank"
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      setPendingHref(anchor.href);
    };

    document.addEventListener("click", intercept, true);
    return () => document.removeEventListener("click", intercept, true);
  }, [dirty, preview]);
  useEffect(() => demo.cancel, [demo.cancel]);

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSaved(false);
  };

  const updateDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setSaved(false);
  };

  const navigateBack = () => {
    const href = id ? `${demoBase}/details/${id}/` : `${demoBase}/list/`;
    if (dirty) setPendingHref(href);
    else if (!preview) navigate(href);
  };

  const keepEditing = () => setPendingHref(null);

  const discard = () => {
    if (pendingHref && !preview) navigate(pendingHref);
    setTitle(record?.title ?? "");
    setDescription(record?.description ?? "");
    setPendingHref(null);
  };

  const submit = () => {
    const freeId =
      id ??
      templateDemoIds
        .slice(10)
        .find((candidate) => !demo.records.some((item) => item.id === candidate));

    if (!freeId) {
      setCapacity(true);
      return;
    }

    const index = templateDemoIds.indexOf(freeId) + 1;
    demo.run(() => {
      demo.save({ id: freeId, index, title, description });
      setSaved(true);
      if (!preview) navigate(`${demoBase}/details/${freeId}/`);
    });
  };

  return {
    fieldId,
    demo,
    record,
    title,
    description,
    updateTitle,
    updateDescription,
    submit,
    navigateBack,
    pendingHref,
    keepEditing,
    discard,
    capacity,
    saved,
  };
}

export function useTemplateDemoDocumentation() {
  const pathname = usePathname();
  const slug = pathname.includes("/details/")
    ? "detail-page"
    : pathname.includes("/edit/") || pathname.includes("/create")
      ? "form-page"
      : pathname.includes("/list")
        ? "list-page"
        : "home-page";

  return `/templates/${slug}/`;
}

export function useTemplateDemoNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (href: string) => {
    const destination = href.startsWith("/") ? href : new URL(href).pathname;
    const rank = (path: string) =>
      /\/(create|edit)\//.test(path)
        ? 3
        : path.includes("/details/")
          ? 2
          : path.includes("/list/")
            ? 1
            : 0;
    const intent =
      rank(destination) > rank(pathname)
        ? "forward"
        : rank(destination) < rank(pathname)
          ? "back"
          : "replace";
    router.push(href, {
      scroll: false,
      transitionTypes: destination.startsWith(demoBase + "/") ? [pageTransitionTypes[intent]] : [],
    });
  };
}

export function useTemplateDemoPathname() {
  return usePathname();
}

export function useDemoLink(href: string) {
  const navigate = useTemplateDemoNavigation();
  const router = useRouter();
  useEffect(() => {
    if (href.startsWith(demoBase + "/")) router.prefetch(href);
  }, [href, router]);

  return (event: MouseEvent<HTMLElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    navigate(href);
  };
}
