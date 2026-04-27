#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { Orchestrator } from '../src/core/orchestrator.js';
import { startTUI } from '../src/cli/tui.js';
import { CPM } from '../src/pkg/cpm.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();
const cpm = new CPM();

program
  .name('clatter')
  .description('Clatter Code: The Unified Agentic Orchestration Platform')
  .version('3.1.0');

program
  .command('ui')
  .description('Launch the Clatter Code Orchestration TUI')
  .action(() => {
    startTUI();
  });

program
  .command('run')
  .description('Run a task through the Agentic Orchestrator')
  .argument('<task>', 'The task to perform')
  .option('-p, --provider <provider>', 'AI provider (openai, anthropic, google, xai, ollama, lm-studio)', 'openai')
  .action(async (task, options) => {
    const orchestrator = new Orchestrator({ provider: options.provider });
    await orchestrator.execute(task);
  });

program
  .command('install <package>')
  .description('Install a Clatter package/skill')
  .action(async (pkg) => {
    await cpm.install(pkg);
  });

program
  .command('x <package> [args...]')
  .description('Execute a Clatter package (like npx)')
  .action(async (pkg, args) => {
    await cpm.execute(pkg, args);
  });

program
  .command('pkgs')
  .description('List all installed Clatter packages')
  .action(async () => {
    await cpm.list();
  });

program
  .command('setup')
  .description('Automated setup for all providers and environments')
  .action(async () => {
    console.log(chalk.cyan('Starting Automated Combo Setup...'));
    const envPath = path.join(process.cwd(), '.env');
    if (!(await fs.pathExists(envPath))) {
      await fs.writeFile(envPath, 'AI_PROVIDER=openai\nAI_MODEL=gpt-4\n');
      console.log(chalk.green('Created default .env file.'));
    }
    console.log(chalk.green('Environment initialized. Clatter Code is ready.'));
  });

program
  .command('uninstall')
  .description('Completely remove Clatter Code and its environment')
  .action(async () => {
    const { execa } = await import('execa');
    await execa('./uninstall.sh', { stdio: 'inherit' });
  });

if (!process.argv.slice(2).length) {
  startTUI();
}

program.parse();
