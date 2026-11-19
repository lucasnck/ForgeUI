/**
 * Showcase-only, whitespace-only readability formatter for compiled Dart examples.
 * NOT a replacement for official `dart format`. Copy remains the same complete
 * application sample, and non-Dart/React snippets are left byte-for-byte intact.
 * We never rewrite source/built Dart files or generated preview contracts.
 */
export function formatDartForDisplay(source) {
  if (!source.includes("package:forge_ui/forge_ui.dart")) return source;
  const lines = [];
  let line = "";
  let level = 0;
  let quote = null;
  let triple = false;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  const flush = () => {
    const content = line.trim();
    if (content.length) lines.push("  ".repeat(Math.max(0, level)) + content);
    line = "";
  };
  for (let index = 0; index < source.length; index++) {
    const ch = source[index];
    const next = source[index + 1] ?? "";
    if (quote !== null) {
      line += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (triple && source.slice(index, index + 3) === quote.repeat(3)) {
        line += quote.repeat(2);
        index += 2;
        quote = null;
        triple = false;
      } else if (!triple && ch === quote) {
        quote = null;
      }
      continue;
    }
    if (lineComment) {
      if (ch === "\n") {
        lineComment = false;
        flush();
      } else {
        line += ch;
      }
      continue;
    }
    if (blockComment) {
      line += ch;
      if (ch === "*" && next === "/") {
        line += next;
        index++;
        blockComment = false;
      }
      continue;
    }
    if (ch === "/" && next === "/") {
      line += "//";
      index++;
      lineComment = true;
      continue;
    }
    if (ch === "/" && next === "*") {
      line += "/*";
      index++;
      blockComment = true;
      continue;
    }
    if (ch === "\"" || ch === "'") {
      quote = ch;
      triple = source.slice(index, index + 3) === ch.repeat(3);
      if (triple) {
        line += ch.repeat(3);
        index += 2;
      } else {
        line += ch;
      }
      continue;
    }
    if (ch === "\r") continue;
    if (ch === "\n") {
      flush();
      continue;
    }
    if (ch === "{" || ch === "[" || ch === "(") {
      line += ch;
      flush();
      level++;
      continue;
    }
    if (ch === "}" || ch === "]" || ch === ")") {
      flush();
      level = Math.max(0, level - 1);
      line += ch;
      // Leave the trailing comma/semicolon on the same line if present.
      if (next !== "," && next !== ";" && next !== ")" && next !== "]" && next !== "}") flush();
      continue;
    }
    if (ch === "," || ch === ";") {
      line += ch;
      flush();
      continue;
    }
    line += ch;
  }
  flush();
  return lines.join("\n");
}
