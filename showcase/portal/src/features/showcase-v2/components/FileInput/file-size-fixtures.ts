import { formatters, validators } from "@forge-ui/web";
export const fileSizeRows = [0, 1536].flatMap((bytes) =>
  [false, true].map((binary) => ({
    id: `${bytes}-${binary}`,
    bytes,
    binary,
    valid: validators.fileSize(bytes),
    formatted: formatters.fileSize(bytes, "en", { binary }),
  })),
);
