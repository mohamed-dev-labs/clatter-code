# ⌬ Clatter Code

Clatter Code is an open-source CLI coding assistant built with **Node.js** and **Rust**. It leverages the performance of Rust for file system operations and the flexibility of Node.js for AI orchestration.

## Features
- **Local Execution**: Runs entirely on your machine.
- **Hybrid Engine**: Uses Rust for performance-critical tasks.
- **AI Integration**: Supports multiple AI providers (OpenAI, Anthropic) and **Ollama** for local execution.
- **Graphical TUI**: A rich terminal interface inspired by OpenCode for a better user experience.
- **Easy Installation**: One-liner setup script.

## Installation

To install Clatter Code, run the following command in your terminal:

```bash
git clone https://github.com/YOUR_USERNAME/clatter-code.git
cd clatter-code
chmod +x install.sh
./install.sh
```

## Usage

```bash
# Setup Ollama for local AI
clatter setup-ollama

# Launch the Graphical TUI (Default)
clatter

# Launch TUI explicitly
clatter ui

# Start a chat session with Ollama in CLI mode
clatter chat "Write a hello world in Rust" --provider ollama

# List files using the Rust engine
clatter list .
```

## Configuration

Create a `.env` file in the project root and add your API key:

```env
AI_API_KEY=your_api_key_here
```

## Architecture
Clatter Code is inspired by:
- **OpenCode**: For its powerful CLI structure and AI orchestration.
- **Bun**: For its performance-first approach, utilizing a **Rust-based engine** for core operations.

## License
MIT
