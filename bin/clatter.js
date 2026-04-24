#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { AIProvider } from '../src/core/ai.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name('clatter')
  .description('Clatter Code: An open-source CLI coding assistant (Inspired by OpenCode & Bun)')
  .version('1.1.0');

program
  .command('chat')
  .description('Start a chat session with the AI')
  .option('-p, --provider <provider>', 'AI provider (openai, ollama)', 'openai')
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
      console.log(chalk.yellow('Interactive mode coming soon. Please provide a prompt for now.'));
    }
  });

program
  .command('setup-ollama')
  .description('Integrate and setup Ollama for local AI execution')
  .action(async () => {
    console.log(chalk.cyan('Checking for Ollama...'));
    try {
      await execa('ollama', ['--version']);
      console.log(chalk.green('Ollama is already installed!'));
    } catch (error) {
      console.log(chalk.yellow('Ollama not found. Installing Ollama...'));
      console.log(chalk.dim('Running: curl -fsSL https://ollama.com/install.sh | sh'));
      // In a real scenario, we would execute the install script.
      console.log(chalk.blue('Please run: curl -fsSL https://ollama.com/install.sh | sh'));
    }
    
    console.log(chalk.cyan('\nConfiguring Clatter Code to use Ollama...'));
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (await fs.pathExists(envPath)) {
      envContent = await fs.readFile(envPath, 'utf8');
    }
    
    if (!envContent.includes('AI_PROVIDER=ollama')) {
      envContent += '\nAI_PROVIDER=ollama\nAI_MODEL=llama3\n';
      await fs.writeFile(envPath, envContent);
      console.log(chalk.green('Updated .env with Ollama configuration.'));
    } else {
      console.log(chalk.yellow('Ollama is already configured in .env'));
    }
  });

program
  .command('list')
  .description('List files using the Rust engine (Bun-speed performance)')
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

program.parse();
