#!/usr/bin/env bash
# Forge UI: bootstrap and run without installing dependencies in child folders.
set -euo pipefail
ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
COMMAND="${1:-start}"
NODE_VERSION="v22.16.0"

is_usable_node() {
  command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1 && \
    node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 22 ? 0 : 1)' >/dev/null 2>&1
}

select_platform() {
  case "$(uname -s)" in
    Linux) OS=linux ;;
    Darwin) OS=darwin ;;
    *) echo "[forge] Sistema não suportado. Use forge.cmd no Windows." >&2; exit 1 ;;
  esac
  case "$(uname -m)" in
    x86_64|amd64) ARCH=x64 ;;
    arm64|aarch64) ARCH=arm64 ;;
    *) echo "[forge] Arquitetura $(uname -m) não suportada pelo bootstrap." >&2; exit 1 ;;
  esac
}

select_platform
TOOL_PATH="$ROOT/.forge/tools/node-${NODE_VERSION}-${OS}-${ARCH}"
if ! is_usable_node && [[ -x "$TOOL_PATH/bin/node" ]]; then
  export PATH="$TOOL_PATH/bin:$PATH"
fi

bootstrap_node() {
  local file="node-${NODE_VERSION}-${OS}-${ARCH}.tar.gz"
  local dist="https://nodejs.org/dist/${NODE_VERSION}"
  local temp checksum actual
  mkdir -p "$ROOT/.forge/tools"
  temp="$(mktemp -d "$ROOT/.forge/tools/.download.XXXXXXXX")"
  trap 'rm -rf -- "$temp"' EXIT
  echo "[forge] Baixando Node.js ${NODE_VERSION} para ${OS}/${ARCH} (sem administrador)..."
  if command -v curl >/dev/null 2>&1; then
    curl --fail --location --silent --show-error --retry 2 "${dist}/SHASUMS256.txt" -o "$temp/SHASUMS256.txt"
    curl --fail --location --silent --show-error --retry 2 "${dist}/${file}" -o "$temp/$file"
  elif command -v wget >/dev/null 2>&1; then
    wget -q "${dist}/SHASUMS256.txt" -O "$temp/SHASUMS256.txt"
    wget -q "${dist}/${file}" -O "$temp/$file"
  else
    echo "[forge] Falta curl ou wget para baixar o Node automaticamente." >&2; exit 1
  fi
  checksum="$(awk -v name="$file" '$2 == name { print $1; exit }' "$temp/SHASUMS256.txt")"
  if [[ ! "$checksum" =~ ^[[:xdigit:]]{64}$ ]]; then
    echo "[forge] Arquivo não encontrado no manifesto oficial de checksums; instalação cancelada." >&2; exit 1
  fi
  if command -v sha256sum >/dev/null 2>&1; then
    actual="$(sha256sum "$temp/$file" | cut -d ' ' -f1)"
  elif command -v shasum >/dev/null 2>&1; then
    actual="$(shasum -a 256 "$temp/$file" | cut -d ' ' -f1)"
  else
    echo "[forge] Falta sha256sum ou shasum; não é seguro instalar o download." >&2; exit 1
  fi
  if [[ "${actual,,}" != "${checksum,,}" ]]; then
    echo "[forge] SHA-256 divergente. Download rejeitado." >&2; exit 1
  fi
  tar -xzf "$temp/$file" -C "$temp"
  mv "$temp/node-${NODE_VERSION}-${OS}-${ARCH}" "$TOOL_PATH"
  export PATH="$TOOL_PATH/bin:$PATH"
  echo "[forge] Node.js validado e instalado em .forge/tools/."
}

if ! is_usable_node; then
  if [[ "$COMMAND" == "doctor" ]]; then
    echo "[forge] Node.js 22+ e npm não foram encontrados. Execute ./forge.sh setup para instalar localmente." >&2
    exit 1
  fi
  bootstrap_node
fi

if ! is_usable_node; then
  echo "[forge] Não foi possível disponibilizar Node.js 22+ e npm." >&2
  exit 1
fi

exec node "$ROOT/scripts/forge.mjs" "$@"
