import { AIProvider } from './ai.js';
import { execa } from 'execa';
import chalk from 'chalk';

export class ClatterAgent {
  constructor(provider = 'ollama') {
    this.ai = new AIProvider(provider);
    this.history = [];
    this.maxSteps = 10;
  }

  async run(task) {
    console.log(chalk.cyan(`[Agent] Starting task: ${task}`));
    let currentStep = 0;
    let status = 'thinking';

    while (currentStep < this.maxSteps) {
      console.log(chalk.dim(`[Agent] Step ${currentStep + 1}...`));
      
      const prompt = this.buildPrompt(task);
      const response = await this.ai.chat(prompt);
      
      // Parse response for tool calls (simplified for now)
      if (response.includes('EXECUTE:')) {
        const command = response.split('EXECUTE:')[1].trim();
        console.log(chalk.yellow(`[Agent] Executing: ${command}`));
        const result = await this.executeTool(command);
        this.history.push({ step: currentStep, action: command, result });
      } else {
        console.log(chalk.green(`[Agent] Task Completed.`));
        return response;
      }
      
      currentStep++;
    }
    return "Task reached maximum steps.";
  }

  buildPrompt(task) {
    return `You are Clatter Agent, an autonomous coding assistant. 
    Task: ${task}
    History: ${JSON.stringify(this.history)}
    If you need to run a command, respond with EXECUTE: <command>.
    Otherwise, provide the final answer.`;
  }

  async executeTool(command) {
    try {
      const { stdout } = await execa(command, { shell: true });
      return stdout;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}
