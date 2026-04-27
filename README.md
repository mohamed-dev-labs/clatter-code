# ⌬ Clatter Code: The Agentic CLI Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![Rust](https://img.shields.io/badge/Rust-v1.75+-orange.svg)](https://www.rust-lang.org/)
[![Ollama](https://img.shields.io/badge/Ollama-Local_AI-blue.svg)](https://ollama.com/)

**Clatter Code** is a high-performance, open-source **Agentic CLI Platform**. It bridges the gap between autonomous AI reasoning and raw machine performance by integrating the agentic capabilities of **OpenManus**, the interactive structure of **OpenCode**, and the blazing speed of **Rust** (inspired by **Bun**).

---

## 🏗 Architecture & Philosophy

Clatter Code is built on three core pillars:

### 1. The Agentic Core (Powered by OpenManus)
- **Autonomous Reasoning:** Clatter Code doesn't just chat; it thinks. It can decompose complex tasks, execute shell commands, and iteratively refine its work.
- **Hybrid Engine (Node.js + Rust):** Handles the orchestration and performance-critical tasks like recursive file system indexing and codebase analysis. This ensures that even in massive projects, Clatter Code remains as fast as Bun.

### 2. Local-First AI (Ollama & LM Studio)
We believe in privacy and autonomy. Clatter Code features deep integration with **Ollama** and **LM Studio**, allowing you to run powerful models like `llama3`, `mistral`, or `codegemma` locally on your hardware without sending your code to external servers.

### 3. Rich Agentic TUI
Inspired by **OpenCode**, Clatter Code features a full-screen terminal dashboard designed for agent monitoring:
- **Agent Thought Process:** Watch the agent think, plan, and execute in real-time.
- **Project Structure:** Visual representation of your codebase.
- **Interactive Input:** A dedicated command zone for seamless interaction.

---

## 🚀 Installation

Clatter Code is designed to be installed with a single command.

### The One-Liner Setup
```bash
git clone https://github.com/mohamed-dev-labs/clatter-code.git && cd clatter-code && chmod +x install.sh && ./install.sh
```

### Uninstallation
To remove Clatter Code and all its configurations:
```bash
clatter uninstall
# OR
./uninstall.sh
```

---

## 🛠 Detailed Usage Guide

### 1. Launching the Agentic TUI
Simply type `clatter` to launch the full graphical dashboard.
```bash
clatter
```

### 2. Running Autonomous Tasks
You can give the agent a complex task directly from the CLI:
```bash
clatter agent "Create a new Node.js project with Express and a basic CRUD for users"
```

### 3. Setting up Local AI
```bash
# For Ollama
clatter setup-ollama

# For LM Studio
clatter setup-lmstudio
```

---

## ⚙️ Configuration

Clatter Code uses a `.env` file for configuration.

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_PROVIDER` | `openai`, `ollama`, or `lm-studio` | `openai` |
| `AI_MODEL` | The model to use (e.g., `gpt-4`, `llama3`) | `gpt-4` |
| `AI_API_KEY` | Your provider API key | - |
| `OLLAMA_ENDPOINT` | Local Ollama API URL | `http://localhost:11434/api/generate` |
| `LM_STUDIO_ENDPOINT` | LM Studio API URL | `http://localhost:1234/v1/chat/completions` |

---

## 🤝 Contributing

Clatter Code is **Open Source**. We welcome contributions of all kinds!

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Clatter Code** — *Autonomous coding at the speed of Rust.*
