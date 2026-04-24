# ⌬ Clatter Code

Clatter Code is an open-source CLI coding assistant built with **Node.js** and **Rust**. It leverages the performance of Rust for file system operations and the flexibility of Node.js for AI orchestration.

## Features
- **Local Execution**: Runs entirely on your machine.
- **Hybrid Engine**: Uses Rust for performance-critical tasks.
- **AI Integration**: Supports multiple AI providers via API keys.
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
# Start a chat session
clatter chat

# List files using the Rust engine
clatter list .
```

## Configuration

Create a `.env` file in the project root and add your API key:

```env
AI_API_KEY=your_api_key_here
```

## License
MIT
