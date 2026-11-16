"use client";
import { useRef, useState } from "react";
import { useLocale } from "../../../../../../../web/library/src/support/i18n";
const copy = {
  "pt-BR": {
    open: "Abrir demonstração",
    close: "Fechar",
    cancel: "Cancelar",
    confirm: "Confirmar",
  },
  es: {
    open: "Abrir demostración",
    close: "Cerrar",
    cancel: "Cancelar",
    confirm: "Confirmar",
  },
  en: {
    open: "Open example",
    close: "Close",
    cancel: "Cancel",
    confirm: "Confirm",
  },
};

export function useModalBodyExample() {
  const { locale } = useLocale();
  const messages = copy[locale];
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("onOpenChange: —");

  function onOpenChange(next: boolean) {
    setOpen(next);
    setFeedback(`onOpenChange: ${next}`);
  }

  function show() {
    onOpenChange(true);
  }

  function close() {
    onOpenChange(false);
  }

  return { messages, triggerRef, open, onOpenChange, show, close, feedback };
}
