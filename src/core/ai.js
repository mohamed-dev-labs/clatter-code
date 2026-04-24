import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class AIProvider {
  constructor(provider = 'openai', model = 'gpt-4') {
    this.provider = process.env.AI_PROVIDER || provider;
    this.model = process.env.AI_MODEL || model;
    this.apiKey = process.env.AI_API_KEY;
    this.ollamaEndpoint = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/generate';
  }

  async chat(prompt) {
    if (this.provider === 'ollama') {
      return this.callOllama(prompt);
    }

    if (!this.apiKey) {
      throw new Error('AI_API_KEY not found in environment variables.');
    }

    // Placeholder for Gana6 integration (OpenAI/Anthropic/Google)
    console.log(`Calling ${this.provider} (${this.model}) with prompt: ${prompt}`);
    return `Response from ${this.provider} for: ${prompt}`;
  }

  async callOllama(prompt) {
    try {
      const response = await axios.post(this.ollamaEndpoint, {
        model: this.model || 'llama3',
        prompt: prompt,
        stream: false
      });
      return response.data.response;
    } catch (error) {
      throw new Error(`Ollama Error: ${error.message}. Make sure Ollama is running.`);
    }
  }
}
