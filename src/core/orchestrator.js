import { ClatterAgent } from './agent.js';
import { AIProvider } from './ai.js';
import chalk from 'chalk';

export class Orchestrator {
  constructor(config = {}) {
    this.provider = config.provider || 'openai';
    this.agent = new ClatterAgent(this.provider);
    this.ai = new AIProvider(this.provider);
  }

  async execute(task) {
    console.log(chalk.bold.cyan(`\n[Orchestrator] Coordinating task: ${task}`));
    
    // Phase 1: Planning (Inspired by OpenManus)
    console.log(chalk.magenta(`[Orchestrator] Phase 1: Strategic Planning...`));
    const planPrompt = `Create a step-by-step plan for this task: ${task}`;
    const plan = await this.ai.chat(planPrompt);
    console.log(chalk.dim(`Plan: ${plan}`));

    // Phase 2: Execution (Inspired by OpenCode & Bun)
    console.log(chalk.magenta(`[Orchestrator] Phase 2: Autonomous Execution...`));
    const result = await this.agent.run(task);

    // Phase 3: Finalization
    console.log(chalk.green(`[Orchestrator] Task Completed Successfully.\n`));
    return result;
  }
}
