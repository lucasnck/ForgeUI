"use client";
import { useId, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { ModalProps } from "@forge-ui/web";
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

export function useModalExample() {
  const { locale } = useLocale();
  const messages = copy[locale];
  const inputId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [divider, setDivider] = useState(true);
  const [icon, setIcon] = useState(false);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [animationEffect, setAnimationEffect] =
    useState<NonNullable<ModalProps["animationEffect"]>>("fade");
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState("onOpenChange: —");

  function onOpenChange(next: boolean) {
    setOpen(next);
    setFeedback(`onOpenChange: ${next}`);
    if (!next) setValue("");
  }

  function show() {
    onOpenChange(true);
  }

  function close() {
    onOpenChange(false);
  }

  function confirm() {
    setOpen(false);
    setFeedback(`onConfirm: ${value}; onOpenChange: false`);
    setValue("");
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function changeEffect(value: string) {
    setAnimationEffect(value as NonNullable<ModalProps["animationEffect"]>);
  }

  return {
    messages,
    inputId,
    triggerRef,
    inputRef,
    open,
    onOpenChange,
    show,
    close,
    confirm,
    value,
    onChange,
    divider,
    setDivider,
    icon,
    setIcon,
    closeOnOutsideClick,
    setCloseOnOutsideClick,
    animated,
    setAnimated,
    animationEffect,
    changeEffect,
    feedback,
  };
}
