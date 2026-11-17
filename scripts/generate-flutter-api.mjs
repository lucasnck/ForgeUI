import { spawnSync } from "node:child_process";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
for (const args of [["pub", "get"], ["run", "bin/extract_api.dart"]]) {
  const result = spawnSync(process.platform === "win32" ? "dart.bat" : "dart", args, {
    cwd: path.join(root, "scripts/dart_tools"), stdio: "inherit", shell: process.platform === "win32"
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
