#!/usr/bin/env node
/**
 * Forge UI: entrypoint shared by Windows, macOS and Linux launchers.
 * Installs dependencies at workspace root only, never inside a child project.
 */
import { existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const portal = join(root, 'showcase', 'portal');
const requireFromPortal = createRequire(join(portal, 'package.json'));
const command = (process.argv[2] || 'start').toLowerCase();
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function dependenciesInstalled() {
  try {
    requireFromPortal.resolve('next/package.json');
    requireFromPortal.resolve('react/package.json');
    requireFromPortal.resolve('typescript/package.json');
    requireFromPortal.resolve('@forge-ui/web/package.json');
    return true;
  } catch {
    // @forge-ui/web intentionally does not expose package.json as public export.
    try {
      return existsSync(join(root, 'node_modules', '@forge-ui', 'web'))
        && existsSync(join(root, 'node_modules', 'next'))
        && existsSync(join(root, 'node_modules', 'typescript'));
    } catch { return false; }
  }
}

function run(args) {
  const result = spawnSync(npm, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  if (result.error) {
    console.error(`[forge] Não foi possível executar npm: ${result.error.message}`);
    process.exit(1);
  }
  if (result.signal) {
    console.error(`[forge] Processo encerrado por sinal ${result.signal}.`);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}

function installIfNeeded(force = false) {
  if (!force && dependenciesInstalled()) {
    console.log('[forge] Dependências já disponíveis.');
    return;
  }
  const args = existsSync(join(root, 'package-lock.json')) ? ['ci'] : ['install'];
  console.log(`[forge] Instalando dependências dos workspaces pela raiz (${args.join(' ')})...`);
  run([...args, '--no-audit', '--no-fund']);
  if (!dependenciesInstalled()) {
    console.error('[forge] npm terminou, mas Next.js/React/TypeScript ou o workspace web não foram localizados.');
    process.exit(1);
  }
}

function verifyWorkspace() {
  const result = spawnSync(process.execPath, [join(root, 'scripts', 'verify-workspace.mjs')], {cwd: root, stdio: 'inherit'});
  if (result.status !== 0) process.exit(result.status || 1);
}

function clean() {
  const targets = ['node_modules', 'showcase/portal/node_modules', 'web/library/node_modules',
    'showcase/portal/.next', 'showcase/portal/out', 'showcase/portal/dist',
    'showcase/portal/tsconfig.tsbuildinfo'];
  for (const target of targets) {
    const location = join(root, target);
    if (existsSync(location)) {
      rmSync(location, {recursive: true, force: true});
      console.log(`[forge] Removido artefato gerado: ${target}`);
    }
  }
  console.log('[forge] Limpeza concluída; fontes e configurações preservadas.');
}

function doctor() {
  console.log(`[forge] Node: ${process.version}; plataforma: ${process.platform}/${process.arch}`);
  console.log(`[forge] Raiz: ${root}`);
  console.log(`[forge] Workspaces: ${existsSync(join(root, 'web/library/package.json')) && existsSync(join(portal, 'package.json')) ? 'presentes' : 'incompletos'}`);
  console.log(`[forge] Lockfile: ${existsSync(join(root, 'package-lock.json')) ? 'presente' : 'ausente (será criado na primeira instalação)'}`);
  console.log(`[forge] Dependências: ${dependenciesInstalled() ? 'instaladas' : 'não instaladas'}`);
  if (!dependenciesInstalled()) {
    console.error('[forge] Execute ./forge.sh setup, forge.command ou forge.cmd com conexão à internet.');
    process.exitCode = 1;
  }
}

switch (command) {
  case 'help':
  case '--help':
  case '-h':
    console.log('Forge UI — comandos: start (padrão), setup/install, doctor, check, build, typecheck, clean');
    console.log('Windows: forge.cmd [comando] | macOS: forge.command [comando] | Linux: ./forge.sh [comando]');
    break;
  case 'doctor':
    verifyWorkspace();
    doctor();
    break;
  case 'setup':
  case 'install':
    verifyWorkspace();
    installIfNeeded();
    run(['run', 'typecheck']);
    console.log('[forge] Instalação concluída. Execute o launcher sem argumentos para abrir o showcase.');
    break;
  case 'start':
  case 'dev':
    verifyWorkspace();
    installIfNeeded();
    console.log('[forge] Iniciando o portal em http://localhost:3000 ...');
    run(['run', 'dev']);
    break;
  case 'check':
    verifyWorkspace();
    installIfNeeded();
    run(['run', 'check']);
    break;
  case 'build':
    verifyWorkspace();
    installIfNeeded();
    run(['run', 'build']);
    break;
  case 'typecheck':
    verifyWorkspace();
    installIfNeeded();
    run(['run', 'typecheck']);
    break;
  case 'clean':
    clean();
    break;
  default:
    console.error(`[forge] Comando desconhecido: ${command}. Use help.`);
    process.exitCode = 2;
}
