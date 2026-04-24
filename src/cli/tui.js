import blessed from 'blessed';
import contrib from 'blessed-contrib';
import chalk from 'chalk';
import { AIProvider } from '../core/ai.js';

export function startTUI() {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'Clatter Code - AI Coding Assistant',
    fullUnicode: true
  });

  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  // Header / Logo
  const header = grid.set(0, 0, 2, 12, blessed.box, {
    content: '{center}{bold}⌬ CLATTER CODE{/bold}{/center}\n{center}Inspired by OpenCode & Bun | Local AI Powered{/center}',
    tags: true,
    style: {
      fg: 'cyan',
      border: { fg: 'white' }
    }
  });

  // Chat Log
  const chatLog = grid.set(2, 0, 8, 8, blessed.log, {
    label: ' Chat Session ',
    scrollable: true,
    alwaysScroll: true,
    scrollbar: { ch: ' ', inverse: true },
    mouse: true,
    border: { type: 'line' },
    style: { border: { fg: 'blue' } }
  });

  // File Explorer (Placeholder)
  const fileTree = grid.set(2, 8, 8, 4, contrib.tree, {
    label: ' Project Files ',
    border: { type: 'line' },
    style: { border: { fg: 'green' } },
    template: { lines: true }
  });

  // Input Box
  const input = grid.set(10, 0, 2, 12, blessed.textbox, {
    label: ' Your Message (Press Enter to send, ESC to quit) ',
    inputOnFocus: true,
    border: { type: 'line' },
    style: { border: { fg: 'yellow' }, focus: { border: { fg: 'white' } } }
  });

  const ai = new AIProvider('ollama');

  input.on('submit', async (value) => {
    if (!value.trim()) return;
    
    chatLog.log(chalk.blue('You: ') + value);
    input.clearValue();
    input.focus();
    screen.render();

    chatLog.log(chalk.yellow('Clatter: ') + chalk.dim('Thinking...'));
    screen.render();

    try {
      const response = await ai.chat(value);
      chatLog.log(chalk.yellow('Clatter: ') + response);
    } catch (error) {
      chatLog.log(chalk.red('Error: ') + error.message);
    }
    screen.render();
  });

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

  chatLog.log(chalk.green('Welcome to Clatter Code! Type your message below.'));
  chatLog.log(chalk.dim('Using Ollama (llama3) for local execution.'));

  input.focus();
  screen.render();
}
