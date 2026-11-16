"use client";
import { useId, useState } from "react";
import { useMaskedInput, MASK_TOKEN_6 } from "@forge-ui/web";

export function useMaskedInputResourceExample() {
  const id = useId();
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const masked = useMaskedInput({
    mask: MASK_TOKEN_6,
    value,
    onValueChange: setValue,
  });

  return { id, value, disabled, setDisabled, readOnly, setReadOnly, masked };
}
