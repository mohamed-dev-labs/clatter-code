#!/usr/bin/env bash
set -euo pipefail

echo "--- Clatter Code Uninstaller ---"

# Confirm uninstallation
read -p "Are you sure you want to uninstall Clatter Code? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Remove global link
echo "Removing global link..."
npm uninstall -g clatter-code || true

# Remove binary from path if linked manually
if command -v clatter &> /dev/null; then
    CLATTER_PATH=$(which clatter)
    echo "Removing binary at $CLATTER_PATH..."
    sudo rm "$CLATTER_PATH" || true
fi

# Remove configuration
echo "Removing configuration files..."
rm -f .env || true

echo "Clatter Code has been uninstalled successfully."
