import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
const root = path.resolve(import.meta.dirname, "..");
const library = path.join(root, "app/library");
const demo = path.join(root, "app/showcase_flutter");
const output = path.join(root, "showcase/portal/public/flutter");
const registry = path.join(
  root,
  "showcase/portal/src/features/showcase-v2/model/flutter-preview-manifest.json",
);
const catalogFiles = ["flutter-primitives.json", "flutter-inputs.json", "flutter-composites.json", "flutter-feedback.json"];
const supportedSlugs = ["button", "spinner", "button-group", ...catalogFiles.flatMap(file => JSON.parse(fs.readFileSync(path.join(root,"showcase/portal/src/features/showcase-v2/model",file),"utf8")).map(entry=>entry.slug))];
if(new Set(supportedSlugs).size!==supportedSlugs.length)throw new Error("Duplicate native preview slug");
function run(args, cwd) {
  const windows = process.platform === "win32";
  const r = spawnSync(windows ? "flutter.bat" : "flutter", args, {
    cwd,
    stdio: "inherit",
    shell: windows,
  });
  if (r.error) throw new Error(`Flutter SDK unavailable: ${r.error.message}`);
  if (r.status !== 0)
    throw new Error(`flutter ${args.join(" ")} failed: ${r.status}`);
}
for (const script of ['generate-flutter-catalog.mjs', 'test-flutter-catalog.mjs', 'test-flutter-input-catalog.mjs', 'test-flutter-composite-catalog.mjs', 'test-flutter-feedback-catalog.mjs', 'test-flutter-preview.mjs']) {
 const result = spawnSync(process.execPath, [path.join(root, 'scripts', script), ...(script.startsWith('generate') ? ['--check'] : [])], {cwd: root, stdio: 'inherit'});
 if (result.error) throw result.error;
 if (result.status !== 0) throw new Error(script + ' failed');
}
// Do not publish a preview on mere source presence. Only a successful test + build registers it.
run(["pub", "get"], library);
run(["analyze"], library);
run(["test"], library);
run(["pub", "get"], demo);
run(["analyze"], demo);
run(["test"], demo);
run(
  [
    "build",
    "web",
    "--release",
    "--no-web-resources-cdn",
    "--pwa-strategy=none",
    "--base-href",
    "/flutter/",
    "--output",
    output,
  ],
  demo,
);
for (const name of ["index.html", "flutter_bootstrap.js"]) {
  if (!fs.existsSync(path.join(output, name)))
    throw new Error(`Missing Flutter Web artifact: ${name}`);
}
const compiledBootstrap=fs.readFileSync(path.join(output,"flutter_bootstrap.js"),"utf8");
const compiledSlugs=compiledBootstrap.match(/const component = (\[[^\]]+\])\.includes/);
if(!compiledSlugs||JSON.stringify(JSON.parse(compiledSlugs[1]))!==JSON.stringify(supportedSlugs))throw new Error("Compiled bootstrap and native preview catalog disagree; registry not updated");
const buildId = createHash("sha256")
  .update(fs.readFileSync(path.join(output, "main.dart.js")))
  .digest("hex")
  .slice(0, 16);
const indexPath = path.join(output, "index.html");
fs.writeFileSync(
  indexPath,
  fs
    .readFileSync(indexPath, "utf8")
    .replace(
      'src="flutter_bootstrap.js"',
      `src="flutter_bootstrap.js?build=${buildId}"`,
    ),
);
fs.writeFileSync(
  registry,
  JSON.stringify(
    {
      schemaVersion: 2,
      entries: supportedSlugs.map((componentSlug) => ({
        componentSlug,
        platform: "flutter",
        available: true,
        codeLanguage: "dart",
        previewPath: "/flutter/index.html",
        buildId,
      })),
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Published verified Flutter Web build and registered the tested native preview catalog",
);
