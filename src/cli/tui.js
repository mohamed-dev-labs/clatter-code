import blessed from 'blessed';
import contrib from 'blessed-contrib';
import chalk from 'chalk';
import { ClatterAgent } from '../core/agent.js';

export function startTUI() {
  const screen = blessed.screen({
    smartCSR: true,
    title: 'Clatter Code - Agentic CLI',
    fullUnicode: true
  });

  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  // Header
  grid.set(0, 0, 1, 12, blessed.box, {
    content: '{center}{bold}⌬ CLATTER CODE AGENTIC PLATFORM{/bold}{/center}',
    tags: true,
    style: { fg: 'cyan', border: { fg: 'white' } }
  });

  // Agent Thought Process (Log)
  const agentLog = grid.set(1, 0, 7, 8, blessed.log, {
    label: ' Agent Thought Process ',
    scrollable: true,
    border: { type: 'line' },
    style: { border: { fg: 'magenta' } }
  });

  // File Explorer
  const fileTree = grid.set(1, 8, 7, 4, contrib.tree, {
    label: ' Project Structure ',
    border: { type: 'line' },
    style: { border: { fg: 'green' } }
  });

  // Terminal / Output
  const terminal = grid.set(8, 0, 3, 12, blessed.log, {
    label: ' System Output ',
    border: { type: 'line' },
    style: { border: { fg: 'blue' } }
  });

  // Input
  const input = grid.set(11, 0, 1, 12, blessed.textbox, {
    label: ' Command / Task ',
    inputOnFocus: true,
    border: { type: 'line' },
    style: { border: { fg: 'yellow' } }
  });

  const agent = new ClatterAgent('ollama');

  input.on('submit', async (value) => {
    if (!value.trim()) return;
    
    agentLog.log(chalk.blue('User Task: ') + value);
    input.clearValue();
    input.focus();
    screen.render();

    agentLog.log(chalk.magenta('Agent: ') + 'Initializing reasoning loop...');
    
    // Mocking the agentic loop for TUI visualization
    try {
      const result = await agent.run(value);
      agentLog.log(chalk.green('Agent Result: ') + result);
    } catch (error) {
      agentLog.log(chalk.red('Agent Error: ') + error.message);
    }
    
    screen.render();
  });

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

  agentLog.log(chalk.yellow('System: ') + 'Ready. Enter a task to begin.');
  input.focus();
  screen.render();
}
