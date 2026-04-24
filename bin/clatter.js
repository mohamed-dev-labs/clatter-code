#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

program
  .name('clatter')
  .description('Clatter Code: An open-source CLI coding assistant')
  .version('1.0.0');

program
  .command('chat')
  .description('Start a chat session with the AI')
  .action(async () => {
    console.log(chalk.blue('Starting Clatter Code session...'));
    console.log(chalk.yellow('Note: This is a placeholder for the AI chat logic.'));
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

program.parse();
