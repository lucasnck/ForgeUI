"use client";
import { DisclosurePreview } from "../disclosure.shared";
import { useDisclosureGroupResourceExample } from "./useDisclosureGroupResourceExample";

export function UseDisclosureGroupExample() {
  const view = useDisclosureGroupResourceExample();

  return <DisclosurePreview {...view} />;
}
