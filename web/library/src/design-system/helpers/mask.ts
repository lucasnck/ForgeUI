const DIGIT = /^[0-9]$/;
const LETTER = /^[A-Za-z]$/;
const ALPHANUMERIC = /^[A-Za-z0-9]$/;

export const DIGIT_ONLY = /[^0-9]/g;
export const MASK_DATE_DMY = "00/00/0000";
export const MASK_DATE_MDY = "00/00/0000";
export const MASK_DATE_YMD = "0000-00-00";
export const MASK_TOKEN_4 = "0000";
export const MASK_TOKEN_6 = "000000";
export const MASK_TOKEN_8 = "00000000";

interface MaskSlot {
  token: string;
  literals: string;
  value: string;
}

function matches(character: string, token: string): boolean {
  if (token === "0" || token === "9") return DIGIT.test(character);
  if (token === "A") return LETTER.test(character);
  if (token === "S") return ALPHANUMERIC.test(character);
  return false;
}

function isSlot(token: string): boolean {
  return token === "0" || token === "9" || token === "A" || token === "S";
}

function parseSlots(value: string, mask: string, formatted = false): MaskSlot[] {
  const slots: MaskSlot[] = [];
  let literals = "";

  for (const token of mask) {
    if (!isSlot(token)) literals += token;
    else {
      slots.push({ token, literals, value: "" });
      literals = "";
    }
  }

  function requiredFits(start: number, cursor: number): boolean {
    for (const slot of slots.slice(start)) {
      if (formatted && value.startsWith(slot.literals, cursor)) {
        cursor += slot.literals.length;
      }

      if (slot.token === "9") continue;
      while (cursor < value.length && !matches(value[cursor], slot.token)) cursor++;
      if (cursor === value.length) return false;
      cursor++;
    }

    return true;
  }

  let cursor = 0;

  for (const [index, slot] of slots.entries()) {
    if (formatted && value.startsWith(slot.literals, cursor)) {
      cursor += slot.literals.length;
    }

    if (slot.token === "9") {
      if (
        cursor < value.length &&
        matches(value[cursor], slot.token) &&
        requiredFits(index + 1, cursor + 1)
      ) {
        slot.value = value[cursor++];
      }

      continue;
    }

    while (cursor < value.length && !matches(value[cursor], slot.token)) cursor++;
    if (cursor < value.length) slot.value = value[cursor++];
  }

  return slots;
}

export function maskPositions(mask: string): number {
  return [...mask].filter(isSlot).length;
}

export function unmask(display: string, mask: string): string {
  return parseSlots(display, mask, true)
    .map((slot) => slot.value)
    .join("");
}

export function applyMask(raw: string, mask: string): string {
  let display = "";
  let literals = "";

  for (const slot of parseSlots(raw, mask)) {
    literals += slot.literals;

    if (slot.value) {
      display += literals + slot.value;
      literals = "";
    }
  }

  return display;
}

export function isMaskComplete(raw: string, mask: string): boolean {
  return parseSlots(raw, mask).every((slot) => slot.token === "9" || !!slot.value);
}

export function caretForIndex(display: string, mask: string, rawIndex: number): number {
  const slots = parseSlots(display, mask, true);
  const count = Math.max(0, Math.min(rawIndex, unmask(display, mask).length));
  if (count === 0) return 0;
  let consumed = 0;
  let position = 0;

  for (const slot of slots) {
    position += slot.literals.length;
    if (!slot.value) continue;
    position += slot.value.length;
    if (++consumed === count) return Math.min(position, display.length);
  }

  return display.length;
}
