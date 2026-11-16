#!/usr/bin/env bash
# Double-click on macOS to install and start the Forge UI showcase.
set -euo pipefail
cd "$(dirname "$0")"
exec ./forge.sh "$@"
