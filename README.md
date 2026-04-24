# ⌬ Clatter Code: The Ultimate Open-Source AI Coding CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Rust](https://img.shields.io/badge/Rust-v1.75+-orange.svg)](https://www.rust-lang.org/)
[![Ollama](https://img.shields.io/badge/Ollama-Local_AI-blue.svg)](https://ollama.com/)

**Clatter Code** is a high-performance, open-source AI coding assistant designed for the terminal. It bridges the gap between sophisticated AI orchestration and raw machine performance by combining the flexibility of **Node.js** with the blazing speed of **Rust**.

Inspired by the interactive experience of **OpenCode Interpreter** and the performance-first philosophy of **Bun**, Clatter Code provides a rich Graphical TUI (Terminal User Interface) and a hybrid engine that runs entirely on your local machine.

---

## 🏗 Architecture & Philosophy

Clatter Code is built on three core pillars:

### 1. The Hybrid Engine (Node.js + Rust)
- **Node.js (The Brain):** Handles the CLI logic, AI provider orchestration (OpenAI, Anthropic, Ollama), and the interactive TUI.
- **Rust (The Muscle):** A dedicated binary (`clatter-engine`) handles performance-critical tasks like recursive file system indexing, deep-content searching, and codebase analysis. This ensures that even in massive projects, Clatter Code remains as fast as Bun.

### 2. Local-First AI (Ollama Integration)
We believe in privacy and autonomy. Clatter Code features deep integration with **Ollama**, allowing you to run powerful models like `llama3`, `mistral`, or `codegemma` locally on your hardware without sending your code to external servers.

### 3. Rich Graphical TUI
Inspired by **OpenCode**, Clatter Code isn't just a simple prompt. It features a full-screen terminal dashboard with:
- **Real-time Chat Log:** Beautifully formatted conversations.
- **Project Explorer:** Visual representation of your codebase.
- **Interactive Input:** A dedicated command zone for seamless interaction.

---

## 🚀 Installation

Clatter Code is designed to be installed with a single command. Our installer automatically checks for dependencies and builds the Rust engine for your specific architecture.

### The One-Liner Setup
```bash
git clone https://github.com/mohamed-dev-labs/clatter-code.git && cd clatter-code && chmod +x install.sh && ./install.sh
```

### What the installer does:
1. **Dependency Check:** Verifies if Node.js and Rust are installed.
2. **Environment Setup:** Installs necessary npm packages.
3. **Rust Compilation:** Compiles the `rust-engine` in `--release` mode for maximum performance.
4. **Global Linking:** Links the `clatter` command to your system path.

---

## 🛠 Detailed Usage Guide

### 1. Launching the Interface
Simply type `clatter` to launch the full graphical TUI.
```bash
clatter
```

### 2. Setting up Local AI (Ollama)
To use Clatter Code without an internet connection or API keys:
```bash
clatter setup-ollama
```
This command will detect your Ollama installation and configure Clatter Code to use local models by default.

### 3. Command Line Mode
If you prefer a traditional CLI experience for quick tasks:
```bash
# Ask a quick coding question
clatter chat "How do I implement a binary search in Rust?" --provider ollama

# Use the Rust engine to list files in a large directory
clatter list ./src
```

---

## ⚙️ Configuration

Clatter Code uses a `.env` file for configuration. You can manually edit it or use the built-in setup commands.

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_PROVIDER` | `openai` or `ollama` | `openai` |
| `AI_MODEL` | The model to use (e.g., `gpt-4`, `llama3`) | `gpt-4` |
| `AI_API_KEY` | Your provider API key | - |
| `OLLAMA_ENDPOINT` | Local Ollama API URL | `http://localhost:11434/api/generate` |

---

## 🤝 Contributing

Clatter Code is **Open Source**. We welcome contributions of all kinds!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Clatter Code** — *Code at the speed of thought, powered by Rust.*
