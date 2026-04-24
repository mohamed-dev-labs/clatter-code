#!/usr/bin/env bash
set -euo pipefail

echo "--- Clatter Code Installer ---"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check for Rust
if ! command -v cargo &> /dev/null; then
    echo "Rust not found. Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
fi

# Build the project
echo "Building Clatter Code..."
npm install
npm run build:rust

# Link the binary
echo "Linking clatter command..."
sudo npm link

echo "Clatter Code installed successfully! Run 'clatter --help' to get started."
