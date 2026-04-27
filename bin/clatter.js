#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { AIProvider } from '../src/core/ai.js';
import { startTUI } from '../src/cli/tui.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name('clatter')
  .description('Clatter Code: The Agentic CLI Platform (Inspired by OpenManus, OpenCode & Bun)')
  .version('2.0.0');

program
  .command('ui')
  .description('Launch the Clatter Code Agentic TUI')
  .action(() => {
    startTUI();
  });

program
  .command('agent')
  .description('Run a task using the Clatter Agent')
  .argument('<task>', 'The task for the agent to perform')
  .action(async (task) => {
    const { ClatterAgent } = await import('../src/core/agent.js');
    const agent = new ClatterAgent();
    await agent.run(task);
  });

program
  .command('uninstall')
  .description('Uninstall Clatter Code from your system')
  .action(async () => {
    const { execa } = await import('execa');
    console.log(chalk.red('Running uninstaller...'));
    await execa('./uninstall.sh', { stdio: 'inherit' });
  });

program
  .command('chat')
  .description('Start a chat session with the AI (CLI mode)')
  .option('-p, --provider <provider>', 'AI provider (openai, ollama, lm-studio)', 'openai')
  .argument('[prompt]', 'Initial prompt')
  .action(async (prompt, options) => {
    const ai = new AIProvider(options.provider);
    console.log(chalk.blue(`Starting Clatter Code session using ${options.provider}...`));
    
    if (prompt) {
      try {
        const response = await ai.chat(prompt);
        console.log(chalk.green('\nAI Response:'));
        console.log(response);
      } catch (error) {
        console.error(chalk.red('Error:'), error.message);
      }
    } else {
      console.log(chalk.yellow('Launching TUI...'));
      startTUI();
    }
  });

program
  .command('setup-ollama')
  .description('Integrate and setup Ollama for local AI execution')
  .action(async () => {
    console.log(chalk.cyan('Configuring Clatter Code to use Ollama...'));
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (await fs.pathExists(envPath)) {
      envContent = await fs.readFile(envPath, 'utf8');
    }
    
    if (!envContent.includes('AI_PROVIDER=ollama')) {
      envContent += '\nAI_PROVIDER=ollama\nAI_MODEL=llama3\n';
      await fs.writeFile(envPath, envContent);
      console.log(chalk.green('Updated .env with Ollama configuration.'));
    }
  });

program
  .command('setup-lmstudio')
  .description('Integrate and setup LM Studio for local AI execution')
  .action(async () => {
    console.log(chalk.cyan('Configuring Clatter Code to use LM Studio...'));
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (await fs.pathExists(envPath)) {
      envContent = await fs.readFile(envPath, 'utf8');
    }
    
    if (!envContent.includes('AI_PROVIDER=lm-studio')) {
      envContent += '\nAI_PROVIDER=lm-studio\nLM_STUDIO_ENDPOINT=http://localhost:1234/v1/chat/completions\n';
      await fs.writeFile(envPath, envContent);
      console.log(chalk.green('Updated .env with LM Studio configuration.'));
      console.log(chalk.yellow('Note: Ensure LM Studio Local Server is running on port 1234.'));
    }
  });

program
  .command('list')
  .description('List files using the Rust engine')
  .argument('[dir]', 'Directory to list', '.')
  .action(async (dir) => {
    try {
      const enginePath = path.join(__dirname, '../rust-engine/target/release/clatter-engine');
      const { stdout } = await execa(enginePath, ['list', dir]);
      console.log(stdout);
    } catch (error) {
      console.error(chalk.red('Error running Rust engine:'), error.message);
    }
  });

if (!process.argv.slice(2).length) {
  startTUI();
}

program.parse();
